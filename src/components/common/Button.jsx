import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline
  size = 'md', // sm, md, lg
  href,
  onClick,
  className = '',
  icon,
  external = false
}) => {

  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300";

  const variants = {
    primary: "bg-gradient-to-r from-accent to-accent-dark text-white hover:shadow-glow-red hover:from-accent-light hover:to-accent",
    secondary: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white",
    outline: "bg-transparent border-2 border-accent/50 text-accent hover:border-accent hover:bg-accent hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm",
    md: "px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base",
    lg: "px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : ""}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;
