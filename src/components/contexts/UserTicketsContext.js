import { createContext, useReducer } from "react";
import dayjs from "dayjs";

export const UserTicketContext = createContext();

export const UserTicketDispatcher = createContext();

export const UserFilteredTicketsContext = createContext();

export default function UserTicketContextProvider({children, initialTickets}){
    const [state, dispatch] = useReducer(UserTicketsReducer, {
        tickets: initialTickets,
        filteredTickets: initialTickets
    })

    return(
        <div>
            <UserTicketContext.Provider value={state.tickets}>
                <UserFilteredTicketsContext.Provider value={state.filteredTickets}>
                    <UserTicketDispatcher.Provider value={dispatch}>
                        {children}
                    </UserTicketDispatcher.Provider>
                </UserFilteredTicketsContext.Provider>
            </UserTicketContext.Provider>
        </div>
    )
}

function UserTicketsReducer(state, action){
    switch(action.type){
        
        case 'ADD_TICKET':{
            return {...state, tickets: [...state.tickets, action.item], filteredTickets: [...state.filteredTickets, action.item]};
        }
        case 'CHANGE_TICKETS':{
            return{...state, tickets: action.tickets, filteredTickets: action.tickets}
        }
        case 'EDIT_TICKET':{
            return { ...state, 
                tickets:state.tickets.map((ticket) =>{
                if(ticket.id === action.item.id){
                    ticket = action.item;
                    return {...ticket, tickets: action.item};
                }
                return ticket;
            }),
            filteredTickets:state.filteredTickets.map((ticket) =>{
                if(ticket.id === action.item.id){
                    ticket = action.item;
                    return {...ticket, filteredTickets: action.item};
                }
                return ticket;
            })}
        }
        case 'DELETE_TICKET':{
            return {
                ...state,
                tickets: state.tickets.filter((ticket) => ticket.id !== action.id),
                filteredTickets: state.filteredTickets.filter((ticket) => ticket.id !== action.id) 
            }
        }
        case 'FILTER_BY_CLASS':{
            return{
                ...state,
                filteredTickets: state.tickets.filter((ticket) => ticket.ticket.flightClass === action.flightClass)
            }
        }
        case 'DISABLE_FILTER':{
            return{
                ...state,
                filteredTickets: state.tickets
            }
        }
        case 'SORT_CHEAP':{
            return{
                ...state,
                filteredTickets: state.filteredTickets.toSorted((a, b) => a.ticket.cost - b.ticket.cost)
            }
        }
        case 'SORT_EXPENSIVE':{
            return{
                ...state,
                filteredTickets: state.filteredTickets.toSorted((a, b) => b.ticket.cost - a.ticket.cost)
            }
        }
        case 'SORT_NEW':{
            return{
                ...state,
                filteredTickets: state.filteredTickets.toSorted((a, b) => {
                    let bool = dayjs(a.ticket.flight.departureDate)
                    .isAfter(dayjs(b.ticket.flight.departureDate)) 
                    if(bool){
                        return -1;
                    }
                    else{
                        return 1;
                    }
                })
            }
        }
        case 'SORT_OLD':{
            return{
                ...state,
                filteredTickets: state.filteredTickets.toSorted((a, b) => {
                    let bool = dayjs(a.ticket.flight.departureDate)
                    .isAfter(dayjs(b.ticket.flight.departureDate)) 
                    if(bool){
                        return 1;
                    }
                    else{
                        return -1;
                    }
                })
            }
        }
        default:{
            throw new Error("Unknown action")
        }
    }
}
