import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Input from "./../components/Input";
import DaysSelector from "./DaysSelector";

export default function NewHabitCard({ setShowNewHabitCard }) {
    const { user } = useContext(UserContext);
    console.log(user);
    const [disabled, setDisabled] = useState(false);
    const [habit, setHabit] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];

    function toggleDay(i) {
        if (selectedDays.includes(i)) {
            const newArr = selectedDays.filter((d) => d !== i);
            setSelectedDays([...newArr]);
        } else {
            setSelectedDays([...selectedDays, i]);
        }
    }

    function createNewHabit() {
        const body = {
            name: habit,
            days: selectedDays, // segunda, quarta e sexta
        };
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const newHabitRequest = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            body,
            config
        );
        newHabitRequest.then((response) => console.log(response.data));
        newHabitRequest.catch((error) => console.log(error.response.data));
    }
    return (
        <Card>
            <Input
                type="text"
                placeholder="nome do hábito"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                disabled={disabled}
            />
            <div className="days-list">
                <DaysSelector states={{ selectedDays, setSelectedDays }} />
            </div>
            <div className="buttons">
                <button
                    className="cancel"
                    onClick={() => setShowNewHabitCard(false)}
                >
                    Cancelar
                </button>
                <button onClick={createNewHabit}>Salvar</button>
            </div>
        </Card>
    );
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px;
    font-size: 20px;
    line-height: 25px;
    background: ${(props) => props.theme.cardBgColor};
    border-radius: 5px;
    margin-bottom: 29px;
    .buttons {
        display: flex;
        justify-content: flex-end;
        button {
            font-size: 16px;
            line-height: 20px;
            padding: 7px 17px;
            border-radius: 5px;
            border: none;
            background: ${(props) => props.theme.lightAccentColor};
            color: ${(props) => props.theme.cardBgColor};
        }
        .cancel {
            color: ${(props) => props.theme.lightAccentColor};
            background: ${(props) => props.theme.cardBgColor};
        }
    }
`;
