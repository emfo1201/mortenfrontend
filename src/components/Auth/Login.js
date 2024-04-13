import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Container from "@mui/material/Container";
import Button from "@mui/material/Button"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Input from './Input'

import useStyles from './styles'
import { signin, signup } from '../../actions/auth'
import {useDispatch} from "react-redux";

const initialState = { username: '', password: ''}

function Login() {
    const classes = useStyles()
    const history = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        dispatch(signin(formData, history))
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        dispatch(signup(formData, history))
    }

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword)


    return(
        <Container component="main" maxWidth="xs">
            <Paper elevation={10} className={classes.paper} component='div'>
                <Avatar component='div' className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography variant='h5' component='h5'>Sign In</Typography>
                <form className={classes.form} onSubmit={handleSignIn}>
                    <Grid container spacing={2} component='div'>
                        <Input name="username" label='Username' handleChange={handleChange} />
                        <Input name="password" label='Password' type={showPassword ? "text" : "password"}
                               handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        <Button type="submit" color='primary' variant='contained'
                                fullWidth className={classes.fields} style={{marginBottom: 20}}>Sign in</Button>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Login