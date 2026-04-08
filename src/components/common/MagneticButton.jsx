import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = ''
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Limit movement to 10px
    const maxDistance = 10;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const factor = Math.min(distance, maxDistance) / distance || 0;

    setPosition({
      x: deltaX * factor * 0.3,
      y: deltaY * factor * 0.3
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-6 py-3 font-semibold rounded transition-all duration-300 inline-flex items-center justify-center overflow-hidden group";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-light",
    secondary: "border-2 border-accent text-accent hover:bg-accent hover:text-white"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  const buttonContent = (
    <>
      {/* Ripple effect background */}
      <span className="absolute inset-0 bg-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    // Internal or external link
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <motion.a
          ref={buttonRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <Link to={href}>
        <motion.div
          ref={buttonRef}
          className={buttonClasses}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {buttonContent}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      className={buttonClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default MagneticButton;
