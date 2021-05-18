import { BrowserRouter, Switch, Route } from "react-router-dom";
import ResetCSS from "./ResetCSS";
import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./Themes";
import Header from "./Header/Header";
import SingIn from "./SingIn/SingIn";
import SingUp from "./SingUp/SingUp";
import Habits from "./Habits/Habits";
import History from "./History/History";
import NavBar from "./NavBar/NavBar";

export default function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <ResetCSS />
                <GlobalStyle />
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <SingIn />
                    </Route>
                    <Route path="/cadastro">
                        <SingUp />
                    </Route>
                    <Route path="/habitos">
                        <Habits />
                    </Route>
                    <Route path="/historico">
                        <History />
                    </Route>
                </Switch>
                <NavBar />
            </BrowserRouter>
        </ThemeProvider>
    );
}
