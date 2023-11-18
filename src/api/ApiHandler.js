import LoadingPage from "./LoadingPage";

const ApiHandler = ({children, loading, error}) => {
    if (error){
        return "something went wrong";
    }
    return (
        <div>
            {loading ? children : <LoadingPage/>}
        </div>
    )
}


export default ApiHandler;