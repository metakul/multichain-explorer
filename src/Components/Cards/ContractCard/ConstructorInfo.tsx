import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { TextFieldInput } from "@radix-ui/themes";

interface ConstructorInputFormProps {
    constructorParams: { name: string; type: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructorInputs: any[];
    handleInputChange: (index: number, value: string) => void;
}

const ConstructorInputForm: React.FC<ConstructorInputFormProps> = ({
    constructorParams,
    constructorInputs,
    handleInputChange,
}) => {
    const [localErrors, setLocalErrors] = useState<string[]>([]); // Local error state

    const handleChange = (index: number, value: string) => {
        // Simple validation: Check if the input is empty
        const updatedErrors = [...localErrors];
        if (value.trim() === "") {
            updatedErrors[index] = `The ${constructorParams[index].name} field cannot be empty.`;
        } else {
            updatedErrors[index] = "";
        }
        setLocalErrors(updatedErrors); // Update local error state

        // Send data back to parent component
        handleInputChange(index, value);
    };

    // If no constructor parameters are available
    if (!constructorParams || constructorParams.length === 0) {
        return <p>No constructor parameters available.</p>;
    }

    return (
        <div>
            <span >Constructor Parameters:</span>
            <ul>
                {constructorParams.map((param, index) => (
                    <li key={index} >
                        <Label>
                            Param {index + 1}: {param.name} ({param.type})
                        </Label>
                        <TextFieldInput
                            type="text"
                            placeholder={`Enter value for ${param.name}`}
                            value={constructorInputs[index] || ""}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                        {localErrors[index] && (
                            <Label >
                                {localErrors[index]}
                            </Label>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConstructorInputForm;
