import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { ReactComponent as Checkmark } from "./../assets/check.svg";

export default function TodayHabitCard({ habit, getTodayHabits }) {
    const { currentSequence, done, highestSequence, id, name } = habit;
    const { user } = useContext(UserContext);

    function toggleCheck(id, isChecked) {
        const un = isChecked ? "un" : "";
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const toggleCheckRequest = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${un}check`,
            {},
            config
        );
        toggleCheckRequest.then(() => {
            getTodayHabits();
        });
        toggleCheckRequest.catch((error) => console.log(error.response.data));
    }
    console.log(done);
    return (
        <Card>
            <div className="left">
                <p className="title"> {name}</p>
                <p>
                    Sequência atual: {currentSequence} dia
                    {currentSequence > 1 ? "s" : ""}.
                </p>
                <p>
                    Sequencia maxima: {highestSequence} dia
                    {highestSequence > 1 ? "s" : ""}.
                </p>
            </div>
            <div className="right">
                <CheckButton
                    onClick={() => toggleCheck(id, done)}
                    done={done ? 1 : 0}
                >
                    <Checkmark />
                </CheckButton>
            </div>
        </Card>
    );
}

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 13px;
    font-size: 20px;
    line-height: 25px;
    background: ${(props) => props.theme.cardBgColor};
    border-radius: 5px;
    margin-bottom: 10px;
    .left {
        width: 100%;
        .title {
            margin-bottom: 7px;
        }
        p:not(.title) {
            font-size: 13px;
            line-height: 16px;
        }
    }
    .right {
        width: 69px;
    }
`;

const CheckButton = styled.button`
    width: 69px;
    height: 69px;
    background: ${(props) =>
        props.done ? props.theme.doneColor : props.theme.notDoneColor};
    border-radius: 5px;
    color: ${(props) => props.theme.cardBgColor};
    border: none;
`;
