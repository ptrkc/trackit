import styled from "styled-components";

const SignButton = styled.button`
    border-radius: 5px;
    height: 45px;
    margin-bottom: 6px;
    font-family: inherit;
    color: ${(props) => props.theme.cardBgColor};
    background-color: ${(props) => props.theme.lightAccentColor};
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    border: none;
    width: 100%;
    &:disabled {
        opacity: 0.7;
    }
`;

export default SignButton;
