import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "../components/Input.js";
import SignButton from "./../components/SignButton.js";
import axios from "axios";
import Loader from "react-loader-spinner";
import { isEmail, isURL } from "./../components/ValidateInputs";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();

    function createAccount(body) {
        setDisabled(true);
        const createAccountRequest = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            body
        );
        createAccountRequest.then((response) => {
            console.log(response.data);
            setDisabled(false);
            history.push("/");
        });
        createAccountRequest.catch((error) => {
            console.log(error.response.data);
            if (error.response.status === 409) {
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
        if (email === "" || name === "" || image === "" || password === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        if (!isEmail(email)) {
            alert("Por favor, preencha em email válido!");
            return;
        }
        if (!isURL(image)) {
            alert("Por favor, preencha uma foto válida!");
            return;
        }
        createAccount({ email, name, image, password });
    }
    return (
        <SignUpStyle>
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
            <Input
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
            />
            <Input
                type="text"
                placeholder="foto"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
                    "Cadastrar"
                )}
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
    .logo {
        margin: 68px 0px 32px 0px;
        width: 180px;
    }
    input {
        width: 100%;
    }
    button {
        margin-bottom: 25px;
        /* display: flex;
        align-items: center;
        justify-content: center; */
    }
    a {
        font-size: 14px;
    }
`;
