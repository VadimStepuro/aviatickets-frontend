import { useContext } from "react";
import { LoginContext } from "../contexts/UserContext";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { useApiCallWithArgs } from "../../api/FetchData";
import { getUsersTickets } from "../../api/apiCalls";
import ApiHandler from "../../api/ApiHandler";
import dayjs from "dayjs";

const UserProfile = () => {
    const User = useContext(LoginContext)

    const [userTicketsStatus, userTickets, userTicketsErrors] = useApiCallWithArgs(getUsersTickets, User.user.login)

    console.log(User);

    return(
        <div>
            <Header/>
            <Container>
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
                <ApiHandler loading={userTicketsStatus} error={userTicketsErrors}>
                    <Row lg={4} style={{marginTop:50}}>
                        {userTickets.map((ticket, index) => (
                            <Col className="d-flex" key={index}>
                                <Card className="flex-fill" style={{margin:20}}>
                                    <CardBody>
                                        <CardHeader >
                                            {ticket.ticket.flight.departureAirport.city + ' ===> ' + ticket.ticket.flight.arrivalAirport.city}
                                        </CardHeader>
                                        <ListGroup>
                                            <ListGroupItem>
                                                Departure date: {dayjs(ticket.ticket.flight.departureDate).format("DD/MM/YYYY HH:mm:ss")}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Arrival date: {dayjs(ticket.ticket.flight.arrivalDate).format("DD/MM/YYYY HH:mm:ss")}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Flight class: {ticket.ticket.flightClass}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Flight cost: {ticket.ticket.cost}
                                            </ListGroupItem>
                                        </ListGroup>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </ApiHandler>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default UserProfile;