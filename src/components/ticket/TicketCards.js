import dayjs from "dayjs";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col } from "reactstrap";

export default function TicketCards({tickets, isBuiable}){
    return(
    tickets.map((ticket, index) => (
        <Col className="d-flex" key={index} >
        <Card className="flex-fill" style={{margin:20, borderRadius: 20}}>
            <CardBody>
                <CardTitle tag="h4">
                    {ticket.flight.departureAirport.city} → {ticket.flight.arrivalAirport.city}
                </CardTitle>
                <CardSubtitle tag="h6">
                    Class: {ticket.flightClass}<br/>    
                </CardSubtitle>
                <CardText style={{marginTop:10}}>
                    <span>Departure date: {dayjs(ticket.flight.departureDate).format("DD/MM/YYYY HH:mm:ss")}<br/>
                    Arrival date: {dayjs(ticket.flight.arrivalDate).format("DD/MM/YYYY HH:mm:ss")}<br/>
                    Cost: {ticket.cost}$</span><br/>
                </CardText>
                {isBuiable && <Button outline color="warning">Buy</Button>}
            </CardBody>
        </Card>
        </Col>
    )))
}