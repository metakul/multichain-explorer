
import Box from "../../../../Components/UI/Box";
import Transactions from "../../../../Components/Transactions/AllTrx";
import { useMediaQuery } from "@mui/material";

function TransactionPage() {
  const isNonMobile = useMediaQuery("(min-width: 768px)");
    
    return (
        <Box sx={{ marginTop: "120px",
                  px: isNonMobile ? 4 : 2
            
         }}>
         <Transactions/>
        </Box>
    );
}

export default TransactionPage;
