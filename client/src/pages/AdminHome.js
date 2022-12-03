import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    TextField,
    Button,
    Box,
    Grid,
    CssBaseline,
    Container,
  } from "@mui/material";

function AdminHome() {

    const [tconst, setTconst] = useState("");

    const [titleType, setTitleType] = useState("");
    const [primaryTitle, setprimaryTitle] = useState("");
    const [originalTitle, setoriginalTitle] = useState("");
    const [isAdult, setisAdult] = useState("");
    const [startYear, setstartYear] = useState("");
    const [endYear, setendYear] = useState("");
    const [runtimeMinutes, setruntimeMinutes] = useState("");
    const [genres, setgenres] = useState("");

    const theme = createTheme();
    const baseURL = "http://localhost:1337/api/titles";

    async function handleSubmitForInsert(e) {
        e.preventDefault();
        console.log(`${tconst}`);
        console.log(`${primaryTitle}`);
        console.log(`${originalTitle}`);
        console.log(`${titleType}`);
        console.log(`${isAdult}`);
        console.log(`${startYear}`);
        console.log(`${endYear}`);
        console.log(`${runtimeMinutes}`);
        console.log(`${genres}`);

        const res = await fetch(
            new URL(baseURL+ "/insert/"),
            {
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tconst,
                        primaryTitle,
                        originalTitle,
                        titleType,
                        isAdult,
                        startYear,
                        endYear,
                        runtimeMinutes,
                        genres,
                    }),
            }
        )
        const data = await res.json();
        document.getElementById('displayRes').innerHTML = data.msg;
        console.log(data);
    }
    
    async function  handleSubmitForDelete(e) {
        e.preventDefault();
        console.log(`${tconst} ${primaryTitle}`);

        const res = await fetch(
            new URL(baseURL+ "/delete/"),
            {
                method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tconst,
                        primaryTitle,
                    }),
            }
        )

        const data = await res.json();
        document.getElementById('displayDelRes').innerHTML = data.msg;
        console.log(data);
    }
    
    return (
        <div className="page-wrapper">
            <h1> Admin Home Page</h1>

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                sx={{
                    m: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    border: 1,
                    borderRadius: "15px",
                    borderColor: "rgb(134, 128, 128)",
                    boxShadow: 3,
                }}
                >
                    <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmitForInsert}
                    sx={{ mt: 3 }}
                    >
                        <h2> Want to add a new movie? </h2>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="tconst"
                                    required
                                    fullWidth
                                    id="tconst"
                                    label="tconst"
                                    autoFocus
                                    onChange={(e) => setTconst(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="primaryTitle"
                                    required
                                    fullWidth
                                    id="primaryTitle"
                                    label="Primary Title"
                                    autoFocus
                                    onChange={(e) => setprimaryTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="titleType"
                                    fullWidth
                                    id="titleType"
                                    label="Title Type"
                                    autoFocus
                                    onChange={(e) => setTitleType(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="isAdult"
                                    required
                                    fullWidth
                                    id="isAdult"
                                    label="isAdult (0 or 1)"
                                    autoFocus
                                    onChange={(e) => setisAdult(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="startYear"
                                    required
                                    fullWidth
                                    id="startYear"
                                    label="Start Year"
                                    autoFocus
                                    onChange={(e) => setstartYear(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="endYear"
                                    fullWidth
                                    id="endYear"
                                    label="End Year"
                                    autoFocus
                                    onChange={(e) => setendYear(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="runtimeMinute"
                                    fullWidth
                                    id="runtimeMinute"
                                    label="Run Time minute"
                                    autoFocus
                                    onChange={(e) => setruntimeMinutes(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="genres"
                                    fullWidth
                                    id="genres"
                                    label="Genre"
                                    autoFocus
                                    onChange={(e) => setgenres(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <h2 id="displayRes"></h2>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Insert
                        </Button>
                    </Box>
                </Box>
            </Container>

            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                sx={{
                    m: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    border: 1,
                    borderRadius: "15px",
                    borderColor: "rgb(134, 128, 128)",
                    boxShadow: 3,
                }}
                >
                    <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmitForDelete}
                    sx={{ mt: 3 }}
                    >
                        <h2> Want to delete a movie? </h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="tconst"
                                    required
                                    fullWidth
                                    id="tconst"
                                    label="tconst"
                                    autoFocus
                                    onChange={(e) => setTconst(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="primaryTitle"
                                    required
                                    fullWidth
                                    id="primaryTitle"
                                    label="Primary Title"
                                    autoFocus
                                    onChange={(e) => setprimaryTitle(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <h2 id="displayDelRes"></h2>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </div>
    );
}

export default AdminHome;