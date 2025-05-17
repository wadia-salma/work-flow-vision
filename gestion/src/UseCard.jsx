import React from "react";
const UseCard = ({ nom,age,description})=> {
    return (
        <div className="user-card"> 
        <h2>{nom}</h2>
        <p className="age"> {age}</p>
        <p className="description"> {description}</p>
        </div>
    )
}
export default UseCard;