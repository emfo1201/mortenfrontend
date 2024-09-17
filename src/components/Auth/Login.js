import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useStyles } from "./styles";

const initialState = { username: "", password: "" };

// Snackbar component
const AlertSnackbar = ({ open, message, onClose }) => (
  <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
    <MuiAlert elevation={6} variant="filled" severity="error" onClose={onClose}>
      {message}
    </MuiAlert>
  </Snackbar>
);

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData, navigate, dispatch);
      if (isMounted.current) {
        setLoading(false);
      }
    } catch (error) {
      if (isMounted.current) {
        setLoading(false);
        setSnackbarOpen(true);
        console.error("Login failed:", error.message);
        setSnackbarMessage(error.message || "Login failed");
      }
    }
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={10} className={classes.paper} component="div">
        <Avatar component="div" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSignIn}>
          <Grid container spacing={2}>
            <Input
              name="username"
              label="Username"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                className={classes.fields}
                style={{ marginBottom: 20 }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <AlertSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
        />
      </Paper>
    </Container>
  );
}

export default Login;
