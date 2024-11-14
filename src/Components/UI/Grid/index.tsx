import React, { ReactNode, CSSProperties } from 'react';

interface GridProps {
    columns?: number;      // Default is 2 columns
    gap?: number;          // Default is 3px gap
    rows?: string | 'auto'; // Allows a custom row layout or auto rows
    children: ReactNode;    // The content of the grid
    style?: CSSProperties;  // Additional custom styles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;     // Allow any additional props to be passed to the div
}

const Grid: React.FC<GridProps> = ({
    columns = 2,
    gap = 3,
    rows = 'auto',
    children,
    style,
    ...props   // This collects all other props passed to Grid
}) => {
    // Define grid styles based on props
    const gridStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%', // Full width by default
        gridTemplateRows: rows, // Default to auto if rows not provided
        ...style, // Allow additional styles to be passed in
    };

    return (
        <div style={gridStyle} {...props}>  {/* Spread the remaining props */}
            {children}
        </div>
    );
};

export default Grid;
