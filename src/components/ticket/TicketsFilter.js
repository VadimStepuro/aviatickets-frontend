import { Button, ButtonGroup } from "reactstrap";

export default function TicketsFilter({dispatch}){

    const classFilterClick = (flightClass) => {
        dispatch({
            type:'FILTER_BY_CLASS',
            flightClass: flightClass
        })
        console.log("Change class to " + flightClass)
    };

    const disableFilterClick = () => {
        dispatch({
            type: 'DISABLE_FILTER'
        })
        console.log("disabled filter")
    }

    const sortCheap = () => {
        dispatch({
            type:'SORT_CHEAP'
        })
    }

    const sortExpensive = () => {
        dispatch({
            type:'SORT_EXPENSIVE'
        })
        console.log("sorted expensive")

    }

    const sortNew = () => {
        dispatch({
            type:'SORT_NEW'
        })
    }

    const sortOld = () => {
        dispatch({
            type:'SORT_OLD'
        })
    }

    return(
    <div className="position-relative">
    
    <h5>Filters</h5>
    <ButtonGroup vertical >
        <Button color="success" style={{marginTop:20}} outline onClick={disableFilterClick} >
                Any
        </Button>
        <Button color="success" outline onClick={(e) => {classFilterClick("BUSINESS")}}>
            Business class
        </Button>
        <Button color="success" outline onClick={(e) => {classFilterClick("ECONOMY")}}>
            Economy class
        </Button>
    </ButtonGroup>
    <h5 style={{marginTop:20}}>Sorting</h5>
    <ButtonGroup vertical style={{marginTop:20}}>
        <Button color="success" outline onClick={sortCheap} >
            Cheapest
        </Button>
        <Button color="success" outline onClick={sortExpensive} >
            Expensive
        </Button>
        <Button color="success" outline onClick={sortNew} >
            The newest
        </Button>
        <Button color="success" outline onClick={sortOld} >
            The oldest
        </Button>
    </ButtonGroup>
    </div>
    )
}