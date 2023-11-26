import './App.css';
import { useApiCall } from './api/FetchData';
import { getAllTickets } from './api/apiCalls';
import ApiHandler from './api/ApiHandler';
import TicketContextProvider from './components/contexts/TicketsContext';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import Login from './components/authorisation/Login';
import LoginContextProvider from './components/contexts/UserContext';
import { FindedTicket } from './components/findedTickets/FindedTicket';
import TicketRequestProvider from './components/contexts/TicketRequest';
import UserProfile from './components/UserProfile/UserProfile';
import FindedTicketContextProvider from './components/contexts/FindedTickerContext';
import UserTicketContextProvider from './components/contexts/UserTicketsContext';

function App() {

  const [loadingTickets, tickets, errorTickets] = useApiCall(getAllTickets)

  return (
    <ApiHandler loading={loadingTickets} error={errorTickets}>
    <LoginContextProvider >
      <TicketRequestProvider>
        <TicketContextProvider initialTickets={tickets}>
        <FindedTicketContextProvider initialTickets={undefined}>
        <UserTicketContextProvider initialTickets={undefined}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home/>}/>
              
              <Route path='/login' element={<Login/>}/>

              <Route path='/finded_tickets' element={<FindedTicket/>}/>

              <Route path='/profile' element={<UserProfile/>}/>
            </Routes>
          </div>
          </UserTicketContextProvider>
          </FindedTicketContextProvider>
        </TicketContextProvider>
      </TicketRequestProvider>
      </LoginContextProvider>
    </ApiHandler>
  );
}

export default App;
