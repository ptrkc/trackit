import UserContext from "./contexts/UserContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ResetCSS from "./ResetCSS";
import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./Themes";
import Header from "./Header/Header";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Today from "./Today/Today";
import Habits from "./Habits/Habits";
import History from "./History/History";
import NavBar from "./NavBar/NavBar";
import { useState } from "react";
import GetDataArrays from "./components/GetDataArrays";

export default function App() {
    const [user, setUser] = useState("");
    const [justStarted, setJustStarted] = useState(true);
    const [percentage, setPercentage] = useState("");
    const [newHabitInfo, setNewHabitInfo] = useState({
        habit: "",
        selectedDays: [],
    });
    const [habits, setHabits] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);
    const [habitHistory, setHabitHistory] = useState([]);

    return (
        <UserContext.Provider
            value={{
                justStarted,
                setJustStarted,
                user,
                setUser,
                percentage,
                setPercentage,
                newHabitInfo,
                setNewHabitInfo,
                habits,
                setHabits,
                todayHabits,
                setTodayHabits,
                habitHistory,
                setHabitHistory,
            }}
        >
            <ThemeProvider theme={defaultTheme}>
                <BrowserRouter>
                    <ResetCSS />
                    <GlobalStyle user={user} />
                    <Header />
                    <GetDataArrays />
                    <Switch>
                        <Route path="/" exact>
                            <SignIn />
                        </Route>
                        <Route path="/cadastro" exact>
                            <SignUp />
                        </Route>
                        <Route path="/hoje" exact>
                            <Today />
                        </Route>
                        <Route path="/habitos" exact>
                            <Habits />
                        </Route>
                        <Route path="/historico" exact>
                            <History />
                        </Route>
                    </Switch>
                    <NavBar />
                </BrowserRouter>
            </ThemeProvider>
        </UserContext.Provider>
    );
}
