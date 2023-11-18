
export const loginUser = async (user) => 
{
    try{
        await fetch ("http://localhost:8080/api/v1/auth/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body:JSON.stringify(user)
        })
        
    }
      catch(err){
        console.log(err);
      }
}

export const register = async (user) => 
{
    try{
        const response = await fetch ("http://localhost:8080/api/v1/auth/register",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body:JSON.stringify(user)
        })
        return await response.json();
    }
      catch(err){
        console.log(err);
      }
}

export const refresh = async () => 
{
    try{
        const response = await fetch ("http://localhost:8080/api/v1/auth/token",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        return response.json();
      }
      catch(err){
        console.log(err);
      }
}

export const logout = async () => 
{
    try{
        await fetch ("http://localhost:8080/api/v1/auth/logout",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
      }
      catch(err){
        console.log(err);
      }
}

export const getUserByLogin = async (login) =>{
  try{
    const response = await fetch ("http://localhost:8080/api/v1/users/login/" + login,
    {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    })
     
    return await response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const  getAllTickets = async () => 
{
    try{
        const response = await fetch ("http://localhost:8080/api/v1/tickets",
        {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "omit"
        })
        return await response.json();
      }
      catch(err){
        console.log(err);
      }
}

export const getTicketsByCitiesAndDate = async (findTicketRequest) => {
  try{
    const response = await fetch ("http://localhost:8080/api/v1/tickets/by_cities_and_date",
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "omit",
        body: JSON.stringify(findTicketRequest)
    })
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getTopCities = async () => {
  try{
    const response = await fetch ("http://localhost:8080/api/v1/flights/top_cities",
    {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "omit",
    })
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}

export const getUsersTickets = async (login) => {
  try{
    const response = await fetch ("http://localhost:8080/api/v1/purchased_tickets/by_login/" + login,
    {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    })
    return response.json();
  }
  catch(err){
    console.log(err);
  }
}