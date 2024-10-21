const loadingCircle = () => {
  return (
    <div className="flex flex-wrap justify-center items-center p-56 bg-transparent">
      <svg
        className="animate-spin h-24 w-24 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-100 bg-transparent"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 0a6 6 0 100 12 6 6 0 000-12z"
        />
      </svg>
    </div>
  );
};

export default loadingCircle;
