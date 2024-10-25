import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";


export default function Header() {
    const [ethPrice, setEthPrice] = useState("2347");

    //todo move to backend call

    useEffect(() => {
        const getEthPrice = async () => {
            const response = await axios.get("http://localhost:5001/getethprice", {});
            setEthPrice(response.data.usdPrice);
        };
        getEthPrice();
    }, []);

    return (
        <Box>
            <Avatar.Root >
                <Avatar.Image
                    width={100} height={50}
                    src="/logo.svg"
                    alt="Colm Tuite"
                />
            </Avatar.Root>
            <Box display='block'>
                <Heading size="6">
                    ETH Price: <span style={{ color: 'blue' }}>${Number(ethPrice).toFixed(2)}</span>
                </Heading>

            </Box>

        </Box>
    );
}
