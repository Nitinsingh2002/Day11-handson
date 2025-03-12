import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";



export const AddBatch = () => {
    const [name, setName] = useState();
    const [seats, setSeats] = useState();
    const [startDate, setStartDate] = useState();
    const [cookies] = useCookies(["token"])

    const navigate = useNavigate();

    const AddBatch = async() =>{
        try{
            const result = await axios.post('https://localhost:7153/api/Batch',{
                name,seats,startDate
            },{
                headers:{
                    Authorization:`Bearer ${cookies.token}`
                }
            }
           )
           toast.success("Batch added");
           navigate("/")
        }catch(error){
          toast.error("Failed to add batch")
        }
    }

    useEffect(()=>{
       if(!cookies.token){
        navigate("/login")
       }
    },[cookies.token])

    return (
        <>
        <Toaster/>
            <div className="p-3 mt-5 d-flex justify-content-center align-items-center vh-90">
                <div style={{ width: "25vw" }}  className="border px-3 py-2 shadow p-3 mb-5 bg-white rounded">
                    
                    <div className="form-group d-flex flex-column justify-content-start">
                        <label htmlFor="email" className="m-2 d-flex justify-content-start">Batch name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter batch name"
                            required
                        />
                    </div>

               
                    <div className="form-group">
                        <label htmlFor="startDate" className="m-2 d-flex justify-content-start">Start Date</label>
                        <input
                            className="form-control"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Seats Field */}
                    <div className="form-group">
                        <label htmlFor="seats" className="m-2 d-flex justify-content-start">Seats</label>
                        <input
                            className="form-control"
                            type="number"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            placeholder="Enter seats"
                            required
                        />
                    </div>

                  
                    <button className="btn btn-primary mt-3 w-100 mb-3" onClick={AddBatch}>
                        Add Batch
                    </button>
                </div>
            </div>

        </>
    )
}