import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "../components/Input.js";
import SignButton from "./../components/SignButton.js";
import axios from "axios";
import Loader from "react-loader-spinner";
import { isEmail } from "./../components/ValidateInputs";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();

    function signIn(body) {
        setDisabled(true);
        const signInRequest = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            body
        );
        signInRequest.then((response) => {
            console.log(response.data);
            setDisabled(false);
            history.push("/hoje");
        });
        signInRequest.catch((error) => {
            console.log(error.response.data);
            if (error.response.status === 401) {
                alert(error.response.data.message);
            } else {
                alert(
                    "Ocorreu um erro! Confira suas informações e tente novamente."
                );
            }
            setDisabled(false);
        });
    }
    function handleClick() {
        if (email === "" || password === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        if (!isEmail(email)) {
            alert("Por favor, preencha em email válido!");
            return;
        }
        signIn({ email, password });
    }

    return (
        <SignInStyle>
            <FullLogo className="logo" />
            <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
            />
            <Input
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
            />
            <SignButton onClick={handleClick} disabled={disabled}>
                {disabled ? (
                    <Loader
                        type="ThreeDots"
                        color="#FFFFFF"
                        width={51}
                        height={13}
                    />
                ) : (
                    "Entrar"
                )}
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
    .logo {
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
