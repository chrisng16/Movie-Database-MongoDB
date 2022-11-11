import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import AddEditReview from '../../components/add-edit-review/add-edit-review.component';
import DisplayReview from "../display-review/display-review.component";

const TitleDetail = () => {
    const { tconst } = useParams();
    
    const [reviews, setReviews] = useState(0);

    useEffect(() => {
        callAPI();
    }, []);

    async function callAPI() {
        await fetch(`http://localhost:5000/reviews/${tconst}`)
            .then(res => res.json())
            .then(res => { setReviews(res); console.log(res) });
    }
    return(
        <div>
            {reviews ? 
                    reviews.map(item => (<DisplayReview key={item._id} {...item} />)) 
                    
                    : ""
                }
        <AddEditReview titleId={tconst}/>
        </div>
    );
}

export default TitleDetail;