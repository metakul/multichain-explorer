import MyContracts from "./MyContracts";
import ConnectWalletButton from "../../../../Components/Buttons/ConnectWalletButton";
import { useWalletAuth } from "../../../../contexts/WalletAuthContext";

function Web3ProfilePage() {

  const { connected } = useWalletAuth();

  return (
    <>
      {!connected ? (
        <ConnectWalletButton />
      ) : (
        <div>
          My deployed Contracts
            <MyContracts pageTitle="" userType="Owner" />
        </div>
      )}
    </>
  )
}

export default Web3ProfilePage
