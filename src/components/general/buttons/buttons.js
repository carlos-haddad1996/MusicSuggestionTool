import React from 'react';

const Button = () => {
    const onClickButton = () => {
        console.log('Button was clicked');
    };

    return (
        <div>
            <button onClick={onClickButton} styles={{ color: 'red' }}>
                Click Me
            </button>
        </div>
    );
};

export default Button;
