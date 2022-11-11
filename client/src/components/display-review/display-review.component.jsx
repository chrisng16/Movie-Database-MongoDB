import Button from "../button/button.component";
import { useState } from "react";
import AddEditReview from "../add-edit-review/add-edit-review.component";

const DisplayReview = ({ tconst, reviewTitle, description, _id }) => {

    const [ mode, setMode ] = useState("add");

    const deleteReview = async (event) => {
        event.preventDefault();
        const rawResponse = await fetch(`http://localhost:5000/reviews/delete/${_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tconst })
        });
        const content = await rawResponse.text();
        console.log("I got this response:::",content);
    }

    const editReview = () => {
        setMode("edit");
    }

    return (
        <div>
            <h3>{reviewTitle}</h3>
            <h5>{_id}</h5>
            <p>{description}</p>
            <div className="buttons-container">
                <Button onClick={editReview} buttonType="inverted">Edit</Button>
                { mode === "edit"? 
                    <AddEditReview titleId={tconst} mode="edit" reviewId={_id}/>
                
                : ""}
                <Button onClick={deleteReview} buttonType="inverted">Delete</Button>
            </div>
        </div>
    );
}

export default DisplayReview;