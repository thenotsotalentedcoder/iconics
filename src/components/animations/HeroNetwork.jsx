import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroNetwork = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    const particles = [];
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Random positions
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 50;

      positions.push(x, y, z);

      // Random velocities for drift animation
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01
      );

      particles.push({
        x, y, z,
        vx: velocities[i * 3],
        vy: velocities[i * 3 + 1],
        vz: velocities[i * 3 + 2],
        originalX: x,
        originalY: y,
        originalZ: z
      });
    }

    particlesRef.current = particles;

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Particle material (light gray circles)
    const material = new THREE.PointsMaterial({
      color: 0xE5E7EB,
      size: 2,
      transparent: true,
      opacity: 0.6
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x111827,
      transparent: true,
      opacity: 0.15
    });

    const lineSegments = new THREE.Group();
    scene.add(lineSegments);

    // Mouse tracking
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions with drift
      const positions = geometry.attributes.position.array;

      particles.forEach((particle, i) => {
        // Drift animation
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Bounce back if too far from origin
        if (Math.abs(particle.x - particle.originalX) > 10) particle.vx *= -1;
        if (Math.abs(particle.y - particle.originalY) > 10) particle.vy *= -1;
        if (Math.abs(particle.z - particle.originalZ) > 5) particle.vz *= -1;

        // Mouse interaction (magnetic pull)
        const mouseX = mouseRef.current.x * 50;
        const mouseY = mouseRef.current.y * 50;
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
          const force = (20 - distance) / 20;
          particle.x += dx * force * 0.05;
          particle.y += dy * force * 0.05;
        }

        positions[i * 3] = particle.x;
        positions[i * 3 + 1] = particle.y;
        positions[i * 3 + 2] = particle.z;
      });

      geometry.attributes.position.needsUpdate = true;

      // Draw lines between nearby particles
      lineSegments.clear();
      const maxDistance = 15;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions = new Float32Array([
              particles[i].x, particles[i].y, particles[i].z,
              particles[j].x, particles[j].y, particles[j].z
            ]);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

            const line = new THREE.Line(lineGeometry, lineMaterial);
            lineSegments.add(line);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default HeroNetwork;
