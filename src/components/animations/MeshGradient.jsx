import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const MeshGradient = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradient animation
    let time = 0;

    const animate = () => {
      time += 0.001;

      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 200,
        canvas.height / 2 + Math.cos(time) * 200,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );

      // Different colors for light/dark mode
      if (theme === 'light') {
        gradient.addColorStop(0, '#FFE5E5');
        gradient.addColorStop(0.5, '#FFF0F0');
        gradient.addColorStop(1, '#FFFFFF');
      } else {
        gradient.addColorStop(0, '#1A0505');
        gradient.addColorStop(0.5, '#0D0D0D');
        gradient.addColorStop(1, '#000000');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: theme === 'light' ? 0.6 : 0.4 }}
    />
  );
};

export default MeshGradient;
