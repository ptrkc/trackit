import styled from "styled-components";
import { ReactComponent as Checkmark } from "./../assets/check.svg";

export default function HistoryHabitCard({ habit }) {
    return (
        <Card>
            <div className="left">{habit.name}</div>
            <div className="right">
                <CheckmarkContainer done={habit.done}>
                    <Checkmark />
                </CheckmarkContainer>
            </div>
        </Card>
    );
}

const Card = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    font-size: 20px;
    line-height: 25px;
    background: ${(props) => props.theme.cardBgColor};
    border-radius: 5px;
    margin-bottom: 10px;
    .left {
        width: 100%;
        display: flex;
        align-items: center;
    }
    .right {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
`;
const CheckmarkContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${(props) =>
        props.done ? props.theme.doneColor : props.theme.notDoneColor};
    border-radius: 5px;
    color: ${(props) => props.theme.cardBgColor};
    border: none;
    svg {
        width: 25px;
    }
`;
