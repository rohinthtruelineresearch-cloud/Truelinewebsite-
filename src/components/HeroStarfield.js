"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useScroll, useTime, useTransform } from "motion/react";
import * as THREE from "three";

const mix = (a, b, t) => a + (b - a) * t;

function Icosahedron() {
  const meshRef = useRef(null);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.003;
  });

  return (
    <mesh ref={meshRef} rotation-x={0.25}>
      <icosahedronGeometry args={[1.6, 0]} />
      <meshBasicMaterial wireframe color="#7DD3FC" />
    </mesh>
  );
}

function Stars({ count }) {
  const positions = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const t = index / count;
      const distance = mix(3.6, 6.5, Math.random());
      const polar = mix(THREE.MathUtils.degToRad(70), THREE.MathUtils.degToRad(110), Math.random());
      const azimuthal = THREE.MathUtils.degToRad(360) * t;
      const vector = new THREE.Vector3().setFromSpherical(
        new THREE.Spherical(distance, polar, azimuthal)
      );
      return vector.toArray();
    });
  }, [count]);

  return (
    <>
      {positions.map((position, idx) => (
        <mesh key={idx} position={position}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial wireframe color="#00A99D" transparent opacity={0.55} />
        </mesh>
      ))}
    </>
  );
}

function Scene({ target, starCount = 140 }) {
  const gl = useThree((state) => state.gl);
  const scrollOptions = target
    ? { target, offset: ["start start", "end start"] }
    : { offset: ["start start", "end start"] };
  const { scrollYProgress } = useScroll(scrollOptions);
  const time = useTime();

  const orbitAngle = useTransform(scrollYProgress, [0, 1], [0.1, Math.PI]);
  const orbitRadius = useTransform(scrollYProgress, [0, 1], [11, 4.2]);

  useLayoutEffect(() => {
    gl.setPixelRatio(0.75);
  }, [gl]);

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      orbitRadius.get(),
      orbitAngle.get(),
      time.get() * 0.00045
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Icosahedron />
      <Stars count={starCount} />
    </>
  );
}

export default function HeroStarfield({ scrollTarget, className = "" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 40%, #003F8C 0%, #001A33 45%, #000E1A 100%), linear-gradient(140deg, #003F8C 0%, #00A99D 100%)",
        }}
      />
      <Canvas
        className="pointer-events-none mix-blend-screen"
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#001A3D", 0.95);
        }}
      >
        <Scene target={scrollTarget} />
      </Canvas>
    </div>
  );
}
