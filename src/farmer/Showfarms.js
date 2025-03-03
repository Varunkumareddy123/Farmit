import React, { useState, useEffect } from "react";
import API from "../api.js";
 

function Showfarm() {
    const [allFarms, setAllFarms] = useState([])

    useEffect(() => {
        getallfamrs();
    }, []);

    const getallfamrs = async () => {
        try {
            let response = await API.get("/myfarms");
            setAllFarms(response.data);
        } catch (error) {
            console.error("Error fetching AllFarms:", error);
        }
    };
    return (
        <div className="farms-container3">
            <h1>All Farms</h1>
            {allFarms.length === 0 ? (
                <p>There are no famrs on your ID.</p>
            ) : (
                <div className="grid1">
                    {allFarms.map((item) => (
                        <div key={item._id} className="card">
                        <img
                            src={item.images}
                            alt={item.model}
                            className="card-image"
                        />
                        <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>{item.location}</p>
                            <p>{item.farmType}</p>
                            <p>{item.size}</p>
                            
                       
                        
                    </div>
                    ))}
                </div>
            )}
        </div>
        
    )
}
export default Showfarm;