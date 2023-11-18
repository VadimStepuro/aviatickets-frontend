import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import Header from "../home/Header";
import Footer from "../home/Footer";
import {LoginDispatch } from "../contexts/UserContext";
import { getUserByLogin, loginUser } from "../../api/apiCalls";



const Login = ({error}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const loginDispatcher = useContext(LoginDispatch);



    let history = useNavigate()

    const HandleLogIn = () =>{
        loginUser({login, password}).then(() => {
            getUserByLogin(login).then((result) => {
                loginDispatcher({
                    type:'CHANGE_USER',
                    item: result
                })
            })
        })
    

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let user = {login: login};
        HandleLogIn();
        loginDispatcher({
            type:'CHANGE_LOGIN', 
            item:user})
        history("/")
    }

    return(
        <div>
        <Header/>
        <Container style={{width:300}}>
            <h3 className="mt-5">Log In</h3>
            <Form className="mb-5">
                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text" name="login" id="login" placeholder="Type login" onChange={(e) => {setLogin(e.target.value)}}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Type password" onChange={(e) => {setPassword(e.target.value)}}/>
                </FormGroup>
                
                <Link to={"/"}>
                    <Button color="success" onClick={(e) => handleSubmit(e)}>Log in</Button>
                </Link>

            </Form>
        </Container>
        <Footer/>
        </div>
    )
}

export default Login;