import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { ReactComponent as Logo } from "./../assets/logo.svg";

export default function Header() {
    const { user } = useContext(UserContext);
    console.log(user);
    if (user !== "") {
        return (
            <>
                <WhiteSpace />
                <FixedHeader>
                    <div>
                        <Logo className="logo" />
                        <img src={user.image} alt={user.name} />
                    </div>
                </FixedHeader>
            </>
        );
    }
    return "";
}

const WhiteSpace = styled.div`
    height: 92px;
`;

const FixedHeader = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    left: 0px;
    right: 0px;
    top: 0px;
    background: ${(props) => props.theme.darkAccentColor};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
    div {
        margin: 0px 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .logo {
            height: 49px;
            color: ${(props) => props.theme.cardBgColor};
        }
        img {
            border-radius: 50%;
            height: 51px;
        }
    }
`;
