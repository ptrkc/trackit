import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as FullLogo } from "./../assets/full-logo.svg";
import Input from "../components/Input.js";
import axios from "axios";
import Loader from "react-loader-spinner";
import { isEmail } from "./../components/ValidateInputs";
import UserContext from "../contexts/UserContext";
import UserLogedIn from "../components/UserLogedIn";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<>&nbsp;</>);
    const history = useHistory();
    const { user } = useContext(UserContext);

    UserLogedIn();

    useEffect(() => {
        if (user) {
            history.push("/hoje");
            return;
        }
    }, [user]);

    function signIn(body) {
        setDisabled(true);
        const signInRequest = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            body
        );
        signInRequest.then((response) => {
            setDisabled(false);
            localStorage.setItem("user", JSON.stringify(response.data));
            history.push("/hoje");
        });
        signInRequest.catch((error) => {
            if (error.response.status === 401) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(
                    "Ocorreu um erro.\nConfira suas informações e tente novamente."
                );
            }
            setDisabled(false);
        });
    }
    function handleClick(event) {
        event.preventDefault();
        if (email === "" || password === "") {
            setErrorMessage("Preencha todos os campos.");
            return;
        }
        if (!isEmail(email)) {
            setErrorMessage("Preencha um email válido.");
            return;
        }
        signIn({ email, password });
    }

    return (
        <SignInStyle>
            <FullLogo className="logo" />
            <span>{errorMessage}</span>
            <form onSubmit={handleClick}>
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
                <SignButton disabled={disabled}>
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
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </SignInStyle>
    );
}
const SignInStyle = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0px auto 40px;
    padding: 0px 36px;
    .logo {
        margin: 68px auto 32px auto;
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
