import React from 'react';

import { Label as RadixLabel, LabelProps } from "@radix-ui/react-label";

const Label: React.FC<LabelProps> = (props) => {
    return <RadixLabel {...props} />;
};

export default Label;