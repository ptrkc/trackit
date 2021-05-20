import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";

export default function UserLogedIn() {
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        if (!!localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            history.push("/");
        }
    }, []);
}
