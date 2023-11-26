import { Col, Container, Row } from "reactstrap"
import { FilteredTicketContext, FindedTicketDispatch } from "../contexts/FindedTickerContext"
import Footer from "../home/Footer"
import Header from "../home/Header"
import { useContext } from "react"
import TicketsFilter from "../ticket/TicketsFilter"
import LoadingPage from "../../api/LoadingPage"
import TicketCards from "../ticket/TicketCards"

export const FindedTicket = ()=>{

    const filteredTickets = useContext(FilteredTicketContext)

    const findedTicketDispatcher = useContext(FindedTicketDispatch);
    return(
        <div>
            
                <Header/>
                <Container>
                <h3 style={{marginTop:50}}>Available tickets</h3>
                <Row>
                    <Col xs="2" style={{marginTop:20}}>
                        <TicketsFilter dispatch={findedTicketDispatcher}/>
                    </Col>
                
                    <Col xs="10">
                        <Row lg={3} style={{marginTop:50}}>
                        {filteredTickets !== undefined ?
                            <TicketCards tickets={filteredTickets} isBuiable={true}/>:
                            <LoadingPage/>
                            }
                        </Row>
                    </Col>
                </Row>
                </Container>
                <Footer/>
            
        </div>
    )
}