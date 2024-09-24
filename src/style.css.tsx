
import { styled } from '@stitches/react';

const getScreenWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const screenWidth = getScreenWidth();

export const Main = styled("div", {
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    minWidth: screenWidth + "px",
    margin:"30px"
})


export const StyledRoot = styled('div', {
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    marginLeft:"auto",
    marginRight:"auto",
    margin: "30px"

});
