# DecentraPay

DecentraPay is a blockchain-based payment gateway designed to offer a decentralized, secure, and transparent alternative to traditional payment processing systems. It enables fast, low-cost transactions with smart contract automation, ensuring trust and reliability.

![image](https://github.com/user-attachments/assets/5e8cff0c-8792-4742-8dac-92f5aed0b3a1)

## Features
- **Decentralized Payments:** No central authority controlling transactions.
- **Secure & Transparent:** Transactions are immutable and publicly verifiable on the blockchain.
- **Smart Contract Automation:** Payments are executed based on predefined conditions.
- **Multi-Currency Support:** Accepts various cryptocurrencies.
- **Low Transaction Fees:** Reduced costs compared to traditional payment gateways.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Blockchain & Smart Contracts:** Solidity (Ethereum)
- **Database:** MongoDB
- **Web3 Integration:** Web3.js

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- MetaMask (for interacting with Ethereum)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/DecentraPay.git
   cd DecentraPay
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_uri
   INFURA_API_KEY=your_infura_api_key
   PRIVATE_KEY=your_wallet_private_key
   ```

4. Compile and deploy smart contracts:
   ```sh
   truffle migrate --network rinkeby
   ```

5. Start the backend server:
   ```sh
   npm run server
   ```

6. Start the frontend application:
   ```sh
   npm start
   ```

## Usage
- Users connect their MetaMask wallet.
- Merchants integrate DecentraPay using API endpoints.
- Transactions are securely processed via Ethereum smart contracts.


## License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the proposed changes.

## Contact
For any queries, contact **Pradeep** at antpradeep.8@gmail.com.

