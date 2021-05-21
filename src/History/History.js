import Calendar from "react-calendar";
import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserLogedIn from "../components/UserLogedIn";
import "react-calendar/dist/Calendar.css";
import HistoryHabitCard from "./HistoryHabitCard";

export default function History() {
    const today = dayjs().format("DD/MM/YYYY");
    const { user, habitHistory, setHabitHistory } = useContext(UserContext);
    const [value, onChange] = useState(new Date());
    const [selectedDayHabits, setSelectedDayHabits] = useState([]);
    const [allDoneDays, setAllDoneDays] = useState([]);
    const [notAllDoneDays, setNotAllDoneDays] = useState([]);

    UserLogedIn();

    useEffect(() => {
        if (user) {
            getHabitHistory();
        }
        if (habitHistory.length > 0) {
            sortHabitsDoneDay(habitHistory);
            setSelectedDayHabits(
                habitHistory.find((h) => h.day === today).habits
            );
        }
    }, [user]);

    function getHabitHistory() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const historyRequest = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
            config
        );
        historyRequest.then((response) => {
            setHabitHistory(response.data);
            sortHabitsDoneDay(response.data);
            console.log(response.data);
            const firstSelected = response.data.find((h) => h.day === today);
            if (firstSelected !== undefined) {
                setSelectedDayHabits(
                    response.data.find((h) => h.day === today).habits
                );
            }
        });
        historyRequest.catch(() =>
            alert("Erro ao carregar histórico. Tente novamente.")
        );
    }

    function sortHabitsDoneDay(responseArray) {
        const allDoneArray = [];
        const notAllDoneArray = [];
        responseArray.forEach((day) => {
            if (day.day === today) {
                return;
            }
            const doneArray = day.habits.map((habit) => habit.done);
            const allDone = doneArray.reduce((acc, cur) => acc && cur);
            if (allDone) {
                allDoneArray.push(day.day);
            } else {
                notAllDoneArray.push(day.day);
            }
        });
        setAllDoneDays(allDoneArray);
        setNotAllDoneDays(notAllDoneArray);
    }

    function tileClassName({ date, view }) {
        const calDate = dayjs(date).format("DD/MM/YYYY");
        if (view === "month") {
            if (allDoneDays.includes(calDate)) {
                return "habit-days all-done";
            } else if (notAllDoneDays.includes(calDate)) {
                return "habit-days not-all-done";
            }
        }
    }
    function changeActiveDay(value) {
        const day = dayjs(value).format("DD/MM/YYYY");
        const clickedDay = habitHistory.find((h) => h.day === day);
        if (!!clickedDay) {
            setSelectedDayHabits(clickedDay.habits);
        } else {
            setSelectedDayHabits([]);
        }
    }

    return (
        <Container>
            <p className="title">Histórico</p>
            <CalendarContainer>
                <Calendar
                    onChange={onChange}
                    onClickDay={changeActiveDay}
                    value={value}
                    locale={"pt-br"}
                    calendarType={"US"}
                    tileClassName={tileClassName}
                />
            </CalendarContainer>
            <div>
                <p>
                    {String(
                        dayjs(value)
                            .locale("pt-br")
                            .format("dddd, DD/MM/YYYY")
                            .replace("-feira", "")
                    )}
                </p>
                {selectedDayHabits.map((habit) => {
                    return <HistoryHabitCard key={habit.id} habit={habit} />;
                })}
                {!selectedDayHabits.length ? <p>Nenhum hábito no dia.</p> : ""}
            </div>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    font-size: 18px;
    line-height: 22px;
    .title {
        font-size: 23px;
        color: ${(props) => props.theme.darkAccentColor};
    }
    div p {
        margin-bottom: 15px;
    }
`;

const CalendarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0px;
    color: black;
    .habit-days {
        border: 5px solid white;
        border-radius: 50%;
    }
    .all-done {
        background-color: #8cc654;
    }
    .not-all-done {
        background-color: #ea5766;
    }
    .react-calendar__tile {
        height: 48px;
        text-align: center;
        padding: 0px;
    }
    .react-calendar {
        width: 335px;
        max-width: 100%;
        background: white;
        border: none;
        border-radius: 10px;
        line-height: 1.125em;
    }
    @media screen and (max-width: 365px) {
        .react-calendar__tile {
            height: 40px;
            padding: 0.5em 0.5em;
        }
        .react-calendar {
            min-width: 280px;
            max-width: 280px;
        }
    }
`;
