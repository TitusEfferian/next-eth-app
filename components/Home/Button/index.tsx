import { useCallback, useEffect, useState } from "react";
import useWeb3 from "../../../hooks/useWeb3";
import {ethers} from 'ethers';


const Button = () => {
  const [account, setAccount] = useState("");
  const [rendered, setRendered] = useState("");
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3();
  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        const balance = await provider.getBalance(accounts[0]);
        console.log(ethers.utils.formatEther(balance))
        setAccount(accounts[0]);

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, provider, setAccount, setRendered]);
  const handleOnClick = useCallback(() => {
    if (!provider) {
      loadWeb3Modal();
    } else {
      logoutOfWeb3Modal();
    }
  }, [loadWeb3Modal, logoutOfWeb3Modal, provider]);
  return (
    <button onClick={handleOnClick}>
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </button>
  );
};

export default Button;
