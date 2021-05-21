import Calendar from "react-calendar";
import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserLogedIn from "../components/UserLogedIn";
import "react-calendar/dist/Calendar.css";

export default function History() {
    const { user } = useContext(UserContext);
    const [value, onChange] = useState(new Date());
    const [habitHistory, setHabitHistory] = useState("");
    const [allDoneDays, setAllDoneDays] = useState([]);
    const [notAllDoneDays, setNotAllDoneDays] = useState([]);
    const fakeHistory = [
        {
            day: "20/05/2021",
            habits: [
                {
                    id: 3,
                    name: "Acordar",
                    date: "2021-05-20T12:00:00.000Z",
                    weekDay: 4,
                    historyId: null,
                    done: false,
                },
            ],
        },
        {
            day: "19/05/2021",
            habits: [
                {
                    id: 3,
                    name: "Acordar",
                    date: "2021-05-19T12:00:00.000Z",
                    weekDay: 3,
                    historyId: 626,
                    done: true,
                },
                {
                    id: 1,
                    name: "Ler 1 capítulo do livro",
                    date: "2021-05-19T12:00:00.000Z",
                    weekDay: 3,
                    historyId: 625,
                    done: true,
                },
            ],
        },
        {
            day: "18/05/2021",
            habits: [
                {
                    id: 3,
                    name: "Acordar",
                    date: "2021-05-18T12:00:00.000Z",
                    weekDay: 2,
                    historyId: 7,
                    done: true,
                },
            ],
        },
        {
            day: "17/05/2021",
            habits: [
                {
                    id: 1,
                    name: "Ler 1 capítulo do livro",
                    date: "2021-05-17T12:00:00.000Z",
                    weekDay: 1,
                    historyId: 1,
                    done: true,
                },
            ],
        },
        {
            day: "16/05/2021",
            habits: [
                {
                    id: 1,
                    name: "Ler 1 capítulo do livro",
                    date: "2021-05-16T12:00:00.000Z",
                    weekDay: 0,
                    historyId: null,
                    done: false,
                },
            ],
        },
        {
            day: "14/05/2021",
            habits: [
                {
                    id: 1,
                    name: "Ler 1 capítulo do livro",
                    date: "2021-05-14T12:00:00.000Z",
                    weekDay: 5,
                    historyId: null,
                    done: false,
                },
            ],
        },
    ];

    UserLogedIn();

    useEffect(() => {
        if (user) {
            getHabitHistory();
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
            console.log(response.data);
            setHabitHistory(response.data);
            sortHabitsDoneDay(response.data);
            // setHabitHistory(fakeHistory);
            // sortHabitsDoneDay(fakeHistory);
        });
        historyRequest.catch((error) => console.log(error.response.data));
    }

    function sortHabitsDoneDay(responseArray) {
        const allDoneArray = [];
        const notAllDoneArray = [];
        responseArray.forEach((day) => {
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

    return (
        <Container>
            <p className="title">Histórico</p>
            <CalendarContainer>
                <Calendar
                    onChange={onChange}
                    value={value}
                    locale={"pt-br"}
                    calendarType={"US"}
                    tileClassName={tileClassName}
                />
            </CalendarContainer>
            <p>
                {String(
                    dayjs(value)
                        .locale("pt-br")
                        .format("dddd, DD/MM/YYYY")
                        .replace("-feira", "")
                )}
            </p>

            {/* {!todayHabits.length ? (
                <p>Você não tem nenhum hábito cadastrado para hoje!</p>
            ) : (
                ""
            )} */}
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
`;

const CalendarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0px;
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
        height: 50px;
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
