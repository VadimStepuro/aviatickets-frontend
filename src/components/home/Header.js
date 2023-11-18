import React, { useContext } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button, ButtonGroup, Container} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/UserContext';
import Logout from '../authorisation/Logout';

const brandButtonStyle = {
    color: 'transparent', backgroundColor: 'transparent', border: 'none'
}

const Header = () => {
  const history = useNavigate()
  const handleRegister = () => {
    history("/register")
  }
  const handleLogIn = (e) => {
    history("/login");
  }
  const handleHome = (e) => {
    history("/");
  }
  const handleProfile = (e) => {
    history("/profile")
  }

  const loginContext = useContext(LoginContext);


  return (
    <Container className='border-bottom'>
        <Navbar color="white" light expand="md" >
        <button style={brandButtonStyle} onClick={handleHome}>
            <NavbarBrand>Aviatickets</NavbarBrand>
        </button>
            <Nav className="ml-auto" navbar>
                <NavItem>
                
                {loginContext.login===undefined?
                <ButtonGroup>
                    <Button outline color='success' style={{marginRight: 5}} onClick={handleLogIn}>Log In</Button>
                    
                    <Button outline color='warning' onClick={handleRegister}>Register</Button>
                </ButtonGroup>
                :
                <ButtonGroup>
                  <Button outline style={{marginRight: 5}} onClick={handleProfile}>Profile</Button>
                  &nbsp;
                  <Logout/> 
                </ButtonGroup>
                }
                </NavItem>
            </Nav>
        </Navbar>
    </Container>
  );
}
export default Header;