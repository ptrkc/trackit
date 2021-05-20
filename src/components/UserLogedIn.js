import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";

export default function UserLogedIn() {
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        if (!!localStorage.getItem("user")) {
            console.log("existe");
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            console.log("não existe");
            history.push("/");
        }
    }, []);
}
