import { useState } from "react";
import styled from "styled-components";
export default function DaysSelector(props) {
    const { selectedDays, setSelectedDays } = props.states;
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];

    function toggleDay(i) {
        if (selectedDays.includes(i)) {
            const newArr = selectedDays.filter((d) => d !== i);
            setSelectedDays([...newArr]);
        } else {
            setSelectedDays([...selectedDays, i]);
        }
    }
    if (!!setSelectedDays) {
        return (
            <DaysList>
                {days.map((d, i) => {
                    return (
                        <DaysButton
                            key={i}
                            onClick={() => toggleDay(i)}
                            selected={selectedDays.includes(i)}
                        >
                            {d}
                        </DaysButton>
                    );
                })}
            </DaysList>
        );
    } else {
        return (
            <DaysList>
                {days.map((d, i) => {
                    return (
                        <DaysButton key={i} selected={selectedDays.includes(i)}>
                            {d}
                        </DaysButton>
                    );
                })}
            </DaysList>
        );
    }
}

const DaysList = styled.div`
    display: flex;
`;

const DaysButton = styled.button`
    background-color: ${(props) =>
        props.selected ? props.theme.inputSelectedColor : "transparent"};
    margin-right: 4px;
    margin-bottom: 29px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    line-height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) =>
        props.selected
            ? props.theme.cardBgColor
            : props.theme.inputPlaceholderColor};
    border: 1px solid ${(props) => props.theme.inputBorderColor};
    border-radius: 5px;
`;
