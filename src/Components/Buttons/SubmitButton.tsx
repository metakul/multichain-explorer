import { useState } from "react";
import "./Button.css";
import Button from "../UI/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SubmitButton({ style,buttonText, className = "", onClick, ...props }: any) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            if (onClick) {
                await onClick();
            }
        } catch (error) {
            console.error("Error during operation", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Button
            className={`${className}`}
            onClick={handleClick}
            style={style}
            disabled={loading} // Disable button when loading
            {...props}
        >
            {loading ? "Loading..." : buttonText}
        </Button>
    );
}

export default SubmitButton;