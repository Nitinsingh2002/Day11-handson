import { useEffect, useState } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const result = await axios.post('https://localhost:7153/api/Authentication', { Email: email, Password: password })
            setToken(result.data.token);
            console.log(result.data)
            toast.success("login suceessful")
            setCookie("token", result.data.token, { path: "/", maxAge: 3600, secure: true, sameSite: "strict" });
            setEmail("");
            setPassword("");
            navigate("/")

        } catch (error) {
            toast.error("login failed")

        }
    }


    return (

        <>
        <Toaster position="top-right"/>
            <div className="p-3 mt-5 d-flex justify-content-center align-items-center  "  style={{height:"90vh"}}>
            <form style={{ width: "25vw" }}  className="border px-3 py-2 shadow p-3 mb-5 bg-white rounded"  onSubmit={handleLogin}>
                <h2 style={{display:'flex',alignContent:'center',justifyContent:'center'}}>Login</h2>

                <div class="form-group" className="d-flex  flex-column justify-content-start">
                    <div>
                        <label htmlFor="password" className="m-2  d-flex justify-content-start"> Email</label>
                    </div>
                    <input
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>


                <div class="form-group">
                    <div>
                        <label htmlFor="password" className="m-2 d-flex justify-content-start" > Password</label>
                    </div>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button type="submit"
                    className="btn btn-primary mt-2 w-100 mb-2">
                    Login
                </button>
            </form>

            </div>
        </>
    )
}