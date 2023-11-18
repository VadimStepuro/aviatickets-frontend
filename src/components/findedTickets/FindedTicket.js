import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from "reactstrap"
import ApiHandler from "../../api/ApiHandler"
import { useApiCallWithArgs } from "../../api/FetchData"
import { getTicketsByCitiesAndDate } from "../../api/apiCalls"
import FindedTicketContextProvider from "../contexts/FindedTickerContext"
import Footer from "../home/Footer"
import Header from "../home/Header"
import { useContext } from "react"
import { TicketRequestContext } from "../contexts/TicketRequest"
import dayjs from "dayjs"

export const FindedTicket = ()=>{

    const requestContext = useContext(TicketRequestContext);

    console.log(requestContext);


    const [loadingTickets, tickets, errorTickets] = useApiCallWithArgs(getTicketsByCitiesAndDate, requestContext)


    return(
        <ApiHandler loading={loadingTickets} errorTickets={errorTickets}>
            <FindedTicketContextProvider initialTickets={tickets}>
                <Header/>
                <Container>
                <h3 style={{marginTop:50}}>Available tickets</h3>
                <Row lg={3} style={{marginTop:50}}>
                    {tickets.map((ticket, index) => (
                        <Col className="d-flex" key={index} >
                        <Card className="flex-fill rounded-pill" style={{margin:20}}>
                            <CardBody>
                                <CardTitle tag="h4">
                                    {ticket.flight.departureAirport.city}
                                </CardTitle>
                                <CardSubtitle tag="h5">
                                    {ticket.flight.arrivalAirport.city}
                                </CardSubtitle>
                                <CardText style={{marginTop:10}}>
                                    <p>Departure date: {dayjs(ticket.flight.departureDate).format("DD/MM/YYYY HH:mm:ss")}</p>
                                    <p>Arrival date: {dayjs(ticket.flight.arrivalDate).format("DD/MM/YYYY HH:mm:ss")}</p>
                                    <p>Class: {ticket.flightClass}</p>
                                    <p>Cost: {ticket.cost}$</p>
                                </CardText>
                                <Button outline color="warning">Buy</Button>
                            </CardBody>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                </Container>
                <Footer/>
            </FindedTicketContextProvider>
        </ApiHandler>
    )
}