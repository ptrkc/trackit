import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import NewHabitCard from "./NewHabitCard";
export default function Habits() {
    const [showNewHabitCard, setShowNewHabitCard] = useState(false);
    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <StyledDiv>
            <div className="my-habits">
                Meus Hábitos
                <button onClick={() => setShowNewHabitCard(true)}>+</button>
            </div>
            {showNewHabitCard ? (
                <div className="new-habit-card">
                    <NewHabitCard setShowNewHabitCard={setShowNewHabitCard} />
                </div>
            ) : (
                ""
            )}
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

    .my-habits {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 23px;
        color: ${(props) => props.theme.darkAccentColor};
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
    }
    div.new-habit-card {
        margin-top: 20px;
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
