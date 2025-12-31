import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AnimationClip,
  AnimationMixer,
  Clock,
  NumberKeyframeTrack,
  VectorKeyframeTrack,
  Color,
} from "three";
import { AnimationAction } from "./animation.js";
import { LoopRepeat } from "../constants.js";

function ResourceScene() {
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const orbitRefs = useRef([]);
  const mixerRef = useRef(null);
  const clock = useMemo(() => new Clock(), []);

  useEffect(() => {
    const core = coreRef.current;
    if (!core) return undefined;

    const mixer = new AnimationMixer(core);
    mixerRef.current = mixer;

    const rotationTrack = new NumberKeyframeTrack(".rotation[y]", [0, 2, 4], [0, Math.PI, Math.PI * 2]);
    const scaleTrack = new VectorKeyframeTrack(
      ".scale",
      [0, 1.2, 2.4, 4],
      [
        1, 1, 1,
        1.06, 1.08, 1.06,
        0.95, 0.98, 0.95,
        1, 1, 1,
      ],
    );

    const clip = new AnimationClip("resource-core", 4, [rotationTrack, scaleTrack]);
    const action = new AnimationAction(mixer, clip, core);
    action.setLoop(LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.enabled = true;
    action.play();

    return () => {
      action.stop();
      mixer.stopAllAction();
      mixer.uncacheClip(clip);
      mixer.uncacheRoot(core);
      mixerRef.current = null;
    };
  }, []);

  useFrame(() => {
    const mixer = mixerRef.current;
    if (!mixer) return;
    mixer.update(clock.getDelta());
  });

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(elapsed * 0.35) * 0.25;
    }

    orbitRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const speed = 0.4 + idx * 0.18;
      const radius = 2.1 + idx * 0.45;
      const angle = elapsed * speed + idx * Math.PI * 0.66;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.8) * 0.35, Math.sin(angle) * radius);
      mesh.rotation.y = elapsed * (0.6 + idx * 0.25);
    });
  });

  const accents = useMemo(
    () => [
      { color: new Color("#5ef2d7"), emissive: "#0f766e" },
      { color: new Color("#4adeff"), emissive: "#0369a1" },
      { color: new Color("#d4ff6f"), emissive: "#3f6212" },
    ],
    [],
  );

  return (
    <group>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3.5, 4, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -6]} intensity={0.4} color="#1f2937" />

      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.05, 0]} />
          <meshStandardMaterial
            color="#5ef2d7"
            emissive="#0f766e"
            emissiveIntensity={0.45}
            roughness={0.32}
            metalness={0.38}
          />
        </mesh>

        <mesh>
          <dodecahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#0ea5e9"
            transparent
            opacity={0.125}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </group>

      <mesh ref={ringRef} rotation-x={Math.PI / 2} position={[0, 0, 0]}>
        <torusGeometry args={[2.15, 0.035, 24, 192]} />
        <meshStandardMaterial color="#5ef2d7" transparent opacity={0.28} metalness={0.15} roughness={0.4} />
      </mesh>

      {accents.map((config, idx) => (
        <mesh
          key={idx}
          ref={(node) => {
            orbitRefs.current[idx] = node;
          }}
          scale={0.42 + idx * 0.1}
        >
          <icosahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial
            color={config.color}
            emissive={config.emissive}
            emissiveIntensity={0.65 + idx * 0.2}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ResourceHeroAnimation({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ResourceScene />
      </Canvas>
    </div>
  );
}
