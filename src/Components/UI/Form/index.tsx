// CustomForm.tsx
import React from "react";
import { TextField, Button, Box } from "@mui/material";

interface CustomFormProps {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export const CustomFormField: React.FC<{ name: string; label: string; type: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ name, label, type, onChange }) => (
    <Box mb={2}>
        <TextField
            name={name}
            label={label}
            type={type}
            fullWidth
            required
            onChange={onChange}
        />
    </Box>
);

export const CustomFormSubmit: React.FC<{ disabled: boolean; children: React.ReactNode }> = ({ disabled, children }) => (
    <Button type="submit" variant="contained" color="primary" disabled={disabled} fullWidth>
        {children}
    </Button>
);

export default CustomForm;
