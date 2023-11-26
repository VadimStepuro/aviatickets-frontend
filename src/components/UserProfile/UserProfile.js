import { useContext } from "react";
import { LoginContext } from "../contexts/UserContext";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { Card, CardHeader, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import TicketCards from "../ticket/TicketCards";
import TicketsFilter from "../ticket/TicketsFilter";
import { UserFilteredTicketsContext, UserTicketDispatcher } from "../contexts/UserTicketsContext";

const UserProfile = () => {
    const User = useContext(LoginContext)

    const tickets = useContext(UserFilteredTicketsContext)
    const userTicketDispatcher = useContext(UserTicketDispatcher)


    const convertToTicket = (userTickets) => {
        let arr = userTickets.map(userTicket => userTicket.ticket)
        console.log(arr);
        return arr
    }

    return(
        <div>
            <Header/>
            <Container style={{marginTop:40}}>
                <Row>
                    <Col>
                        <Card style={{ marginTop:20}}>
                            <CardHeader >
                            User profile
                            </CardHeader>
                            <ListGroup>
                                <ListGroupItem>
                                User: {User.user.name}
                                </ListGroupItem>
                                <ListGroupItem>
                                Login: {User.user.login}
                                </ListGroupItem>
                                <ListGroupItem>
                                Birthdate: {User.user.birthdate}
                                </ListGroupItem>
                                <ListGroupItem>
                                E-mail: {User.user.email}
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                
                <Row style={{marginTop:50}}>
                <h3>Purchased tickets</h3>
                { tickets !== undefined &&
                    <Row>
                        <Col xs="2" style={{marginTop:20}}>
                            <TicketsFilter dispatch={userTicketDispatcher}/>
                        </Col>
                        <Col xs="10">
                            <Row lg={3} style={{marginTop:50}}>
                                <TicketCards tickets={convertToTicket(tickets)} isBuiable={false}/>
                            </Row>
                        </Col>
                    </Row>
                }
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default UserProfile;