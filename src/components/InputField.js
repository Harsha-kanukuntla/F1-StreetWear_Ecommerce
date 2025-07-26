import React from 'react';

function InputField({ label, type = 'text', value, onChange, placeholder, id, name }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800 text-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
        required
      />
    </div>
  );
}

export default InputField;