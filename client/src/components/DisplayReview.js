import { useState } from "react";
import AddEditReview from "../components/AddEditReview";
import "../styles/DisplayReview.css"

const DisplayReview = ({ tconst, reviewTitle, description, _id, date }) => {

    const [mode, setMode] = useState("add");

    const deleteReview = async (event) => {
        event.preventDefault();
        const rawResponse = await fetch(`http://localhost:1337/api/titles/${tconst}/reviews/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id })
        });
        const content = await rawResponse.text();
        console.log("I got this response:::", content);
    }

    const editReview = () => {
        setMode("edit");
    }

    return (
        <div className="review-card">
            <h3 className="card-name">{reviewTitle}</h3>
            <h5>Added on {date}</h5>
            <p>{description}</p>
            <div className="buttons-container">
                <button className="edit-button" onClick={editReview}>Edit</button>
                <button className="delete-button" onClick={deleteReview}>Delete</button>
            </div>
            {mode === "edit" ?
                <AddEditReview titleId={tconst} mode="edit" reviewId={_id} />

                : ""}
        </div>
    );
}

export default DisplayReview;