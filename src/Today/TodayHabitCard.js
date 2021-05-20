import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function TodayHabitCard({ habit }) {
    const { currentSequence, done, highestSequence, id, name } = habit;
    const { user } = useContext(UserContext);

    function toggleHabit(id) {
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
            <div>
                <p>{name}</p>
                <p>Sequência atual: {currentSequence} dias.</p>
                <p>Sequencia maxima: {highestSequence} dias.</p>
            </div>
            <div>{done}</div>
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
`;
