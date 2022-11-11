import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Titles = () => {
    const [data, setData] = useState(0);

    useEffect(() => {
        // Update the document title using the browser API
        callAPI();
    }, []);

    async function callAPI() {
        await fetch("http://localhost:5000/titles")
            .then(res => res.json())
            .then(res => { setData(res); console.log(res) });
    }

    return (
        <div>
            <header>
                {data ? 
                    data.map(item => (<div><Link to={`/titles/${item.tconst}`} key={item.tconst}>{item.primaryTitle}, {item.genres}</Link></div>)) 
                    
                    : ""
                }
            </header>
        </div>
    );
}

export default Titles;