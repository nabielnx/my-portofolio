import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const DataCore = ({ isMobile }: { isMobile: boolean }) => {
  const meshRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1
      meshRef.current.rotation.x = t * 0.05
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.2
    }
  })

  return (
    <group ref={meshRef}>
      {/* Outer Geometric Wireframe - Octahedron for sharp edges */}
      <mesh>
        <octahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial
          color="#00f2ff"
          wireframe
          transparent
          opacity={0.05}
          emissive="#00f2ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Rotating Technical Cube */}
      <mesh ref={coreRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#111"
          emissive="#7000ff"
          emissiveIntensity={0.5}
          flatShading
          transparent
          opacity={0.4}
        />
        {/* Cube Edges for that 'Architectural' feel */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.2, 1.2)]} />
          <lineBasicMaterial color="#00f2ff" linewidth={2} />
        </lineSegments>
      </mesh>

      {/* Floating Data Pixels (Points) */}
      <Points limit={1000} range={1000}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
        {Array.from({ length: isMobile ? 30 : 80 }).map((_, i) => (
          <primitive
            key={i}
            object={new THREE.Vector3(
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            )}
          />
        ))}
      </Points>
    </group>
  )
}

const GameCanvas = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <spotLight position={[0, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00f2ff" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <DataCore isMobile={isMobile} />
        </Float>
        
        <fog attach="fog" args={['#030303', 5, 25]} />
      </Canvas>
    </div>
  )
}

export default GameCanvas
