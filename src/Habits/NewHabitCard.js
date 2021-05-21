import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Input from "./../components/Input";
import DaysSelector from "./DaysSelector";
import Loader from "react-loader-spinner";

export default function NewHabitCard({ setShowNewHabitCard, getHabits }) {
    const { user, newHabitInfo, setNewHabitInfo } = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [errorMessage, setErrorMessage] = useState(<>&nbsp;</>);

    function createNewHabit(event) {
        event.preventDefault();
        if (!newHabitInfo.habit) {
            setErrorMessage("Preencha um nome para seu hábito.");
            return;
        } else if (!newHabitInfo.selectedDays.length) {
            setErrorMessage("Escolha pelo menos 1 dia.");
            return;
        }
        setDisabled(true);
        const body = {
            name: newHabitInfo.habit,
            days: newHabitInfo.selectedDays, // segunda, quarta e sexta
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
        newHabitRequest.then(() => {
            setDisabled(false);
            getHabits();
            setShowNewHabitCard(false);
            setNewHabitInfo({
                habit: "",
                selectedDays: [],
            });
        });
        newHabitRequest.catch(() => {
            setDisabled(false);
            setErrorMessage("Algo deu errado. Tente novamente.");
        });
    }
    return (
        <Card onSubmit={createNewHabit}>
            <Input
                type="text"
                placeholder="nome do hábito"
                value={newHabitInfo.habit}
                onChange={(e) => {
                    setErrorMessage(<>&nbsp;</>);
                    setNewHabitInfo({ ...newHabitInfo, habit: e.target.value });
                }}
                disabled={disabled}
            />
            <div
                className="days-list"
                onClick={() => setErrorMessage(<>&nbsp;</>)}
            >
                <DaysSelector
                    states={{
                        selectedDays,
                        setSelectedDays,
                        disabled,
                        newHabitInfo,
                        setNewHabitInfo,
                    }}
                />
            </div>
            <span>{errorMessage}</span>
            <div className="buttons">
                <button
                    type="button"
                    className="cancel"
                    disabled={disabled}
                    onClick={() => setShowNewHabitCard(false)}
                >
                    Cancelar
                </button>
                <button disabled={disabled}>
                    {disabled ? (
                        <Loader
                            type="ThreeDots"
                            color="#FFFFFF"
                            width={43}
                            height={11}
                        />
                    ) : (
                        "Salvar"
                    )}
                </button>
            </div>
        </Card>
    );
}

const Card = styled.form`
    display: flex;
    flex-direction: column;
    padding: 18px;
    font-size: 20px;
    line-height: 25px;
    background: ${(props) => props.theme.cardBgColor};
    border-radius: 5px;
    margin-bottom: 29px;

    span {
        color: #ff4b4b;
        font-size: 14px;
    }
    .buttons {
        display: flex;
        justify-content: flex-end;
        button {
            margin-top: 5px;
            font-size: 16px;
            line-height: 20px;
            padding: 7px 0px;
            width: 83px;
            border-radius: 5px;
            border: none;
            background: ${(props) => props.theme.lightAccentColor};
            color: ${(props) => props.theme.cardBgColor};
            &:disabled {
                opacity: 0.7;
            }
        }
        .cancel {
            color: ${(props) => props.theme.lightAccentColor};
            background: ${(props) => props.theme.cardBgColor};
        }
    }
`;
