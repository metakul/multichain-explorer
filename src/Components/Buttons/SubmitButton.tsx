import React from "react";

type LoadingButtonProps = {
    loading: boolean;
    onClick: () => Promise<void>;  // Handles async calls
    children: React.ReactNode;
    className?: string;
};

const SubmitTransactionButton: React.FC<LoadingButtonProps> = ({ loading, onClick, children, className }) => {
    const handleClick = async () => {
        if (loading) return;
        await onClick();
    };

    return (
        <button
            className={`px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
            onClick={handleClick}
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                    Loading...
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default SubmitTransactionButton;
