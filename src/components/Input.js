import styled from "styled-components";

const Input = styled.input`
    border: 1px solid ${(props) => props.theme.inputBorderColor};
    border-radius: 5px;
    height: 45px;
    margin-bottom: 6px;
    font-family: inherit;
    color: inherit;
    font-size: 20px;
    line-height: 25px;
    padding: 0px 11px;
    &::placeholder {
        color: ${(props) => props.theme.inputPlaceholderColor};
        opacity: 1;
    }
`;

export default Input;
