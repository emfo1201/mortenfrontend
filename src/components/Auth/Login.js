import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import Input from './Input';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useStyles } from './styles';

const initialState = { username: '', password: '' };

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Använd login från AuthContext
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const history = useNavigate();
  const classes = useStyles();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Använd login-funktionen från AuthContext för att hantera inloggning
      await login(formData, history);
      navigate('/'); // Navigera till hemsidan om inloggningen lyckas
    } catch (error) {
      // Om inloggningen misslyckas, visa felmeddelanden i Snackbar
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
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
          <Grid container spacing={2} component="div">
            <Input name="username" label="Username" handleChange={handleChange} />
            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              className={classes.fields}
              style={{ marginBottom: 20 }}
            >
              Sign in
            </Button>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Login;