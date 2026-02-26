const SectionHeading = ({
  title,
  subtitle,
  align = 'center'
}) => {
  return (
    <div className={`mb-8 sm:mb-12 px-4 sm:px-0 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-accent to-transparent mt-3 sm:mt-4" />
    </div>
  );
};

export default SectionHeading;
