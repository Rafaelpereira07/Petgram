import React from 'react';

function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={
        "cursor-pointer rounded-lg bg-p3 text-white font-semibold px-6 py-3 mt-4 w-full " +
        "transition-all duration-150 shadow-md hover:bg-p3 hover:shadow-lg " +
        "focus:outline-none focus:ring-4 focus:ring-p1 " +
        "disabled:opacity-60 disabled:cursor-wait " +
        (props.className ? props.className : "")
      }
    >
      {children}
    </button>
  );
}

export default Button;
