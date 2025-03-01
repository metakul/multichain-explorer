// import { useEffect, useState } from "react";
// import axios from "axios";
import { Typography } from "@mui/material";
import Box from "../UI/Box";


export default function Header() {
    // const [ethPrice, setEthPrice] = useState("2347");

    //todo move to backend call

    // useEffect(() => {
    //     const getEthPrice = async () => {
    //         const response = await axios.get("http://localhost:5001/getethprice", {});
    //         setEthPrice(response.data.usdPrice);
    //     };
    //     getEthPrice();
    // }, []);

    return (
        <Box>
            <Typography style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontWeight:"bold"
            }} >The Multi- Blockchain Explorer
                    <img
                        width={40} height={40}
                        src="/logo.svg"
                        alt="Colm Tuite"
                    />
            </Typography>
        </Box>
    );
}
