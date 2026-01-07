import { useEffect, useRef, useState } from 'react'

// --- CALIBRATED CONSTANTS ---
const GRAVITY = 0.67
const JUMP_FORCE = -11.3 
const INITIAL_SPEED = 5.2
const COYOTE_TIME = 100 

// --- CHARACTER CONFIG ---
// Ukuran baru karakter (lebih tinggi dari lebarnya)
const CHAR_WIDTH = 24 
const CHAR_HEIGHT = 38

const GeometryDash = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START')
  // REMOVED: const [score, setScore] = useState(0) -> Score is fully handled by ref and canvas
  
  const requestRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const scoreRef = useRef(0)
  const speedRef = useRef(INITIAL_SPEED)
  const keysRef = useRef<Record<string, boolean>>({}) 
  const lastGroundedTimeRef = useRef<number>(0) 
  const lastSpawnXRef = useRef<number>(0)

  // NOTE: Rotasi tidak lagi digunakan untuk visual, tapi state-nya dibiarkan
  const playerRef = useRef({
    x: 120, 
    y: 0, 
    width: CHAR_WIDTH,  // Update lebar
    height: CHAR_HEIGHT, // Update tinggi
    dy: 0, grounded: false, rotation: 0
  })
  
  const obstaclesRef = useRef<any[]>([])

  // --- MANUAL PATTERNS (Physics-Checked) ---
  const patterns = [
    {
      name: 'TRIPLE_SPIKE',
      width: 120,
      parts: (x: number, gy: number) => [
        { x: x, y: gy - 32, width: 32, height: 32, type: 'spike' },
        { x: x + 35, y: gy - 32, width: 32, height: 32, type: 'spike' },
        { x: x + 70, y: gy - 32, width: 32, height: 32, type: 'spike' }
      ]
    },
    {
      name: 'THE_BRIDGE',
      width: 300,
      parts: (x: number, gy: number) => [
        { x: x, y: gy - 20, width: 300, height: 20, type: 'spike' }, 
        { x: x + 60, y: gy - 85, width: 160, height: 20, type: 'block' } 
      ]
    },
    {
      name: 'THE_DECATHLON',
      width: 1850, 
      parts: (x: number, gy: number) => {
        const steps = []
        for (let i = 0; i < 10; i++) {
          steps.push({
            x: x + (i * 185), 
            y: gy - ((i + 1) * 12), 
            width: 85, height: (i + 1) * 12, type: 'block'
          })
        }
        return steps
      }
    },
    {
      name: 'THE_SQUEEZE',
      width: 250,
      parts: (x: number, gy: number) => [
        { x: x, y: gy - 165, width: 250, height: 25, type: 'block' }, 
        { x: x + 100, y: gy - 32, width: 32, height: 32, type: 'spike' }
      ]
    }
  ]

  const spawnPattern = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const groundY = canvas.height - 80
    const pattern = patterns[Math.floor(Math.random() * patterns.length)]
    const startX = Math.max(canvas.width, lastSpawnXRef.current + 400) 
    obstaclesRef.current.push(...pattern.parts(startX, groundY))
    lastSpawnXRef.current = startX + pattern.width
  }

  // --- ENGINE ---
  useEffect(() => {
    const handleKey = (e: KeyboardEvent, isDown: boolean) => {
      if (['Space', 'ArrowUp'].includes(e.code)) {
        e.preventDefault(); keysRef.current[e.code] = isDown
        if (isDown && gameState !== 'PLAYING') resetGame()
      }
    }
    const down = (e: KeyboardEvent) => handleKey(e, true)
    const up = (e: KeyboardEvent) => handleKey(e, false)
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [gameState])

  const resetGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Reset posisi player dengan tinggi baru
    playerRef.current = { ...playerRef.current, y: canvas.height - 80 - CHAR_HEIGHT, dy: 0, grounded: true, rotation: 0 }
    obstaclesRef.current = []; scoreRef.current = 0; speedRef.current = INITIAL_SPEED; lastSpawnXRef.current = 0
    setGameState('PLAYING')
  }

  const update = (time: number) => {
    if (gameState !== 'PLAYING') return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const deltaTime = time - lastTimeRef.current; lastTimeRef.current = time
    const timeScale = Math.min(deltaTime / 16.67, 4) // Normalize to 60 FPS
    const player = playerRef.current; const groundY = canvas.height - 80

    // JUMP
    if (keysRef.current['Space'] || keysRef.current['ArrowUp']) {
      if (player.grounded || (time - lastGroundedTimeRef.current < COYOTE_TIME)) {
        player.dy = JUMP_FORCE; player.grounded = false; lastGroundedTimeRef.current = 0
      }
    }

    // Apply Physics with Time Scale
    player.dy += GRAVITY * timeScale
    player.y += player.dy * timeScale
    
    let isOnPlatform = false

    if (obstaclesRef.current.length === 0 || lastSpawnXRef.current < canvas.width + 600) {
      spawnPattern()
    }

    for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
      const obs = obstaclesRef.current[i]; 
      
      // Move Obstacle
      obs.x -= speedRef.current * timeScale

      // Hitbox disesuaikan dengan bentuk tubuh baru (lebih ramping)
      const p = { l: player.x + 4, r: player.x + player.width - 4, t: player.y + 2, b: player.y + player.height - 1 }
      const o = { l: obs.x, r: obs.x + obs.width, t: obs.y, b: obs.y + obs.height }

      if (p.r > o.l && p.l < o.r && p.b > o.t && p.t < o.b) {
        if (obs.type === 'spike') { setGameState('GAME_OVER'); return }
        else {
          if (player.dy >= 0 && p.b < o.t + 22) {
            player.y = o.t - player.height; player.dy = 0; player.grounded = true
            isOnPlatform = true; lastGroundedTimeRef.current = time
          } else { setGameState('GAME_OVER'); return }
        }
      }
      if (!obs.passed && obs.x + obs.width < player.x) { obs.passed = true; scoreRef.current += 1; /* removed setScore */ }
      if (obs.x + obs.width < -600) obstaclesRef.current.splice(i, 1)
    }

    lastSpawnXRef.current -= speedRef.current * timeScale

    if (!isOnPlatform) {
      if (player.y + player.height > groundY) {
        player.y = groundY - player.height; player.dy = 0; player.grounded = true; lastGroundedTimeRef.current = time
      } else { player.grounded = false }
    }

    // LOGIKA ROTASI DIHAPUS DISINI. Player selalu tegak.

    draw(ctx, canvas); requestRef.current = requestAnimationFrame(update)
  }

  // Cache Gradient
  const bgGradientRef = useRef<CanvasGradient | null>(null)

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Background Liquid Glass Style (Optimized: Created once)
    if (!bgGradientRef.current) {
        const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
        bg.addColorStop(0, '#000000ff'); bg.addColorStop(1, '#1e293b')
        bgGradientRef.current = bg
    }
    
    ctx.fillStyle = bgGradientRef.current!; ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Grid Accents
    ctx.strokeStyle = 'rgba(212, 163, 115, 0.05)'; ctx.lineWidth = 1
    for(let i=0; i<canvas.width; i+=40) { ctx.beginPath(); ctx.moveTo(i - (scoreRef.current * 3 % 40), 0); ctx.lineTo(i - (scoreRef.current * 3 % 40), canvas.height); ctx.stroke() }

    // Ground (Titanium/Brown)
    ctx.fillStyle = '#050505ff'; ctx.fillRect(0, canvas.height - 80, canvas.width, 80)
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 4; ctx.strokeRect(-2, canvas.height - 80, canvas.width + 4, 4)

    const p = playerRef.current
    
    // === MENGGAMBAR KARAKTER (Tampak Samping, Tanpa Rotasi) ===
    // Tidak ada ctx.save(), ctx.translate(), atau ctx.rotate()

    const x = p.x;
    const y = p.y;
    const w = p.width;
    const h = p.height;

    // 1. Rambut Coklat (Top 20%)
    ctx.fillStyle = '#5D4037'; // Coklat tua
    ctx.fillRect(x, y, w, h * 0.2);

    // 2. Muka Kulit (Next 15%) + Mata
    ctx.fillStyle = '#FFCCBC'; // Warna kulit
    ctx.fillRect(x, y + h * 0.2, w, h * 0.15);
    // Mata (titik kecil di kanan)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + w - 6, y + h * 0.25, 4, 4);

    // 3. Badan Persegi Panjang (Kaos Abu/Putih) (Next 30%)
    ctx.fillStyle = '#ef4444'; // Abu-abu untuk baju
    ctx.fillRect(x, y + h * 0.35, w, h * 0.3);

    // 4. Jeans Biru (Next 25%)
    ctx.fillStyle = '#1565C0'; // Biru jeans
    ctx.fillRect(x, y + h * 0.65, w, h * 0.25);

    // 5. Sepatu Hijau (Bottom 10%)
    ctx.fillStyle = '#2E7D32'; // Hijau tua
    ctx.fillRect(x, y + h * 0.9, w, h * 0.1);


    // Obstacles
    obstaclesRef.current.forEach(obs => {
      ctx.fillStyle = obs.type === 'spike' ? '#ef4444' : 'rgba(30, 41, 59, 0.8)'
      if (obs.type === 'spike') {
        ctx.beginPath(); ctx.moveTo(obs.x, obs.y + obs.height); ctx.lineTo(obs.x + obs.width / 2, obs.y); ctx.lineTo(obs.x + obs.width, obs.y + obs.height); ctx.fill()
      } else {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height)
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.strokeRect(obs.x, obs.y, obs.width, obs.height)
      }
    })
    
    // Glassy UI
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 22px "Outfit", sans-serif'; ctx.fillText(`SCORE: ${scoreRef.current}`, 30, 50)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestRef.current)
  }, [gameState])

  // --- INPUT HANDLERS (Support Mouse & Touch) ---
  const handleInputStart = () => {
     // Prevent default touch actions (like scrolling) to ensure game feel
     // We rely on CSS touch-action: none for broad prevention, but can add check here if needed
     
    keysRef.current['Space'] = true
    if (gameState !== 'PLAYING') resetGame()
  }

  const handleInputEnd = () => {
    keysRef.current['Space'] = false
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div 
        className="relative bg-[#111] rounded-2xl overflow-hidden border-4 border-[#333] shadow-2xl select-none touch-none"
        onPointerDown={handleInputStart}
        onPointerUp={handleInputEnd}
        onPointerLeave={handleInputEnd}
        // Explicit touch handlers for better responsiveness
        onTouchStart={handleInputStart}
        onTouchEnd={handleInputEnd}
      >
        <canvas ref={canvasRef} width={800} height={400} className="block w-full max-w-3xl h-auto pointer-events-none" />
        
        {gameState !== 'PLAYING' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Head Dash</h2> <br />
            <p className="text-[#ef4444] font-bold animate-pulse font-mono uppercase tracking-widest text-sm mt-2">
                TAP TO START
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering game start when clicking quit
                onClose()
              }} 
              aria-label="Close Game"
              className="bold mt-12 text-zinc-500 hover:text-white transition-all uppercase text-xs tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 rounded px-4 py-2 pointer-events-auto"
            >
              Quit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeometryDash
