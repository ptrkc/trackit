import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "../components/Input.js";
import axios from "axios";
import Loader from "react-loader-spinner";
import { isEmail, isURL } from "./../components/ValidateInputs";
import UserContext from "../contexts/UserContext";
import UserLogedIn from "../components/UserLogedIn";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(<>&nbsp;</>);

    UserLogedIn(true);

    useEffect(() => {
        if (user) {
            history.push("/hoje");
            return;
        }
    }, [user]);

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
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(
                    "Ocorreu um erro! Confira suas informações e tente novamente."
                );
            }
            setDisabled(false);
        });
    }
    function handleClick(event) {
        event.preventDefault();
        if (email === "" || name === "" || image === "" || password === "") {
            setErrorMessage("Por favor, preencha todos os campos!");
            return;
        }
        if (!isEmail(email)) {
            setErrorMessage("Por favor, preencha em email válido!");
            return;
        }
        if (!isURL(image)) {
            setErrorMessage("Por favor, preencha uma foto válida!");
            return;
        }
        createAccount({ email, name, image, password });
    }
    return (
        <SignUpStyleForm onSubmit={handleClick}>
            <FullLogo className="logo" />
            <span>{errorMessage}</span>
            <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => {
                    setErrorMessage(<>&nbsp;</>);
                    setEmail(e.target.value);
                }}
                disabled={disabled}
            />
            <Input
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => {
                    setErrorMessage(<>&nbsp;</>);
                    setPassword(e.target.value);
                }}
                disabled={disabled}
            />
            <Input
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => {
                    setErrorMessage(<>&nbsp;</>);
                    setName(e.target.value);
                }}
                disabled={disabled}
            />
            <Input
                type="text"
                placeholder="foto"
                value={image}
                onChange={(e) => {
                    setErrorMessage(<>&nbsp;</>);
                    setImage(e.target.value);
                }}
                disabled={disabled}
            />
            <SignButton disabled={disabled}>
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
        </SignUpStyleForm>
    );
}
const SignUpStyleForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0px auto 30px;
    padding: 0px 36px;
    .logo {
        margin: 68px auto 32px;
        width: 180px;
    }
    span {
        color: #ff4b4b;
        font-size: 14px;
        margin-bottom: 8px;
    }

    input {
        width: 100%;
    }
    button {
        margin-bottom: 25px;
        cursor: pointer;
    }
    a {
        font-size: 14px;
        margin: 0px auto;
    }
`;

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
