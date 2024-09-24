// src/global.d.ts
declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            request?: (args: { method: string; params?: unknown[] }) => Promise<any>;
        };
    }
}

// This line ensures the file is treated as a module
export { };
