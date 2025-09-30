
/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/
export const FHEBMICalculatorABI = {
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "euint32",
          "name": "bmiCategory",
          "type": "bytes32"
        }
      ],
      "name": "BMICalculated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "externalEuint32",
          "name": "heightCm",
          "type": "bytes32"
        },
        {
          "internalType": "externalEuint32",
          "name": "weightKg",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "heightProof",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "weightProof",
          "type": "bytes"
        }
      ],
      "name": "calculateBMICategory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "protocolId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ]
} as const;

