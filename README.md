# 🔒 Privacy-Preserving BMI Calculator

A cutting-edge decentralized application (dApp) that computes Body Mass Index (BMI) with complete privacy protection using Fully Homomorphic Encryption (FHEVM). Users can calculate their BMI without revealing their actual height and weight measurements.

## 🌟 Key Features

- **🔐 Zero-Knowledge BMI Computation**: Input data remains encrypted throughout the entire process
- **⛓️ Blockchain-Powered**: Smart contract deployed on Sepolia testnet
- **🎨 Modern UI**: Beautiful React interface with MetaMask integration
- **🛡️ Privacy-First**: Only BMI category results are revealed (underweight/normal/overweight)
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Real-Time Calculation**: Instant encrypted computation on-chain

## 🚀 Live Demo

**Sepolia Testnet Contract**: [`0x3d96B36325Bd947F93BD4b8473867B6a0e078522`](https://sepolia.etherscan.io/address/0x3d96B36325Bd947F93BD4b8473867B6a0e078522)

**Live Application**: [Deployed on Vercel/Netlify/etc.]

## 🏗️ Architecture

### Backend (Smart Contract)
- **Solidity**: FHEVM-compatible smart contract
- **FHEVM**: Homomorphic encryption operations
- **Sepolia Testnet**: Ethereum Layer 2 testnet

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern, responsive styling
- **MetaMask**: Web3 wallet integration
- **Zama FHE SDK**: Client-side encryption/decryption

## 📋 Prerequisites

- Node.js 20+
- MetaMask browser extension
- Sepolia testnet ETH (for gas fees)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Yale-Giles/privacy-bmi-calculator.git
cd privacy-bmi-calculator
```

### 2. Install Dependencies
```bash
# Frontend dependencies
cd frontend
npm install

# Smart contract dependencies
cd ../fhevm-hardhat-template
npm install
```

### 3. Environment Setup
```bash
# In fhevm-hardhat-template directory
npx hardhat vars set MNEMONIC
npx hardhat vars set INFURA_API_KEY
npx hardhat vars set ETHERSCAN_API_KEY
```

### 4. Local Development

#### Start Local Blockchain
```bash
cd fhevm-hardhat-template
npx hardhat node
```

#### Deploy to Local Network
```bash
npx hardhat deploy --network localhost
```

#### Start Frontend
```bash
cd ../frontend
npm run dev:mock  # Uses local mock for development
```

### 5. Production Deployment

#### Deploy Smart Contract to Sepolia
```bash
cd fhevm-hardhat-template
npx hardhat deploy --network sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

#### Build Frontend
```bash
cd frontend
npm run build
npm run export  # Creates static files in 'out/' directory
```

## 🎯 Usage

1. **Connect Wallet**: Click "连接MetaMask" and connect your wallet
2. **Input Data**: Enter your height (cm) and weight (kg)
3. **Calculate**: Click "🧮 计算BMI" to perform encrypted computation
4. **View Result**: Click "🔓 查看BMI分类" to decrypt and see your BMI category

## 🔬 How It Works

### Privacy-Preserving Computation
1. **Input Encryption**: Height and weight are encrypted client-side using FHE public keys
2. **On-Chain Processing**: Encrypted data is sent to the smart contract
3. **Homomorphic Operations**: BMI calculation occurs on encrypted data
4. **Result Decryption**: Only the BMI category (not actual values) is decrypted and revealed

### BMI Classification
- **Underweight**: BMI < 18.5
- **Normal**: 18.5 ≤ BMI < 24
- **Overweight**: BMI ≥ 24

## 📁 Project Structure

```
privacy-bmi-calculator/
├── fhevm-hardhat-template/     # Smart contract development
│   ├── contracts/              # Solidity contracts
│   ├── deploy/                 # Deployment scripts
│   ├── test/                   # Contract tests
│   └── hardhat.config.ts       # Hardhat configuration
├── frontend/                   # React application
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   ├── fhevm/                  # FHE SDK integration
│   ├── hooks/                  # Custom React hooks
│   ├── out/                    # Static export (after build)
│   └── public/                 # Static assets
└── README.md                   # This file
```

## 🧪 Testing

### Smart Contract Tests
```bash
cd fhevm-hardhat-template
npm run test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🚀 Deployment Options

### Static Hosting
The frontend is configured for static export and can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Requirements for Static Deployment
- HTTPS environment (required for MetaMask)
- Proper CORS headers (automatically configured)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama** - For the incredible FHEVM technology
- **Ethereum Foundation** - For Sepolia testnet
- **OpenZeppelin** - For smart contract best practices

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Yale-Giles/privacy-bmi-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Yale-Giles/privacy-bmi-calculator/discussions)
- **Zama Community**: [Discord](https://discord.gg/zama)

---

**Built with ❤️ using FHEVM, React, and cutting-edge privacy technology**
