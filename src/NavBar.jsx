
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom"

export const Navbar = ({ decodedDetails }) => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const handleLogout = () => {
        removeCookie("token", { path: "/" });
    }
    const role = decodedDetails
        ? decodedDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        : null;
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100  d-flex justify-content-between">
                <Link to={"/"} className="navbar-brand ps-5" >Batch Mangement</Link>

                <div className="collapse navbar-collapse justify-content-end  pe-5" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to={"/"} className="nav-item nav-link active">Home <span className="sr-only"></span></Link>
                        {role === "Admin" && (
                            <Link className="nav-item nav-link" to={"/add"}>
                                Add Batch
                            </Link>
                        )}
                        <button className="nav-item nav-link" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}