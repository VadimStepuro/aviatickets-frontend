import { createContext, useReducer } from "react";

export const FindedTicketContext = createContext();

export const FindedTicketDispatch = createContext();

export default function FindedTicketContextProvider({children, initialTickets}){
    const [state, dispatch] = useReducer(FindedTicketReducer, {
        tickets: initialTickets
    })

    return(
        <div>
            <FindedTicketContext.Provider value={state.tickets}>
                <FindedTicketDispatch.Provider value={dispatch}>
                    {children}
                </FindedTicketDispatch.Provider>
            </FindedTicketContext.Provider>
        </div>
    )
}

function FindedTicketReducer(state, action){
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