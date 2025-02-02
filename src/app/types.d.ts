type InjectedProviders = {
  isMetaMask?: true;
};

interface Window {
  ethereum: InjectedProviders & {
    on: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    request<T = any>(args: any): Promise<T>;
    isMetaMask?: true;
    autoRefreshOnNetworkChange?: boolean;
    selectedAddress: string;
    enable: () => void;
  };
}
