/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CustomTextField from "../../UI/Typogrpahy/Text/TextFeild";
import Label from "../../UI/Label";

interface ConstructorInputFormProps {
    constructorParams:any;
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
        return <p>No constructor parameters Required To deploy.</p>;
    }

    return (
        <div>
            <span>Constructor Parameters:</span>
            <ul>
                {constructorParams.map((param:any, index:number) => (
                    <li key={index}>
                        <Label htmlFor={`param-${index}`}>
                            Param {index + 1}: {param.name} ({param.type})
                        </Label>
                        <CustomTextField
                            id={`param-${index}`}
                            type={param.type === "number" ? "number" : "text"} // Dynamic input type
                            placeholder={`Enter value for ${param.name}`}
                            value={constructorInputs[index] || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
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
