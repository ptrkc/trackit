import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import TodayHabitCard from "./TodayHabitCard";
import UserLogedIn from "../components/UserLogedIn";

export default function Habits() {
    const { user, percentage, setPercentage, todayHabits, setTodayHabits } =
        useContext(UserContext);
    const today = dayjs()
        .locale("pt-br")
        .format("dddd, DD/MM")
        .replace("-feira", "");

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
            setTodayHabits([...response.data]);
            const doneList = response.data.filter((h) => h.done === true);
            const percent = Math.ceil(
                (doneList.length / response.data.length) * 100
            );
            setPercentage(percent);
        });
        todayHabitsRequest.catch(() =>
            alert("Erro ao carregar hábitos. Tente novamente.")
        );
    }
    return (
        <StyledDiv>
            <span className="date">{today}</span>
            <Subtitle percentage={percentage}>
                {percentage > 0
                    ? `${percentage}% dos hábitos concluídos`
                    : "Nenhum hábito concluído ainda"}
            </Subtitle>
            {todayHabits.map((habit) => {
                return (
                    <TodayHabitCard
                        key={habit.id}
                        habit={habit}
                        getTodayHabits={getTodayHabits}
                    />
                );
            })}
            {!todayHabits.length ? (
                <p>Você não tem nenhum hábito cadastrado para hoje!</p>
            ) : (
                ""
            )}
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    font-size: 18px;
    line-height: 22px;
    .date {
        font-size: 23px;
        color: ${(props) => props.theme.darkAccentColor};
        margin-bottom: 5px;
    }
`;
const Subtitle = styled.span`
    color: ${(props) =>
        parseInt(props.percentage) > 0
            ? props.theme.doneColor
            : props.theme.noneCompletedColor};
    margin-bottom: 28px;
`;
