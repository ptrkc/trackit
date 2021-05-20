import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Input from "./../components/Input";
export default function NewHabitCard() {
    const [disabled, setDisabled] = useState(false);
    const [habit, setHabit] = useState("");

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
                <button>D</button>
                <button>S</button>
                <button>T</button>
                <button>Q</button>
                <button>Q</button>
                <button>S</button>
                <button>S</button>
            </div>
            <div className="buttons">
                <button className="cancel">Cancelar</button>
                <button>Salvar</button>
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
    .days-list {
        display: flex;
        flex-direction: row;
        button {
            background-color: ${(props) =>
                props.selected
                    ? props.theme.inputSelectedColor
                    : "transparent"};
            margin-right: 4px;
            margin-bottom: 29px;
            width: 30px;
            height: 30px;
            font-size: 20px;
            line-height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${(props) => props.theme.inputPlaceholderColor};
            border: 1px solid ${(props) => props.theme.inputBorderColor};
            border-radius: 5px;
        }
    }

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

    .my-habits {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 23px;
        color: ${(props) => props.theme.darkAccentColor};
    }

    .no-habits {
        margin-top: 28px;
    }

    /* div {
        width: 91px;
        margin-bottom: 25px;
        span {
            color: ${(props) => props.theme.cardBgColor};
        }
        .CircularProgressbar-path {
            stroke: ${(props) => props.theme.cardBgColor};
        }
        .CircularProgressbar-trail {
            stroke: transparent;
        }
        .CircularProgressbar-background {
            fill: ${(props) => props.theme.lightAccentColor};
        }
    } */
`;
