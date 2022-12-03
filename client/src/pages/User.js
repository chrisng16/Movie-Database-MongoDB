import React from "react";
import {
  InputAdornment,
  IconButton,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SelectInput from "@mui/material/Select/SelectInput";

const theme = createTheme();
const userBaseURL = "http://localhost:1337/api/users";

export default function User({ user, setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [changePassword, setChangePassword] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function checkPassword(e) {
    if (!(newPassword === confirmPassword)) {
      setAlertStatus("error");
      setAlertMessage("Confirm Password is different from the New Password");
      setShowAlert(true);
    } else {
      setAlertStatus("success");
      setAlertMessage("Everything is good!");
      setShowAlert(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (fname === user.fname && lname === user.lname) {
      setAlertMessage("Nothing has changed");
      setAlertStatus("warning");
      return;
    }

    let query = { email: user.email };

    if (fname !== user.fname || lname !== user.lname) {
      Object.assign(query, { newFname: fname, newLname: lname });
    }
    if (changePassword && !alertStatus) {
      Object.assign(query, { newPassword: newPassword });
    }

    const requestBody = JSON.stringify(query);

    const res = await fetch(new URL(userBaseURL + "/update"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const result = await res.json();

    if (result.success) {
      const res = await setUser(result.user);
      console.log(res);
      setAlertStatus("success");
      setAlertMessage("Changes successfully made!");
      setShowAlert(true);
    } else {
      setAlertStatus("error");
      setAlertMessage("Error while saving changes");
      setShowAlert(true);
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
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid container spacing={2} m={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    defaultValue={user.fname}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onBlur={(e) => setFname(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    defaultValue={user.lname}
                    autoComplete="family-name"
                    onBlur={(e) => setLname(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Change Password"
                    control={
                      <Checkbox
                        onChange={(e) => {
                          setChangePassword(e.target.checked);
                          setShowAlert(false);
                        }}
                      />
                    }
                  />
                </Grid>
              </Grid>

              {changePassword && (
                <Grid container spacing={2} m={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      id="confirm-password"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      onBlur={checkPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            {showAlert && (
              <Alert severity={alertStatus} margin="normal">
                {alertMessage}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
