import React from 'react';

const Button = () => {
    const onClickButton = () => {
        console.log('Button was clicked');
    };

    return (
        <div>
            <button
                type="button"
                onClick={onClickButton}
                className="btn btn-primary"
            >
                Click Me
            </button>
        </div>
    );
};

export default Button;
