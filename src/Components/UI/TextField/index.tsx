import React from 'react';
import { TextField as RadixTextfield } from "@radix-ui/themes";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextField: React.FC<any> = (props) => {
    return <RadixTextfield.Root {...props} />;
};

export default TextField;