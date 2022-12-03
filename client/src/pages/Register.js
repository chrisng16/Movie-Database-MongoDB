import React from "react";
import logo from "../assets/logo.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as validator from "email-validator";

const theme = createTheme();
const userBaseURL = "http://localhost:1337/api/users";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailTaken, setEmailTaken] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");

  async function emailChecker(e) {
    if (e.target.value) {
      if (!validator.validate(e.target.value)) {
        setEmailHelper("Not a valid email...");
        return
      } else {
        setEmailHelper("")
      }

      let candidateEmail = e.target.value;
      let url = new URL(userBaseURL + "/email-check");

      url.search = new URLSearchParams({ email: candidateEmail });
      const res = await fetch(url);

      const result = await res.json();
      if (!result.isTaken) {
        setEmail(candidateEmail);
        setEmailTaken(false);
      } else {
        setEmailTaken(true);
        setEmailHelper("Email unvailable");
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(`${fname} ${lname} ${email} ${password}`);
    const res = await fetch(
      new URL(userBaseURL+"/register/"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      }
    )

    const data = await res.json();
    console.log(data)
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
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={emailTaken}
                  helperText={emailHelper}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={emailChecker}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
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
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={emailTaken||emailHelper.length!=0}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
