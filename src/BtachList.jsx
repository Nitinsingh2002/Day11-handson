import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from 'react-spinners'
import { toast, Toaster } from "sonner";
export const BatchList = () => {
    const [batches, setBatches] = useState([]);
    const [cookies] = useCookies(["token"]);
    const naviagte = useNavigate();
    const [loading, setLoading] = useState(true);



    async function LoadBatches() {
        setLoading(true)
        try {
            const result = await axios.get("https://localhost:7153/api/Batch", {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                }
            });
            setBatches(result.data);
            console.log(result.data)
            setLoading(false);
        } catch (error) {
            console.log("Error fetching batches:", error);
            setLoading(false)
        }
    }


    async function deleteBatch(id) {
        try {

            const result = await axios.delete(`https://localhost:7153/api/Batch/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            })
            setBatches((prevBatches) => prevBatches.filter(batch => batch.batchId !== id));

            toast.success("batch deleted sucessfully")
        } catch (error) {
            toast.error("failed to delete batch");
        }
    }


    useEffect(() => {
        if (!cookies.token) {
            naviagte("/login");
        }
        LoadBatches();
    }, [cookies.token,]);

    return (
        <div className="mt-5">



            {loading ? (
                <div style={{ height: '80vh', width: '95vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BounceLoader color="#19ced3" />
                </div>
            ) : batches.length === 0 ? (
                <p>No batches found...</p>
            ) :
                (
                    <>
                    <Toaster position="top-right"/>
                        <h2>Batch List</h2>
                        <table class="table table-striped table-bordered table-hover w-80">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Batch ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Seats</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map((batch) => (
                                    <tr key={batch.batchId}>
                                        <td>{batch.batchId}</td>
                                        <td>{batch.name}</td>
                                        <td>{new Date(batch.startDate).toLocaleDateString()}</td>
                                        <td>{batch.seats}</td>
                                        <td >
                                            <button type="button" className="btn btn-primary">
                                                <Link to={`/edit/${batch.batchId}`} style={{ textDecoration: 'none', color: 'white' }}>EDIT BATCH</Link>
                                            </button>
                                        </td>
                                        <td><button type="button" className="btn btn-danger" onClick={()=>{deleteBatch(batch.batchId)}}>DELETE</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
        </div>
    );
};
