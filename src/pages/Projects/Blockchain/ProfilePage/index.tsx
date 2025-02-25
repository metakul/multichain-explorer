import MyContracts from "./MyContracts";
import ConnectWalletButton from "../../../../Components/Buttons/ConnectWalletButton";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import Text from "../../../../Components/UI/Text";
import Box from "../../../../Components/UI/Box";
import Container from "../../../../Components/UI/Container";
import { useWalletBalance } from "../../../../contexts/UseWalletBalance";

function Web3ProfilePage() {

  const { connected } = useRpc();
  const {userBalance,isLoading}=useWalletBalance() 
  const { walletAddress } = useRpc()

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
              border: "2px solid black",
              borderRadius: "8px",
              p:4,
              width: "80%",
            }}>
              <Text sx={{
                textAlign: "center",
                fontSize: "1.3rem"
              }}>
                Welcome<br/>{walletAddress}
              </Text>
            </Box>
            <Box sx={{
              border: "2px solid black",
              borderRadius: "8px",
              width: "80%",
              position: "relative",
              bottom:24,
              py:4,
            }}>
              <Text sx={{
                textAlign: "center",
                fontSize: "1.3rem"
              }}>
                {/* // todo get balance based on wallet address and chainId */}
                  Total Balance: {isLoading ? userBalance : "Loading Balance"} 
              </Text>
            </Box>
          </Box>
          <MyContracts pageTitle="" userType="Owner" />
        </div>
      )}
    </Container>
  )
}

export default Web3ProfilePage
