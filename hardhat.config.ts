import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 4294967,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth.llamarpc.com",
        blockNumber: 18909967
      }
    },
    fuji: {
      url: 'https://rpc.ankr.com/avalanche_fuji',
      //accounts: [process.env.PRIVATEKEY!],
      gasMultiplier: 1.5,
    },
    mainnet: {
      url: "https://rpc.ankr.com/eth",
      accounts: [process.env.PRIVATEKEY!],
    },
    ...["optimism", "bsc", "avalanche", "fantom", "arbitrum", "polygon", "polygon_zkevm", "base"].reduce((acc, chain)=>({
      ...acc,
      [chain]: {
        url: `https://rpc.ankr.com/${chain}`,
        accounts: [process.env.PRIVATEKEY!],
        gasMultiplier: 1.1,
      }
    }), {})
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY ?? '',
      avalancheFujiTestnet: process.env.ETHERSCAN_API_KEY ?? ''
    }
  }
};

export default config;
