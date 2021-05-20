import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import NewHabitCard from "./NewHabitCard";
import DaysSelector from "./DaysSelector";
import HabitCard from "./HabitCard";
import UserLogedIn from "../components/UserLogedIn";

export default function Habits() {
    const [showNewHabitCard, setShowNewHabitCard] = useState(false);
    const [habits, setHabits] = useState([]);
    const { user } = useContext(UserContext);

    UserLogedIn();

    useEffect(() => {
        if (user) {
            getHabits();
        }
    }, [user]);

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
                <NewHabitCard
                    setShowNewHabitCard={setShowNewHabitCard}
                    getHabits={getHabits}
                />
            ) : undefined}
            {habits.map((habit) => {
                return (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        getHabits={getHabits}
                    />
                );
            })}
            {!habits.length ? (
                <p className="no-habits">
                    Você não tem nenhum hábito cadastrado ainda. Adicione um
                    hábito para começar a trackear!
                </p>
            ) : undefined}
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    font-size: 18px;
    line-height: 22px;
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
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${(props) => props.theme.cardBgColor};
            border: none;
            border-radius: 5px;
        }
    }
    .no-habits {
        margin-top: 8px;
    }
`;
