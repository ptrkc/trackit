import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import TodayHabitCard from "./TodayHabitCard";
import UserLogedIn from "../components/UserLogedIn";

export default function Habits() {
    const [todayHabits, setTodayHabits] = useState([]);
    const { user } = useContext(UserContext);
    const today = dayjs().locale("pt-br").format("dddd, DD/MM");

    UserLogedIn();

    useEffect(() => {
        if (user) {
            getTodayHabits();
        }
    }, [user]);

    function getTodayHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const todayHabitsRequest = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            config
        );
        todayHabitsRequest.then((response) => {
            console.log(response.data);
            setTodayHabits([...response.data]);
        });
        todayHabitsRequest.catch((error) => console.log(error.response.data));
    }
    return (
        <StyledDiv>
            <div className="date">{today}</div>
            {/* {showNewHabitCard ? (
                <NewHabitCard
                    setShowNewHabitCard={setShowNewHabitCard}
                    getHabits={getHabits}
                />
            ) : (
                ""
            )} */}
            {todayHabits.map((habit) => {
                return <TodayHabitCard key={habit.id} habit={habit} />;
            })}
            {!todayHabits.length ? (
                <p className="no-habits">
                    Você não tem nenhum hábito cadastrado para hoje!
                </p>
            ) : (
                ""
            )}
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    font-size: 18px;
    line-height: 22px;
    .date {
        font-size: 23px;
        color: ${(props) => props.theme.darkAccentColor};
    }
    .no-habits {
        margin-top: 8px;
    }
`;
