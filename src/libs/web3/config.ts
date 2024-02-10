// Sets if the example should run locally or on chain
export enum Chain {
  // POLYGON,
  // MAINNET,
  BLAST_MAINNET,
  BLAST_SEPOLOIA_TESTNET
}

// Inputs that configure this example to run
interface ExampleConfig {
  chain: Chain;
  rpc: {
    // polygon: string;
    mainnet: string;
    testnet: string;
  };
}

// Example Configuration
export const CurrentConfig: ExampleConfig = {
  chain: Chain.BLAST_SEPOLOIA_TESTNET,
  rpc: {
    // polygon: "",
    mainnet: "",
    testnet: "https://sepolia.blast.io"
  },
};
