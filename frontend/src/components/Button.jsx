const Button = ({ children, disabled, ...props }) => {
    return (
      <button
        className={`w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed `}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  
  