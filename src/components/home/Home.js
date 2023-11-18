import { Container } from "reactstrap"
import Header from "./Header"
import Footer from "./Footer"
import Main from "./Main"

export const Home = () => {
    return (
        <div className="home">
            <Header/>
            <Container style={{paddingTop:20, paddingBottom:20}}>
                <Main/>
            </Container>
            <Footer />
        </div>)
}