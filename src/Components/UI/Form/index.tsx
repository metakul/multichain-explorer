// CustomForm.tsx
import React from "react";
import * as RadixForm from "@radix-ui/react-form";

interface CustomFormProps {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ children, onSubmit }) => {
    return <RadixForm.Root onSubmit={onSubmit}>{children}</RadixForm.Root>;
};

export const CustomFormField: React.FC<{ name: string; label: string; type: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ name, label, type, onChange }) => (
    <RadixForm.Field name={name}>
        <RadixForm.Label>{label}</RadixForm.Label>
        <RadixForm.Control asChild>
            <input type={type} required onChange={onChange} />
        </RadixForm.Control>
    </RadixForm.Field>
);

export const CustomFormSubmit: React.FC<{ disabled: boolean; children: React.ReactNode }> = ({ disabled, children }) => (
    <RadixForm.Submit asChild>
        <button type="submit" disabled={disabled}>
            {children}
        </button>
    </RadixForm.Submit>
);

export default CustomForm;
