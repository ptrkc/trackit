import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Loader from "react-loader-spinner";
import { ReactComponent as Checkmark } from "./../assets/check.svg";

export default function TodayHabitCard({ habit, getTodayHabits }) {
    const { currentSequence, done, highestSequence, id, name } = habit;
    const isMax = highestSequence > 0 && currentSequence === highestSequence;
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(false);
    }, [habit.done]);

    function toggleCheck(id, isChecked) {
        if (isLoading) {
            console.log("bye");
            return;
        }
        setIsLoading(true);
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
        toggleCheckRequest.catch(() => {
            alert("Algo deu errado, tente novamente.");
        });
    }
    return (
        <Card onClick={() => toggleCheck(id, done)}>
            <div className="left">
                <p className="title"> {name}</p>
                <p>
                    Sequência atual:{" "}
                    <CurrSeq done={done}>
                        {currentSequence} dia
                        {currentSequence > 1 ? "s" : ""}
                    </CurrSeq>
                </p>
                <p>
                    Sequencia maxima:{" "}
                    <MaxSeq isMax={isMax}>
                        {highestSequence} dia
                        {highestSequence > 1 ? "s" : ""}
                    </MaxSeq>
                </p>
            </div>
            <div className="right">
                <CheckButton isLoading={isLoading} done={done}>
                    {isLoading ? (
                        <Loader
                            type="ThreeDots"
                            color="#FFFFFF"
                            width={43}
                            height={11}
                        />
                    ) : (
                        <Checkmark />
                    )}
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
        props.isLoading
            ? props.theme.lightAccentColor
            : props.done
            ? props.theme.doneColor
            : props.theme.notDoneColor};
    border-radius: 5px;
    color: ${(props) => props.theme.cardBgColor};
    border: none;
`;
const CurrSeq = styled.span`
    color: ${(props) => (props.done ? props.theme.doneColor : "inherit")};
`;
const MaxSeq = styled.span`
    color: ${(props) => (props.isMax ? props.theme.doneColor : "inherit")};
`;
