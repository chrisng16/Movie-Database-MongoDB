import "../styles/CastCard.css";

const CastCard = ({ actor }) => {
    return (
        <div className="cast-card cast-card-container">
            <div className="col">
                <h4>{actor.details.primaryName}</h4>
                <p>{actor.cast.characters !== "\\N" ? "As " + JSON.parse(actor.cast.characters).join(",") : (actor.cast.job !== "\\N" ? "As " + actor.cast.job : "")}</p>
                <p>{(actor.details.primaryProfession && actor.details.primaryProfession !== "\\N") ? "Profession: " + actor.details.primaryProfession : ""}</p>
            </div>
            <div className="col">
                <a href={`/cast/${actor.cast.nconst}`} className="card-btn">Details</a>
            </div>
        </div>
    );
}

export default CastCard;