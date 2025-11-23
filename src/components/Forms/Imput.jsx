import React from 'react';

function Input({ label, type, name, register, error }) {
  const errorMessage = error?.message;

  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor={name}
        className="font-semibold text-p4 mb-1 tracking-wide"
      >
        {label}
      </label>
      <input
        className={`border px-4 py-2.5 rounded-lg w-full outline-none transition-all duration-150
          ${errorMessage
            ? "border-red-400 focus:ring-2 focus:ring-red-600"
            : "border-c3 focus:ring-2 focus:ring-p1"}
          shadow-sm focus:shadow-md`}
        type={type}
        id={name}
        {...register(name, { required: `${label} é obrigatório` })}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1 sans">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;