// import { useEffect, useState } from "react";
// import axios from "axios";
import { Box } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";


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
                textAlign: "left",
            }} >The Blockchain Explorer
                <Avatar.Root >
                    <Avatar.Image
                        width={100} height={50}
                        src="/logo.svg"
                        alt="Colm Tuite"
                    />
                </Avatar.Root>
            </h3>
        </Box>
    );
}
