const Input= ({ label, id, ...props }) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="text-sm font-medium text-gray-300 block">
          {label}
        </label>
        <input
          id={id}
          className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
          {...props} // Spread para passar todas as props dinâmicas
        />
      </div>
    );
  };
  
  export default Input;


  