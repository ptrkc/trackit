import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import NewHabitCard from "./NewHabitCard";
import DaysSelector from "./DaysSelector";
import HabitCard from "./HabitCard";

export default function Habits() {
    const [showNewHabitCard, setShowNewHabitCard] = useState(false);
    const [habits, setHabits] = useState([]);
    const { user } = useContext(UserContext);
    console.log(user);

    useEffect(() => {
        getHabits();
    }, []);

    function getHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const newHabitRequest = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            config
        );
        newHabitRequest.then((response) => {
            console.log(response.data);
            setHabits([...response.data]);
        });
        newHabitRequest.catch((error) => console.log(error.response.data));
    }
    return (
        <StyledDiv>
            <div className="my-habits">
                Meus Hábitos
                <button onClick={() => setShowNewHabitCard(true)}>+</button>
            </div>
            {showNewHabitCard ? (
                <NewHabitCard setShowNewHabitCard={setShowNewHabitCard} />
            ) : (
                ""
            )}
            {habits.map((habit) => {
                return <HabitCard habit={habit} getHabits={getHabits} />;
            })}
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
        margin-bottom: 20px;
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
