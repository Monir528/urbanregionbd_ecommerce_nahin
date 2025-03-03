/* eslint-disable no-unused-vars */
import React from 'react';
import "./Button.scss"

// eslint-disable-next-line react/prop-types
const Button = ({children,...rest}) => {
    return (
            <button className='btn' {...rest}>{children}</button>
    );
};

export default Button;