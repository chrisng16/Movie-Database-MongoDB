import { useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/AddEditReview.css"

const defaultFormFields = {
    reviewTitle: "",
    description: ""
}

const AddEditReview = ({ titleId, mode, reviewId }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { reviewTitle, description } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = `http://localhost:1337/api/titles/${titleId}/reviews/insert`;
        if(mode === "edit"){
            url = `http://localhost:1337/api/titles/${titleId}/reviews/edit`;
        }
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "tconst": titleId, "_id":reviewId, ...formFields})
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="review-card">
            <h3>{mode === "edit"? "Edit your ":"Add a new "} review</h3>
            <form onSubmit={handleSubmit}>
                <FormInput label="Review Title" type="text" required onChange={handleChange} name="reviewTitle" value={reviewTitle} />
                <FormInput label="Description" type="text" required onChange={handleChange} name="description" value={description} />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default AddEditReview;