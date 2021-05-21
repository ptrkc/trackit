import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router";

export default function NavBar() {
    const { user, percentage } = useContext(UserContext);
    const history = useHistory();

    if (user !== "") {
        return (
            <>
                <WhiteSpace />
                <FixedNavBar>
                    <NavButton onClick={() => history.push("/habitos")}>
                        Hábitos
                    </NavButton>
                    <span onClick={() => history.push("/hoje")}>
                        <CircularProgressbarWithChildren
                            value={percentage}
                            background
                            backgroundPadding={6}
                        >
                            <span>Hoje</span>
                        </CircularProgressbarWithChildren>
                    </span>
                    <NavButton onClick={() => history.push("/historico")}>
                        Histórico
                    </NavButton>
                </FixedNavBar>
            </>
        );
    }
    return "";
}

const WhiteSpace = styled.div`
    height: 92px;
`;

const FixedNavBar = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    font-size: 18px;
    background: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.lightAccentColor};
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);

    div {
        width: 91px;
        margin-bottom: 45px;
        span {
            color: ${(props) => props.theme.cardBgColor};
        }
        .CircularProgressbar-path {
            stroke: ${(props) => props.theme.cardBgColor};
        }
        .CircularProgressbar-trail {
            stroke: transparent;
        }
        .CircularProgressbar-background {
            fill: ${(props) => props.theme.lightAccentColor};
        }
    }
`;

const NavButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: inherit;
    height: 100%;
    width: 100%;
    color: inherit;
`;
