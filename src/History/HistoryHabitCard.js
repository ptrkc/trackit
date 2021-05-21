import styled from "styled-components";

export default function HistoryHabitCard({ habit }) {
    return (
        <Card>
            <span>{habit.name}</span>
            <span>{habit.done ? "ok" : "nope"}</span>
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
