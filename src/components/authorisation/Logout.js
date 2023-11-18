import { useContext} from "react";
import { Button } from "reactstrap";
import { logout } from "../../api/apiCalls";
import { LoginDispatch } from "../contexts/UserContext";

export default function Logout(){

    const dispatch = useContext(LoginDispatch)

     const handleButtonClik = () => {
        logout()
    }
    return(
        <Button outline color="danger" onClick={() =>{handleButtonClik(); dispatch({type:'REMOVE_LOGIN'}); dispatch({type:'REMOVE_USER'})}}>Log Out</Button>
    )
}