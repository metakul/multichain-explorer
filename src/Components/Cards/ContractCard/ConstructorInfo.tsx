import React from "react";
import { Label } from "@radix-ui/react-label";
import { TextFieldInput } from "@radix-ui/themes";

interface ConstructorInputFormProps {
    constructorParams: { name: string; type: string }[];
    constructorInputs: string[];
    handleInputChange: (index: number, value: string) => void;
    inputErrors: string[]; // Accept input errors as props
}

const ConstructorInputForm: React.FC<ConstructorInputFormProps> = ({
    constructorParams,
    constructorInputs,
    handleInputChange,
    inputErrors,
}) => {
    // If no constructor parameters are available
    if (!constructorParams || constructorParams.length === 0) {
        return <p>No constructor parameters available.</p>;
    }

    return (
        <div>
            <span>Constructor Parameters:</span>
            <ul>
                {constructorParams.map((param, index) => (
                    <li key={index}>
                        <Label htmlFor={`param-${index}`}>
                            Param {index + 1}: {param.name} ({param.type})
                        </Label>
                        <TextFieldInput
                            id={`param-${index}`}
                            type={param.type === "number" ? "number" : "text"} // Dynamic input type
                            placeholder={`Enter value for ${param.name}`}
                            value={constructorInputs[index] || ""}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        {inputErrors[index] && ( // Display error from props
                            <Label style={{ color: 'red' }}>
                                {inputErrors[index]}
                            </Label>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConstructorInputForm;
