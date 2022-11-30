import "../styles/Card.css";
import "../styles/Card.css";
import "../styles/style.css";

const Cards = (titles) => {
  if (titles.length) return null;

  console.log(titles);
  return titles.titles.map((title, index) => (
    <div className="card" key={index}>
      <h2 className="card-name">{title.primaryTitle}</h2>
      <p className="card-details-year">{title.startYear}</p>
      <p className="card-details-type-genres">
        {title.titleType} - {title.genres}
      </p>
      <button className="card-btn">Details</button>
    </div>
  ));
};

export default Cards;
