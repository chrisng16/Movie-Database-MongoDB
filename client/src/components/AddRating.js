import { useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/AddRating.css";

const defaultFormFields = {
    userRating: ""
};

const AddRating = ({ titleId, rating }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { userRating } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = `http://localhost:1337/api/titles/${titleId}/addrating`;
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "tconst": titleId, "rating": rating, ...formFields })
        });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="rating-card rating-container">
            <div className="col">Current Rating
                <div>
                <h1>{rating && rating.averageRating.toFixed(1)}/10</h1>
                </div>
            </div>
            <div className="col">
                <h3>Add a Rating</h3>
                <form onSubmit={handleSubmit}>
                    <FormInput label="Rating on a scale of 1-10" type="number" required onChange={handleChange} name="userRating" value={userRating} min={1} max={10} />
                    <button type="submit">Rate</button>
                </form>
            </div>
        </div>
    );
}

export default AddRating;