import { styled } from "@mui/material/styles";

// Function to get screen width dynamically
const getScreenWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const Main = styled("div")(() => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    minWidth: `${getScreenWidth()}px`, // Ensure it's correctly formatted as a string
    margin: "30px",
}));

export const StyledRoot = styled("div")(() => ({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    margin: "30px",
}));
