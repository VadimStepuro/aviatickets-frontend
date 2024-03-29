import dayjs from "dayjs";
import { createContext, useReducer } from "react";

export const FindedTicketContext = createContext();

export const FindedTicketDispatch = createContext();

export const FilteredTicketContext = createContext();

export default function FindedTicketContextProvider({children, initialTickets}){
    const [state, dispatch] = useReducer(FindedTicketReducer, {
        tickets: initialTickets,
        filteredTickets: initialTickets
    })

    return(
        <div>
            <FindedTicketContext.Provider value={state.tickets}>
                <FilteredTicketContext.Provider value={state.filteredTickets}>
                    <FindedTicketDispatch.Provider value={dispatch}>
                        {children}
                    </FindedTicketDispatch.Provider>
                </FilteredTicketContext.Provider>
            </FindedTicketContext.Provider>
        </div>
    )
}

function FindedTicketReducer(state, action){
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
                filteredTickets: state.tickets.filter((ticket) => ticket.flightClass === action.flightClass)
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
                filteredTickets: state.filteredTickets.toSorted((a, b) => a.cost - b.cost)
            }
        }
        case 'SORT_EXPENSIVE':{
            return{
                ...state,
                filteredTickets: state.filteredTickets.toSorted((a, b) => b.cost - a.cost)
            }
        }
        case 'SORT_NEW':{
            return{
                ...state,
                filteredTickets: state.filteredTickets.toSorted((a, b) => {
                    let bool = dayjs(a.flight.departureDate)
                    .isAfter(dayjs(b.flight.departureDate)) 
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
                    let bool = dayjs(a.flight.departureDate)
                    .isAfter(dayjs(b.flight.departureDate)) 
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