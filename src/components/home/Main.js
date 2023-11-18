import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { TicketRequestDispatcher } from "../contexts/TicketRequest";
import { useApiCall } from "../../api/FetchData";
import { getTopCities } from "../../api/apiCalls";
import ApiHandler from "../../api/ApiHandler";

const Main = () => {

    const requstContextDispatcher = useContext(TicketRequestDispatcher);

    const [departureCity, setDepartureCity] = useState();
    const [arrivalCity, setArrivalCity] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [isValiddepartureCity, setIsValidDepartureCity] = useState('');
    const [isValidarrivalCity, setIsValidArrivalCity] = useState('');

    const history = useNavigate();

    const [loadingCities, cities, errorCities] = useApiCall(getTopCities)


    const validateStartCity = (e) => {
        if(!e.target.value){
            setIsValidDepartureCity('bad')
        }
        else{
            setIsValidDepartureCity('good')
        }

    }

    const validateEndCity = (e) => {
        if(!e.target.value){
            setIsValidArrivalCity('bad')
        }
        else{
            setIsValidArrivalCity('good')
        }

    }

    const onButtonClick = (e) =>{
        e.preventDefault();
        const request = {
            departureCity: departureCity,
            arrivalCity: arrivalCity,
            startDate: startDate,
            endDate: endDate
        }

        requstContextDispatcher({
            type: 'change_request', 
            item: request})

    
        history('/finded_tickets')
    
    }


    return (
        <Container style={{width: 800, marginBottom: 50}}>
            <h1 style={{marginTop:50}}>Search for cheap flights</h1>
            <Form style={{marginTop: 50, width:800}}>
                <Row style={{marginTop: 50}}>
                    <Col>
                        <Label
                            for="departureAirport"
                        >
                            Departure airport
                        </Label>
                        <Input
                            id="departureAirport"
                            name="departureCity"
                            placeholder="some city"
                            type="text"
                            valid={isValiddepartureCity==='good'}
                            invalid={isValiddepartureCity==='bad'}
                            onChange={(e) => {setDepartureCity(e.target.value); validateStartCity(e);}}
                        />
                    </Col>
                    <Col>
                    <Label
                        for="arrivalAirport"
                    >
                        Arrival airport
                    </Label>
                    <Input
                        id="arrivalAirport"
                        name="arrivalCity"
                        placeholder="another city"
                        type="text"
                        valid={isValidarrivalCity==='good'}
                        invalid={isValidarrivalCity==='bad'}
                        onChange={(e) => {setArrivalCity(e.target.value); validateEndCity(e)}}
                    />
                    </Col>
                </Row>
                <Row style={{marginTop: 50}}>
                    <Col>
                    <Label
                        for="startDate"
                    >
                        Start date
                    </Label>
                    <Input
                        id="startDate"
                        name="start"
                        placeholder="from"
                        type="date"
                        onChange={(e) => {setStartDate(e.target.value)}}
                    />
                    </Col>
                    <Col>
                    <Label
                        for="endDate"
                    >
                        End date
                    </Label>
                    <Input
                        id="endDate"
                        name="end"
                        placeholder="to"
                        type="date"
                        onChange={(e) => {setEndDate(e.target.value)}}
                    />
                    </Col>
                </Row>
                <Row style={{marginTop:50}}>
                    <Col>
                    <Button onClick={(e) =>  onButtonClick(e)} color="primary">
                        Search
                    </Button>
                    </Col>
                </Row>
                </Form>
                <h2 style={{marginTop:50}}>Popular cities</h2>
                <ApiHandler loading={loadingCities} error={errorCities}>
                    <Row lg={3} style={{marginTop:50}}>
                        {cities.map((city, index) => (
                            <Col className="d-flex" key={index}>
                                <Card className="flex-fill" style={{margin:20}}>
                                    <CardBody>
                                        <CardTitle tag="h3">{city.city}</CardTitle>
                                        <CardSubtitle tag="h4">{city.count}</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </ApiHandler>
        </Container>
    )
}
export default Main;