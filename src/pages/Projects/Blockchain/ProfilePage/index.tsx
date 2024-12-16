import MyContracts from "./MyContracts";
import ConnectWalletButton from "../../../../Components/Buttons/ConnectWalletButton";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { Box, Container, Typography } from "@mui/material";

function Web3ProfilePage() {

  const { connected } = useRpc();

  const balance="145.01"

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
              <Typography sx={{
                textAlign: "center",
                fontSize: "1.3rem"
              }}>
                Welcome <br/> {walletAddress}
              </Typography>

            </Box>
            <Box sx={{
              border: "2px solid black",
              borderRadius: "8px",
              width: "80%",
              position: "relative",
              bottom:24,
              py:4,
            }}>
              <Typography sx={{
                textAlign: "center",
                fontSize: "1.3rem"
              }}>

                {/* // todo get balance based on wallet address and chainId */}
                  Total Balance: {balance} 
              </Typography>
            </Box>
          </Box>
          <MyContracts pageTitle="" userType="Owner" />
        </div>
      )}
    </Container>
  )
}

export default Web3ProfilePage
