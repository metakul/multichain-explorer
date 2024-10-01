// Simulated contract data (mock data)
const mockContracts = [
    {
        name: 'Simple Storage',
        abi: [
            {
                "inputs": [],
                "name": "retrieve",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "num",
                        "type": "uint256"
                    }
                ],
                "name": "store",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode: {
            "functionDebugData": {},
            "generatedSources": [],
            "linkReferences": {},
            "object": "6080604052348015600e575f80fd5b506101438061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80632e64cec1146100385780636057361d14610056575b5f80fd5b610040610072565b60405161004d919061009b565b60405180910390f35b610070600480360381019061006b91906100e2565b61007a565b005b5f8054905090565b805f8190555050565b5f819050919050565b61009581610083565b82525050565b5f6020820190506100ae5f83018461008c565b92915050565b5f80fd5b6100c181610083565b81146100cb575f80fd5b50565b5f813590506100dc816100b8565b92915050565b5f602082840312156100f7576100f66100b4565b5b5f610104848285016100ce565b9150509291505056fea26469706673582212209a0dd35336aff1eb3eeb11db76aa60a1427a12c1b92f945ea8c8d1dfa337cf2264736f6c634300081a0033",
            "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xE JUMPI PUSH0 DUP1 REVERT JUMPDEST POP PUSH2 0x143 DUP1 PUSH2 0x1C PUSH0 CODECOPY PUSH0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0xF JUMPI PUSH0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x34 JUMPI PUSH0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x2E64CEC1 EQ PUSH2 0x38 JUMPI DUP1 PUSH4 0x6057361D EQ PUSH2 0x56 JUMPI JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH2 0x40 PUSH2 0x72 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x4D SWAP2 SWAP1 PUSH2 0x9B JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x70 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x6B SWAP2 SWAP1 PUSH2 0xE2 JUMP JUMPDEST PUSH2 0x7A JUMP JUMPDEST STOP JUMPDEST PUSH0 DUP1 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST DUP1 PUSH0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x95 DUP2 PUSH2 0x83 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xAE PUSH0 DUP4 ADD DUP5 PUSH2 0x8C JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH0 DUP1 REVERT JUMPDEST PUSH2 0xC1 DUP2 PUSH2 0x83 JUMP JUMPDEST DUP2 EQ PUSH2 0xCB JUMPI PUSH0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0xDC DUP2 PUSH2 0xB8 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xF7 JUMPI PUSH2 0xF6 PUSH2 0xB4 JUMP JUMPDEST JUMPDEST PUSH0 PUSH2 0x104 DUP5 DUP3 DUP6 ADD PUSH2 0xCE JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 SWAP11 0xD 0xD3 MSTORE8 CALLDATASIZE 0xAF CALL 0xEB RETURNDATACOPY 0xEB GT 0xDB PUSH23 0xAA60A1427A12C1B92F945EA8C8D1DFA337CF2264736F6C PUSH4 0x4300081A STOP CALLER ",
            "sourceMap": "199:356:0:-:0;;;;;;;;;;;;;;;;;;;"
        },
    },
    {
        name: 'ERC721',
        abi: [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "set",
                "outputs": [],
                "type": "function"
            },
        ],
    },
    {
        name: 'Contract 1',
        abi: [
            // ABI for Contract 1
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_value",
                        "type": "string"
                    }
                ],
                "name": "set",
                "outputs": [],
                "type": "function"
            },
        ],
    },
];

const GetContractsRequest = async (options) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Request made with options:', options);

            // Simulate a delay for async behavior
            setTimeout(() => {
                if (options.url === '/contracts') {
                    resolve(mockContracts);
                } else {
                    reject(new Error('Invalid URL'));
                }
            }, 1000); // 1-second delay to mimic an API call
        } catch (error) {
            reject(`API request error: ${error}`);
        }
    });
};

export default GetContractsRequest;
