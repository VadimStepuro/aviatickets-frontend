import { createContext, useReducer } from "react";

export const TicketContext = createContext();

export const TicketDispatch = createContext();

export default function TicketContextProvider({children, initialTickets}){
    const [state, dispatch] = useReducer(TicketReducer, {
        tickets: initialTickets
    })

    return(
        <div>
            <TicketContext.Provider value={state.tickets}>
                <TicketDispatch.Provider value={dispatch}>
                    {children}
                </TicketDispatch.Provider>
            </TicketContext.Provider>
        </div>
    )
}

function TicketReducer(state, action){
    switch(action.type){
        case 'ADD_TICKET':{
            return {...state, tickets: [...state.tickets, action.item]};
        }
        case 'EDIT_TICKET':{
            return { ...state, tickets:state.tickets.map((ticket) =>{
                if(ticket.id === action.item.id){
                    ticket = action.item;
                    return {...ticket, tickets: action.item};
                }
                return ticket;
            })}
        }
        case 'DELETE_TICKET':{
            return {
                ...state,
                tickets: state.tickets.filter((ticket) => ticket.id !== action.id) 
            }
        }
        default:{
            throw new Error("Unknown action")
        }
    }
}