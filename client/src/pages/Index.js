import React from "react";
import { useState } from "react";

function Index() {
  const [primaryTitle, setPrimaryTitle] = useState("");
  const [startYear, setStartYear] = useState(0);

  async function insertTitle(event) {
    event.preventDefault();

    const response = await fetch(
      new URL("http://localhost:1337/api/titles/insert/"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primaryTitle,
          startYear,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  }

  async function updateTitle(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/titles/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        primaryTitle,
        startYear,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  async function deleteTitle(event) {
    event.preventDefault();

    const response = await fetch(
      new URL("http://localhost:1337/api/titles/delete"),
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primaryTitle,
          startYear,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <div>
        <h1>Welcome to I am DB</h1>
        <input
          value={primaryTitle}
          onChange={(e) => setPrimaryTitle(e.target.value)}
          type="text"
          placeholder="Title Name"
        />
        <br></br>
        <input
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          type="number"
        />
      </div>
      <button onClick={insertTitle}>Insert Titles</button>
      <button onClick={updateTitle}>Update Titles</button>
      <button onClick={deleteTitle}>Delete Titles</button>
    </div>
  );
}

export default Index;
