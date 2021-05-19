import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Habits() {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <StyledDiv>
            <div className="my-habits">
                Meus Hábitos <button>+</button>
            </div>
            <p className="no-habits">
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
            </p>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    font-size: 18px;
    line-height: 22px;
    /* background: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.lightAccentColor}; */
    button {
        background-color: ${(props) => props.theme.lightAccentColor};
        width: 40px;
        height: 35px;
        font-size: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.cardBgColor};
        border: none;
        border-radius: 5px;
    }
    .my-habits {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 23px;
        color: ${(props) => props.theme.darkAccentColor};
    }

    .no-habits {
        margin-top: 28px;
    }

    /* div {
        width: 91px;
        margin-bottom: 25px;
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
    } */
`;
