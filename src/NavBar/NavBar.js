import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router";
import TodayContext from "../contexts/TodayContext";

export default function NavBar() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const { percentage } = useContext(TodayContext);

    if (user !== "") {
        return (
            <>
                <WhiteSpace />
                <FixedNavBar>
                    <span onClick={() => history.push("/habitos")}>
                        Hábitos
                    </span>
                    <span onClick={() => history.push("/hoje")}>
                        <CircularProgressbarWithChildren
                            value={percentage}
                            background
                            backgroundPadding={6}
                        >
                            <span>Hoje</span>
                        </CircularProgressbarWithChildren>
                    </span>
                    <span onClick={() => history.push("/historico")}>
                        Histórico
                    </span>
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
    padding: 0px 36px;
    font-size: 18px;
    background: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.lightAccentColor};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

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
