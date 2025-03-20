import React from "react";

const Button = ({ children, ...rest }) => {
    return (
        <button
            className="bg-purple-600 text-white rounded-md text-base px-6 py-2 cursor-pointer disabled:cursor-auto disabled:bg-red-500 transition duration-300 hover:bg-purple-700"
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
