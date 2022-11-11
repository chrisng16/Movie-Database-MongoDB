import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    reviewTitle: "",
    description: ""
}

const AddEditReview = ({ titleId, mode, reviewId }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { reviewTitle, description } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = "http://localhost:5000/reviews/add";
        if(mode === "edit"){
            url = "http://localhost:5000/reviews/edit";
        }
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "tconst": titleId, "_id":reviewId, ...formFields})
        });
        const content = await rawResponse.text();
        console.log("I got this response:::",content);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="reviewContainer">
            <h2>Share your views about this title here</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Review Title" type="text" required onChange={handleChange} name="reviewTitle" value={reviewTitle} />
                <FormInput label="Description" type="text" required onChange={handleChange} name="description" value={description} />
                <Button type="submit">Post</Button>
            </form>
        </div>
    );
}

export default AddEditReview;