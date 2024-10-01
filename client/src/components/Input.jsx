function Input({ label, type, name, classes, placeholder, value, setValue }) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-blue-600 focus:border-blue-600 w-full px-3.5 py-2.5 ${classes}`}
        placeholder={placeholder}
        value={value}
        required=""
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
