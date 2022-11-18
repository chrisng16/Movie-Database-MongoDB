import "../styles/style.css";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import "../styles/NavBar.css";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="result-box">
        <h1>Search Result for </h1>
        <div id="card-view">
          <Card
            primaryTitle="Testing"
            startYear="1997"
            genres="test"
            titleType="test"
          ></Card>

          <Card
            primaryTitle="Testing2"
            startYear="1996"
            genres="test2"
            titleType="test2"
          ></Card>

        </div>
      </div>
    </div>
  );
};

export default Home;
