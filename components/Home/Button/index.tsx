import useWeb3 from "../../../hooks/useWeb3";

const Button = () => {
    const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3();
    return (
        <button>testing connect wallet</button>
    )
}

export default Button;
