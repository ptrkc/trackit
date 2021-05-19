import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "../components/Input.js";
import SignButton from "./../components/SignButton.js";
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");

    return (
        <SignUpStyle>
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
            <Input
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                type="text"
                placeholder="foto"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
            />
            <SignButton
                onClick={() =>
                    alert(`${email}\n${password}\n${name}\n${picture}`)
                }
            >
                Cadastrar
            </SignButton>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </SignUpStyle>
    );
}
const SignUpStyle = styled.div`
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
