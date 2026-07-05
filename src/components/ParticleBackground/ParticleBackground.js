"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Neural Network Nodes ---
    const nodeCount = 180;
    const nodePositions = [];
    const nodeSpeeds = [];
    const spreadX = 160;
    const spreadY = 90;
    const spreadZ = 80;

    const nodeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    const colorCyan = new THREE.Color(0x00d4ff);
    const colorViolet = new THREE.Color(0x7c3aed);
    const colorEmerald = new THREE.Color(0x00ff88);
    const palette = [colorCyan, colorViolet, colorEmerald];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodePositions.push({ x, y, z });
      nodeSpeeds.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      });

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = Math.random() * 2 + 1;
    }

    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    nodeGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    nodeGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom shader for glowing nodes
    const nodesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float pulse = 1.0 + 0.3 * sin(uTime * 2.0 + position.x * 0.5);
          gl_PointSize = size * pulse * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          float glow = exp(-dist * 4.0) * 0.6;
          gl_FragColor = vec4(vColor, (alpha * 0.8 + glow) * 0.7);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodeGeometry, nodesMaterial);
    scene.add(nodes);

    // --- Edges (lines connecting nearby nodes) ---
    const maxEdgeDistance = 22;
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    let edgeLines = null;

    function updateEdges() {
      if (edgeLines) {
        scene.remove(edgeLines);
        edgeLines.geometry.dispose();
      }
      const edgeVertices = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodePositions[i].x - nodePositions[j].x;
          const dy = nodePositions[i].y - nodePositions[j].y;
          const dz = nodePositions[i].z - nodePositions[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < maxEdgeDistance) {
            edgeVertices.push(
              nodePositions[i].x,
              nodePositions[i].y,
              nodePositions[i].z
            );
            edgeVertices.push(
              nodePositions[j].x,
              nodePositions[j].y,
              nodePositions[j].z
            );
          }
        }
      }
      const edgeGeometry = new THREE.BufferGeometry();
      edgeGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(edgeVertices, 3)
      );
      edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      scene.add(edgeLines);
    }

    // --- Mouse interaction ---
    const mouse = { x: 0, y: 0 };
    function onMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let frameCount = 0;

    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      nodesMaterial.uniforms.uTime.value = elapsed;

      const posArr = nodeGeometry.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        nodePositions[i].x += nodeSpeeds[i].x;
        nodePositions[i].y += nodeSpeeds[i].y;
        nodePositions[i].z += nodeSpeeds[i].z;

        // Boundary bounce
        if (
          Math.abs(nodePositions[i].x) > spreadX / 2
        )
          nodeSpeeds[i].x *= -1;
        if (
          Math.abs(nodePositions[i].y) > spreadY / 2
        )
          nodeSpeeds[i].y *= -1;
        if (
          Math.abs(nodePositions[i].z) > spreadZ / 2
        )
          nodeSpeeds[i].z *= -1;

        posArr[i * 3] = nodePositions[i].x;
        posArr[i * 3 + 1] = nodePositions[i].y;
        posArr[i * 3 + 2] = nodePositions[i].z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Update edges every 3 frames for performance
      frameCount++;
      if (frameCount % 3 === 0) {
        updateEdges();
      }

      // Gentle camera follow mouse
      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Slow scene rotation
      scene.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    }
    animate();

    // --- Resize handler ---
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
