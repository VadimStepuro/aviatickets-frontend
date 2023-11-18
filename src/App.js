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

function App() {

  const [loadingTickets, tickets, errorTickets] = useApiCall(getAllTickets)

  return (
    <ApiHandler loading={loadingTickets} error={errorTickets}>
    <LoginContextProvider >
      <TicketRequestProvider>
        <TicketContextProvider initialTickets={tickets}>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home/>}/>
              
              <Route path='/login' element={<Login/>}/>

              <Route path='/finded_tickets' element={<FindedTicket/>}/>

              <Route path='/profile' element={<UserProfile/>}/>
            </Routes>
          </div>
        </TicketContextProvider>
      </TicketRequestProvider>
      </LoginContextProvider>
    </ApiHandler>
  );
}

export default App;
