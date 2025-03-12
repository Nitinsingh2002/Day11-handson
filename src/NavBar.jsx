
import { Link } from "react-router-dom"
export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light w-100  d-flex justify-content-between">
                <Link to={"/"} className="navbar-brand ps-5" >Batch Mangement</Link>

                <div className="collapse navbar-collapse justify-content-end  pe-5"  id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to={"/"} className="nav-item nav-link active">Home <span className="sr-only"></span></Link>
                        <Link className="nav-item nav-link" to={"/add"} >Add Batch</Link>

                    </div>
                </div>
            </nav>
        </>
    )
}