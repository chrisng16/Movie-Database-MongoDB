import "../styles/Card.css";
import { Link } from "react-router-dom";

const Card = ({movie}) => {
  return (
    <div className="card">
      <h2 className="card-name">{movie.primaryTitle}</h2>
      <p className="card-details-year">{movie.startYear}</p>
      <p className="card-details-type-genres">
        {movie.titleType} - {movie.genres}
      </p>
      <a href={`/title/${movie.tconst}`} className="card-btn">Details</a>
    </div>
  );
};

export default Card;
