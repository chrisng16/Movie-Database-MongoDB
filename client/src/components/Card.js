import "../styles/Card.css";

const Card = (movie) => {
  return (
    <div className="card">
      <h2 className="card-name">{movie.primaryTitle}</h2>
      <p className="card-details-year">{movie.startYear}</p>
      <p className="card-details-type-genres">
        {movie.titleType} - {movie.genres}
      </p>
      <button className="card-btn">Details</button>
    </div>
  );
};

export default Card;
