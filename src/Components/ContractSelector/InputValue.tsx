// src/components/ValueInput.tsx
import React from 'react';

interface ValueInputProps {
    value: number;
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ValueInput: React.FC<ValueInputProps> = ({ value, inputValue, handleInputChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Stored Value: {value}</h2>
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a number"
            />
            <button type="submit">Set Value</button>
        </form>
    );
};

export default ValueInput;
