type ENV_TYPE = 'develop' | 'production';

declare global {
  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
    interface ProcessEnv {
      NODE_ENV: ENV_TYPE;

      NEXT_PUBLIC_TOR_TOKEN_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_REF_THRONE_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_ETH_TREASURY_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_USER_HISTORY_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_USER_CONTRACT_ADDRESS: string;

    }
  }
}

export { };
