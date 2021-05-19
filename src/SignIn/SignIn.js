import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "../components/Input.js";
import SignButton from "./../components/SignButton.js";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SignInStyle>
            <FullLogo />
            <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SignButton onClick={() => alert(`${email}\n${password}`)}>
                Entrar
            </SignButton>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </SignInStyle>
    );
}
const SignInStyle = styled.div`
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
