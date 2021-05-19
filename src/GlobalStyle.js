import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}
body {
    font-family: ${(props) => props.theme.fontFamily};
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
}
a {
    color: ${(props) => props.theme.lightAccentColor};
}
`;

export default GlobalStyle;
