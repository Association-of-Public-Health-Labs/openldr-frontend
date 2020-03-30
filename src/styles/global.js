import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
   
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: "Open Sans", sans-serif;
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        font-size: 14px
    }
`;
