import React, { ReactNode, CSSProperties } from 'react';

interface GridProps {
    columns?: number;
    gap?: number;
    rows?: string | 'auto';
    children: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

const Grid: React.FC<GridProps> = ({
    columns = 2,
    gap = 4,
    rows = 'auto',
    children,
    style,
    ...props
}) => {
    // Define grid styles based on props
    const gridStyle: CSSProperties = {
        display: 'grid',
        padding: 4,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        gridTemplateRows: rows,
        ...style,
    };

    return (
        <div style={gridStyle} {...props}> 
            {children}
        </div>
    );
};

export default Grid;