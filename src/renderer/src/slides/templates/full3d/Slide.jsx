import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import SlideOverlay from '../shared/SlideOverlay.jsx';
import '../shared/template-media.css';
import modelUrl from './model.stl?url';

const TARGET_SIZE = 2.4;
const ROTATE_SPEED = 0.25; // radians/sec

function TurntableModel({ url }) {
  const groupRef = useRef();
  const interacting = useRef(false);
  const geometry = useLoader(STLLoader, url);

  const { scale, position } = useMemo(() => {
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    const box = geometry.boundingBox;
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = TARGET_SIZE / maxDim;
    return {
      scale: s,
      position: [-center.x * s, -box.min.y * s, -center.z * s],
    };
  }, [geometry]);

  useFrame((_, delta) => {
    if (!interacting.current && groupRef.current) {
      groupRef.current.rotation.y += delta * ROTATE_SPEED;
    }
  });

  return (
    <>
      <group ref={groupRef} scale={scale} position={position}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial color="#7d848c" roughness={0.55} metalness={0.05} />
        </mesh>
      </group>
      <OrbitControls
        makeDefault
        target={[0, TARGET_SIZE * 0.4, 0]}
        enablePan
        enableZoom
        enableRotate
        enableDamping
        onStart={() => {
          interacting.current = true;
        }}
        onEnd={() => {
          interacting.current = false;
        }}
      />
    </>
  );
}

export default function Slide({ index, total }) {
  return (
    <div className="template-slide">
      <Canvas
        shadows
        camera={{ position: [3.2, 2.4, 4], fov: 42 }}
        style={{ background: '#d7dee2' }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <shadowMaterial opacity={0.28} />
        </mesh>
        <Suspense fallback={null}>
          <TurntableModel url={modelUrl} />
        </Suspense>
      </Canvas>
      <SlideOverlay
        title="Full-3D template"
        description={[
          'Swap model.stl in this folder for the real model.',
          'Scales uniformly to fit, sits on a shadowed ground plane.',
          'Auto-revolves; drag/scroll to orbit, pauses while interacting.',
        ]}
        topicName="Template"
        index={index}
        total={total}
      />
    </div>
  );
}
