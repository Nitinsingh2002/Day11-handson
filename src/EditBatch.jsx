import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { toast, Toaster } from "sonner";



export const EditBatch = () => {
    const [batch, setBatches] = useState();
    const { id } = useParams();
    const [cookies] = useCookies(["token"]);
    const naviagte = useNavigate();
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState();
    const [seats, setSeats] = useState();
    const [startDate, setStartDate] = useState();

    const navigate = useNavigate();


    async function LoadBatch() {
        setLoading(true)
        try {
            const result = await axios.get(`https://localhost:7153/api/Batch/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            });
            setBatches(result.data);
            setName(result.data.name);
            setSeats(result.data.seats);
            setStartDate(result.data.startDate.split("T")[0]);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching batches:", error);
            setLoading(false)
        }
    }

    const editBatch = async () => {
        try {
            const result = await axios.put(`https://localhost:7153/api/Batch/${id}`,
                {name,seats,startDate},
                {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            });

            toast.success("Batch updated sucessfully")
            navigate("/")
        } catch (error) {
            console.log("Error fetching batches:", error);
            toast.error("Failed to update batch")
        }
    }


    useEffect(() => {
        if (!cookies.token) {
            naviagte("/login");
        }
        LoadBatch()
    }, [id])
    return (
        <>
           <Toaster position="top-right"/>
            {
                loading ?
                    <div style={{height:'90vh',width:'100vw',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <BounceLoader color="#19ced3" />
                    </div> :


                    <div className="p-3 mt-5 d-flex justify-content-center align-items-center vh-90">
                        <div style={{ width: "25vw" }} className="border px-3 py-2 shadow p-3 mb-5 bg-white rounded">

                            <div className="form-group d-flex flex-column justify-content-start">
                                <label htmlFor="name" className="m-2 d-flex justify-content-start">Batch Name</label>
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


                            <button className="btn btn-primary mt-3 w-100 mb-3"  onClick={editBatch}>
                                Edit Batch
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}