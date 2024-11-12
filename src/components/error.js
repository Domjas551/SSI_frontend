import {Link, useLocation, useRouteError} from "react-router-dom";

export default function ErrorPage(){
    const error=useRouteError();
    console.log(error);
    const custError=useLocation().state.error;

    return(
        <div id="error-page">
            <p>Sorry, an unexpected error has occured.</p>
            {custError?
                <p>{custError}</p>
            : null}
            {error? <p>
                 <i>{error.statusText || error.message}</i>
            </p> : null}
            <Link to={"/"}>Powrót</Link>
        </div>
    );
}