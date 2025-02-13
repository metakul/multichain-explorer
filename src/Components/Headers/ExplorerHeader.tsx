// import { useEffect, useState } from "react";
// import axios from "axios";
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
            <h3 style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }} >The Blockchain Explorer
                    <img
                        width={50} height={50}
                        src="/logo.svg"
                        alt="Colm Tuite"
                    />
            </h3>
        </Box>
    );
}
