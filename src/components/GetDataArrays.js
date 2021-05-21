import axios from "axios";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export function GetTodayHabits() {
    const { user, setTodayHabits, setPercentage } = useContext(UserContext);
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

export function GetDataArrays() {
    const { user } = useContext(UserContext);

    useEffect(() => {}, []);

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    function getTodayHabits() {
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

    function getHabits() {
        const newHabitRequest = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            config
        );
        newHabitRequest.then((response) => {
            setHabits([...response.data]);
        });
        newHabitRequest.catch(() =>
            alert("Erro ao carregar hábitos. Teste novamente.")
        );
    }

    function getHabitHistory() {
        const historyRequest = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
            config
        );
        historyRequest.then((response) => {
            setHabitHistory(response.data);
            sortHabitsDoneDay(response.data);
            setSelectedDayHabits(
                response.data.find((h) => h.day === today).habits
            );
        });
        historyRequest.catch(() =>
            alert("Erro ao carregar histórico. Tente novamente.")
        );
    }
}
