import { useEffect, useRef, useState } from 'react'

const GRAVITY = 0.8
const JUMP_FORCE = -12
const SPEED = 7
const OBSTACLE_INTERVAL = 1400 // ms

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

const GeometryDash = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START')
  const [score, setScore] = useState(0)
  const requestRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  const obstacleTimerRef = useRef<number>(0)

  // Game State Refs (Mutable for loop performance)
  const playerRef = useRef({
    x: 100,
    y: 300,
    width: 30,
    height: 30,
    dy: 0,
    grounded: false,
    rotation: 0
  })
  
  const obstaclesRef = useRef<{x: number, y: number, width: number, height: number, type: 'spike' | 'block'}[]>([])
  const particlesRef = useRef<Particle[]>([])
  const scoreRef = useRef(0)

  const spawnObstacle = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Randomly choose obstacle type or pattern
    obstaclesRef.current.push({
      x: canvas.width,
      y: canvas.height - 100 - 30, // Ground level is height - 100
      width: 30,
      height: 30,
      type: 'spike'
    })
  }

  const createParticles = (x: number, y: number, color: string, count: number = 10) => {
    for (let i = 0; i < count; i++) {
        particlesRef.current.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0,
            color
        })
    }
  }

  const resetGame = () => {
    if (!canvasRef.current) return
    playerRef.current = {
      x: 100,
      y: canvasRef.current.height - 100 - 30,
      width: 30,
      height: 30,
      dy: 0,
      grounded: true,
      rotation: 0
    }
    obstaclesRef.current = []
    particlesRef.current = []
    scoreRef.current = 0
    setScore(0)
    setGameState('PLAYING')
  }

  const jump = () => {
    if (gameState !== 'PLAYING') return
    if (playerRef.current.grounded) {
      playerRef.current.dy = JUMP_FORCE
      playerRef.current.grounded = false
      // Jump particles
      createParticles(playerRef.current.x + 15, playerRef.current.y + 30, '#fff', 5)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault()
      if (gameState === 'START' || gameState === 'GAME_OVER') {
        resetGame()
      } else {
        jump()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState])

  const update = (time: number) => {
    if (gameState !== 'PLAYING') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time

    const player = playerRef.current
    const groundY = canvas.height - 100

    // Physics
    player.dy += GRAVITY
    player.y += player.dy

    // Rotation
    if (!player.grounded) {
        player.rotation += 5
    } else {
        // Snap to nearest 90
        const rem = player.rotation % 90
        if (rem !== 0) {
            player.rotation = Math.round(player.rotation / 90) * 90
        }
    }

    // Ground Collision
    if (player.y + player.height > groundY) {
      player.y = groundY - player.height
      player.dy = 0
      player.grounded = true
    } else {
        player.grounded = false // Just in case
    }

    // Obstacle Spawning
    obstacleTimerRef.current += deltaTime || 16
    if (obstacleTimerRef.current > OBSTACLE_INTERVAL) {
        spawnObstacle()
        obstacleTimerRef.current = 0
    }

    // Update Obstacles
    for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
        const obs = obstaclesRef.current[i]
        obs.x -= SPEED

        // Player Collision
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y - 10 // Collision forgiveness slightly
        ) {
            // Die
            createParticles(player.x + 15, player.y + 15, '#ef4444', 30)
            setGameState('GAME_OVER')
            return
        }

        // Score
        if (obs.x + obs.width < player.x && !obs['passed' as keyof typeof obs]) {
            scoreRef.current += 1
            setScore(scoreRef.current)
            // @ts-ignore
            obs.passed = true
        }

        // Remove offscreen
        if (obs.x + obs.width < 0) {
            obstaclesRef.current.splice(i, 1)
        }
    }

    // Update Particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        if (p.life <= 0) particlesRef.current.splice(i, 1)
    }

    draw(ctx, canvas)
    requestRef.current = requestAnimationFrame(update)
  }

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Background Gradient (Dark)
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    bgGradient.addColorStop(0, '#0f172a')
    bgGradient.addColorStop(1, '#1e293b')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Visual Grid (Retro effect)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    const gridSize = 40
    for(let x=0; x<canvas.width; x+=gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for(let y=0; y<canvas.height; y+=gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Ground
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100)
    // Ground Line (Neon)
    ctx.beginPath()
    ctx.moveTo(0, canvas.height - 100)
    ctx.lineTo(canvas.width, canvas.height - 100)
    ctx.strokeStyle = '#14b8a6' // Teal
    ctx.lineWidth = 4
    ctx.stroke()

    // Player (Cube)
    const p = playerRef.current
    ctx.save()
    ctx.translate(p.x + p.width/2, p.y + p.height/2)
    ctx.rotate((p.rotation * Math.PI) / 180)
    ctx.fillStyle = '#ef4444' // Red
    ctx.fillRect(-p.width/2, -p.height/2, p.width, p.height)
    // Inner square
    ctx.fillStyle = '#fca5a5'
    ctx.fillRect(-p.width/4, -p.height/4, p.width/2, p.height/2)
    ctx.restore()

    // Obstacles
    obstaclesRef.current.forEach(obs => {
        ctx.save()
        ctx.translate(obs.x, obs.y)
        ctx.beginPath()
        ctx.moveTo(0, obs.height)
        ctx.lineTo(obs.width / 2, 0)
        ctx.lineTo(obs.width, obs.height)
        ctx.closePath()
        ctx.fillStyle = '#14b8a6'
        ctx.fill()
        ctx.restore()
    })

    // Particles
    particlesRef.current.forEach(p => {
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, 4, 4)
        ctx.globalAlpha = 1.0
    })

    // Score
    ctx.font = 'bold 40px "Outfit", sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.textAlign = 'center'
    ctx.fillText(scoreRef.current.toString(), canvas.width / 2, canvas.height/2)
  }

  // Animation Loop Wrapper
  useEffect(() => {
    requestRef.current = requestAnimationFrame(update)
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [gameState])

  // Initial Draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
        // Set fixed size for simplicity, or dynamic
        canvas.width = 800
        canvas.height = 400
        const ctx = canvas.getContext('2d')
        if (ctx) draw(ctx, canvas)
    }
  }, [])


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg animate-fade-in">
        <div className="relative p-1 rounded-2xl bg-gradient-to-r from-red-500 to-teal-500 shadow-2xl animate-lightbox-zoom max-w-full">
            <div className="relative bg-black rounded-xl overflow-hidden">
                <canvas 
                    ref={canvasRef} 
                    className="block w-full max-w-[800px] h-auto cursor-pointer"
                    onPointerDown={() => {
                       if (gameState === 'START' || gameState === 'GAME_OVER') resetGame()
                       else jump()
                    }}
                />
                
                {/* UI Overlays */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                {gameState === 'START' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
                        <h2 className="text-4xl font-bold text-white mb-2 tracking-tighter">GEOMETRY DASH</h2>
                        <p className="text-teal-400 animate-pulse text-xl font-mono">PRESS SPACE OR CLICK TO START</p>
                    </div>
                )}

                {gameState === 'GAME_OVER' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none">
                        <h2 className="text-red-500 text-5xl font-black mb-2">GAME OVER</h2>
                        <p className="text-white text-2xl mb-4">SCORE: {score}</p>
                        <p className="text-zinc-400 font-mono">PRESS SPACE TO RESTART</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default GeometryDash
