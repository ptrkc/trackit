import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}
body {
    font-family: ${(props) => props.theme.fontFamily};
    margin: 0px 18px;
    background-color: ${(props) => props.theme.bgColor};
    transition: .5s;
}
`;

export default GlobalStyle;
