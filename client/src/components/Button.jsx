function Button({ children, className, ...props }) {
  return (
    <button
      className={`text-white bg-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-blue-950 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
