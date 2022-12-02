import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import "../styles/Title.css"
import AddEditReview from "../components/AddEditReview";
import DisplayReview from "../components/DisplayReview";
import AddRating from "../components/AddRating";
import Card from "../components/Card";
import CastCard from "../components/CastCard";

function Title() {
    const { tconst } = useParams();

    const [title, setTitle] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        getTitleDetails();
        getSimilarMovies();
    }, []);

    async function getTitleDetails() {
        await fetch(`http://localhost:1337/api/titles/${tconst}`)
            .then(res => res.json())
            .then(res => {
                setTitle(res[0] ? res[0] : null);
                setReviews(res[0].reviews);
                let castArr = [];
                for(let i=0; i<res[0].cast.length; i++){
                    castArr.push({"cast": res[0].cast[i], "details": res[0].castDetails[i]});
                }
                castArr.sort((item1, item2)=> item1.cast.ordering - item2.cast.ordering);
                setCast(castArr);
            }).catch(err => console.log(err));
    }
    async function getSimilarMovies() {
        await fetch(`http://localhost:1337/api/titles/${tconst}/similarmovies`)
            .then(res => res.json())
            .then(res => {
                setSimilarMovies(res);
            }).catch(err => console.log(err));
    }

    return (
        <div className="title-page">
            <h1>{title.primaryTitle}</h1>
            <hr />
            <div className="title-rating">
                <div className="title-section">
                    <div className="title-heading">
                        <br />
                        <h3>Genre: {title.genres}</h3>
                        <h3>Year: {title.startYear}</h3>
                        <h3>Run Time: {title.runtimeMinutes} minutes</h3>
                    </div>
                    <div className="rating-section">
                        <AddRating titleId={tconst} rating={title.ratings} />
                    </div>
                </div>
            </div>
            <hr />
            <div className="cast-section">
                <h2>Cast</h2>
                <div className="cast-container">
                    {
                        title.cast ? 
                        cast.map(item => (<CastCard actor={item} key={item.cast.ordering}/>))
                        :""
                    }
                </div>
            </div>
            <br />
            <hr />
            <br />
            <div className="review-section">
                <h2>Reviews</h2>
                {reviews ?
                    reviews.map(item => (<DisplayReview key={item._id} tconst={tconst} {...item} />))
                    : ""
                }
                <AddEditReview titleId={tconst} />
            </div>
            <br />
            <br />
            <hr />
            <br />
            <div className="similar-movies-section">
                <h2>Similar Movies</h2>
                <div className="cards-container">
                    {
                        similarMovies ? similarMovies.map(item => <Card movie={item["_id"]} key={item._id._id} />) : ""
                    }
                </div>
            </div>
        </div>
    );
}

export default Title;
