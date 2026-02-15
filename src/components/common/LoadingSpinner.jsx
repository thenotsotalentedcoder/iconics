const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-accent-red/30 border-t-accent-red rounded-full animate-spin"></div>
        <p className="text-text-muted text-sm mt-4 text-center">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
