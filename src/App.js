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

export default function App() {
    const [user, setUser] = useState();
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeProvider theme={defaultTheme}>
                <BrowserRouter>
                    <ResetCSS />
                    <GlobalStyle />
                    <Header />
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
