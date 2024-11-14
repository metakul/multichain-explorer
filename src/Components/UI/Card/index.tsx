import React from 'react';
import { Card as MUICard, CardProps } from '@mui/material';

const Card: React.FC<CardProps> = (props) => {
    return <MUICard {...props} />;
};

export default Card;
