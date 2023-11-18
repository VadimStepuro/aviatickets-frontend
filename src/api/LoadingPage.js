import { Spinner } from "reactstrap";

const LoadingPage = () => {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height:700}}>
        <Spinner color="primary" />
      </div>
    );
  };
  
  export default LoadingPage;