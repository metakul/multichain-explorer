import MyContracts from "./MyContracts";
import ConnectWalletButton from "../../../Components/Buttons/ConnectWalletButton";
import { useRpc } from "../../../contexts/RpcProviderContext";
import Text from "../../../Components/UI/Text";
import Box from "../../../Components/UI/Box";
import Container from "../../../Components/UI/Container";
import { useWalletBalance } from "../../../contexts/UseWalletBalance";
import AddressTrx from "../Explorer/Address/AddressTrx";

function Web3ProfilePage() {

  const { connected, networkName } = useRpc();
  const {userBalance,isLoading}=useWalletBalance() 
  const { walletAddress } = useRpc()
  const formatWalletAddress = (address: string): string => {
    if (!address || address.length < 10) return address;  // In case address is too short to format
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
  };
  
  const formatedBalance = (balance: string): string => {
    if (!balance || balance.length < 10) return balance;  // In case address is too short to format
    return `${balance.slice(0, 6)}`;
  };
  
  return (
    <Container sx={{
      mt:8
    }}>
      {!connected ? (
        <ConnectWalletButton />
      ) : (
        <div>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
            <Box sx={{
              border: "1px solid black",
              borderRadius: "8px",
              p:2,
            }}>
              <Text sx={{
                textAlign: "center",
                fontSize: "1.1rem"
              }}>
                Welcome: {walletAddress && formatWalletAddress(walletAddress)}
              </Text>
            <Text sx={{
              textAlign: "center",
            }}>
                Total Balance: {isLoading ? "Loading Balance" : userBalance && formatedBalance(userBalance)} {networkName}
            </Text>
            </Box>
          </Box>
          <MyContracts pageTitle="My Contracts" userType="Owner" />
        </div>
      )}
        <AddressTrx address={walletAddress} /> 

    </Container>
  )
}

export default Web3ProfilePage
