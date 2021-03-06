import { useCallback, useEffect, useMemo, useState } from "react";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const infuraId = "a19fe222663e46ff86f9cc5aa083dc25";

const network = "mainnet";

const autoLoad = false;

const useWeb3 = () => {
  const [provider, setProvider] = useState<any>();
  const [autoLoaded, setAutoLoaded] = useState(false);
  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(() => {
    return new Web3Modal({
    //   providerOptions: {
    //     walletconnect: {
    //       package: WalletConnectProvider,
    //       options: {
    //         infuraId,
    //       },
    //     },
    //   },
    });
  }, []);

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

    // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
    useEffect(() => {
      if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
        loadWeb3Modal();
        setAutoLoaded(true);
      }
    }, [autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);
  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
};

export default useWeb3;
