import MyContracts from "./MyContracts";
import ConnectWalletButton from "../../../../Components/Buttons/ConnectWalletButton";
import { useRpc } from "../../../../contexts/RpcProviderContext";

function Web3ProfilePage() {

  const { connected } = useRpc();

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
