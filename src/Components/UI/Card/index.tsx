import React from 'react';
import { Card as RadixCard, CardProps } from '@radix-ui/themes';

const Card: React.FC<CardProps> = (props) => {
    return <RadixCard {...props} />;
};

export default Card;