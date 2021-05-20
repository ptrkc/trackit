import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Input from "./../components/Input";
import DaysSelector from "./DaysSelector";
import Loader from "react-loader-spinner";

export default function NewHabitCard({ setShowNewHabitCard, getHabits }) {
    const { user, newHabitInfo, setNewHabitInfo } = useContext(UserContext);
    console.log(user);
    const [disabled, setDisabled] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);

    function createNewHabit() {
        if (!newHabitInfo.habit) {
            alert("Preencha um nome para seu hábito.");
            return;
        } else if (!newHabitInfo.selectedDays.length) {
            alert("Escolha pelo menos 1 dia para praticar hábito.");
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
            alert("Algo deu errado. Tente novamente.");
        });
    }
    return (
        <Card>
            <Input
                type="text"
                placeholder="nome do hábito"
                value={newHabitInfo.habit}
                onChange={(e) =>
                    setNewHabitInfo({ ...newHabitInfo, habit: e.target.value })
                }
                disabled={disabled}
            />
            <div className="days-list">
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
            <div className="buttons">
                <button
                    className="cancel"
                    disabled={disabled}
                    onClick={() => setShowNewHabitCard(false)}
                >
                    Cancelar
                </button>
                <button disabled={disabled} onClick={createNewHabit}>
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
            margin-top: 29px;
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
