function Button({ children, className, disabled = false, ...props }) {
  return (
    <button
      className={`rounded-xl bg-blue-700 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-950 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
