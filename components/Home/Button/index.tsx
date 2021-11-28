import { useCallback } from "react";
import useWeb3 from "../../../hooks/useWeb3";

const Button = () => {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3();
  const handleOnClick = useCallback(() => {
    if (!provider) {
      loadWeb3Modal();
    } else {
      logoutOfWeb3Modal();
    }
  }, [loadWeb3Modal, logoutOfWeb3Modal, provider]);
  return <button onClick={handleOnClick}>testing connect wallet</button>;
};

export default Button;
