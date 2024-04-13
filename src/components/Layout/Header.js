import React, {useEffect, useState} from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { withStyles } from '@mui/material/styles'
import i18next from 'i18next'
import decode from "jwt-decode"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemText from "@mui/material/ListItemText/ListItemText"
import List from "@mui/material/List"
import {getPlayers} from "../../actions/players";

const styles = {
    root: {
        flexGrow: 1
    },
    background: {
        backgroundColor: "black"
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    },
    language: {
        paddingLeft: 30
    }
}

const Header = ({ classes }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [openDrawer, setopenDrawer] = useState(false)
    const [openSubDrawer, setOpenSubDrawer] = useState(false)
    const [subMenu, setSubMenu] = useState([])
    const category = useSelector((state) => state.menus)
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const token = user?.token

        if(token) {
            const decToken = decode(token)

            if(decToken.exp * 1000 < new Date().getTime()){
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem(('profile'))))
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history('/', { redirect: true })
        setUser(null)
    }

    const signin = () => {
        history('/login', { redirect: true })
    }

    const toggleDrawer = (openDrawer, openSubDrawer) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        //changes the function state according to the value of open
        setopenDrawer(openDrawer)
        setOpenSubDrawer(openSubDrawer)
    }

    const openSubMenu = (cat) => {
        console.log(cat)
       setSubMenu(cat)
        setOpenSubDrawer(true)
    }

    const listPlayer = (e, mainMenu, sub) => {
        e.preventDefault()
        const categories = [ mainMenu, sub ]
        dispatch(getPlayers({ name: categories.join(',') }))
        history(`/players/search?searchQuery=${categories.join(',')}`, { redirect: true })
    }

    const menuItems = category.filter((menu) =>menu.subMenu.length > 0)
    const subMenuItems = category.filter((menu => menu._id === subMenu))

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.background}>
                <Toolbar component='div'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        mr={2}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        //from which side the drawer slides in
                        anchor="left"
                        //if open is true --> drawer is shown
                        open={openDrawer}
                        //function that is called when the drawer should close
                        onClose={toggleDrawer(false, false)}
                        //function that is called when the drawer should open
                        onopen={toggleDrawer(true, false)}
                    >
                        {/* The inside of the drawer */}
                        <Box p={2} height={2}>

                            {/*
                  when clicking the icon it calls the function toggleDrawer
                  and closes the drawer by setting the variable open to false
                  */}
                            <IconButton mb={2}>
                                <CloseIcon onClick={toggleDrawer(false, false)} />
                            </IconButton>

                            <Divider mb={2} />

                            <Box ml={12} mr={12} style={{ width : "200px"}}>
                                {menuItems.map((menu) => (
                                    <List key={menu._id} item xs={12} sm={6} md={6} onClick={() => {openSubMenu(menu._id)}} style={{ cursor: 'pointer' }}>
                                        {menu.mainMenu}
                                    </List>
                                ))}
                            </Box>
                        </Box>
                        <Drawer
                            //from which side the drawer slides in
                            anchor="left"
                            //if open is true --> drawer is shown
                            open={openSubDrawer}
                            //function that is called when the drawer should close
                            onClose={toggleDrawer(false)}
                            //function that is called when the drawer should open
                            onopen={toggleDrawer(true)}
                        >
                            {/* The inside of the drawer */}
                            <Box p={2} height={2}>

                                {/*
                  when clicking the icon it calls the function toggleDrawer
                  and closes the drawer by setting the variable open to false
                  */}
                                <IconButton mb={2} style={{ display: 'flex', justifyContent: "space-between", width: '100%'}}>
                                    <ArrowBackIcon onClick={toggleDrawer(true, false)}/>
                                    <CloseIcon onClick={toggleDrawer(false, false)} />
                                </IconButton>

                                <Divider mb={2} />

                                <Box ml={12} mr={12} transitionDuration={0} style={{ width : "200px"}}>
                                    {subMenuItems.map((menu) => (
                                        menu.subMenu.map((sub) =>
                                            <List key={sub._id} onClick={(e) => listPlayer(e, menu.mainMenu, sub)} style={{ cursor: 'pointer' }}>
                                                <ListItemText primary={sub} onClick={toggleDrawer(false, false)}/>
                                            </List>

                                            )
                                    ))}
                                </Box>
                            </Box>
                        </Drawer>
                    </Drawer>

                    <Typography variant="h6" color="inherit" className={classes.title} component={Link} to={"./../"}>
                        Norske Fotballdrakter
                    </Typography>
                    {user ? <Button variant="contained" color="secondary" size="small" onClick={logout}>Logout</Button> :
                        <Button variant="contained" color="primary" size="small" onClick={signin}>Sign in</Button> }

                    {i18next.language === "no" ? <Typography variant="string" color="inherit" className={classes.language} onClick={() => i18next.changeLanguage("en")}>
                        English
                    </Typography> :
                    <Typography variant="string" color="inherit" className={classes.language} onClick={() => i18next.changeLanguage("no")}>
                        Norsk
                    </Typography> }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(Header)