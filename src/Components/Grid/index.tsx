/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the Grid component
const Grid = ({ columns = 2, gap = 3, rows, children, style }:any) => {
    // Define grid styles based on props
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%', // Full width by default
        gridTemplateRows: rows || 'auto', // Default to auto if rows not provided
        ...style, // Allow additional styles to be passed in
    };

    return <div style={gridStyle}>{children}</div>;
};

export default Grid;
