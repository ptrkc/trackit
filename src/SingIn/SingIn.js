import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "./../components/Input.js";
import SingButton from "./../components/SingButton.js";
export default function SingIn() {
    return (
        <SingInStyle>
            <FullLogo />
            <Input type="text" placeholder="email" />
            <Input type="password" placeholder="senha" />
            <SingButton>Entrar</SingButton>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </SingInStyle>
    );
}
const SingInStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 36px 40px 36px;
    svg {
        margin: 68px 0px 32px 0px;
        width: 180px;
    }
    input {
        width: 100%;
    }
    button {
        margin-bottom: 25px;
    }
    a {
        font-size: 14px;
    }
`;
