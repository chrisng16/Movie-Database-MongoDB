import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function CastDetail() {

    const { nconst } = useParams();

    const baseURL = "http://localhost:1337/api/names";

    const [detail, setDetail] = useState({
        primaryName: '',
        birthYear: 0,
        deathYear: 0,
        primaryProfession: '',
        knownForTitles: '',
      });

    async function searchMovie() {
        try {
            let url = new URL(`${baseURL}` + '/' + nconst);
            await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data[0]);
                    setDetail(data[0]);
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchMovie();
      }, []);

    return (
        <div className="page-wrapper">
            <h1> Cast Details</h1>
            <h2> Primary Name: {detail.primaryName}</h2>
            <h2> Birth Year: {detail.birthYear}</h2>
            <h2> Death Year: {detail.deathYear}</h2>
            <h2> Primary Job: {detail.primaryProfession}</h2>
        </div>
    );
}

export default CastDetail;
