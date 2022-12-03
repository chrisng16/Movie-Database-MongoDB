import React from "react";
import logo from "../assets/logo.png";
import {
  InputAdornment,
  IconButton,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const userBaseURL = "http://localhost:1337/api/users";

export default function SignIn({ setLoggedInStatus, setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [logInError, setLogInError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(currentUser);

    if (loggedIn) {
      setLoggedInStatus(true);
      setEmail("");
      setPassword("");
      navigate("/");
    }
    console.log("loggedIn Changed");
  }, [loggedIn]);

  async function handleSubmit(e) {
    e.preventDefault();

    let url = new URL(userBaseURL + "/login");
    url.search = new URLSearchParams({ email: email, password: password });
    console.log(url);
    const res = await fetch(url);

    const result = await res.json();

    if (result.success) {
      setCurrentUser(result.user);
      setLoggedIn(true);
      setLogInError(false);
    } else {
      setLogInError(true)
    }
  }

  return (
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
            component="img"
            sx={{
              width: "30%",
              alignItems: "center",
            }}
            src={logo}
            alt="I am DB logo"
          />
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {logInError && <Alert severity="error" margin="normal">
              Wrong Email or Password. Try again...
            </Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
