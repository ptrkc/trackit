import axios from "axios";
import styled from "styled-components";
import Input from "./../components/Input";
import DaysSelector from "./DaysSelector";
import { ReactComponent as Trash } from "./../assets/trash.svg";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function HabitCard({ habit }) {
    const { id, name, days } = habit;
    const { user } = useContext(UserContext);

    function deleteHabit(id) {
        const isSure = window.confirm(
            `Tem certeza que deseja apagar o hábito "${name}"?`
        );
        if (!isSure) {
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const deleteRequest = axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
            config
        );
        deleteRequest.then((response) => console.log(response));
        deleteRequest.catch((error) => console.log(error));
    }
    return (
        <Card>
            <TrashButton onClick={() => deleteHabit(id)}>
                <Trash />
            </TrashButton>
            <span>{name}</span>
            <DaysSelector states={{ selectedDays: days }} />
        </Card>
    );
}

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 13px 15px 15px;
    font-size: 20px;
    line-height: 25px;
    background: ${(props) => props.theme.cardBgColor};
    border-radius: 5px;
    margin-bottom: 10px;
    span {
        margin-bottom: 8px;
    }
`;

const TrashButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    svg {
        width: 13px;
        height: 15px;
        color: ${(props) => props.theme.textColor};
    }
`;
