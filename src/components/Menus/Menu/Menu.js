import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Collapse from "@mui/material/Collapse/Collapse";
import List from "@mui/material/List";
import {getPlayers} from "../../../actions/players";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Menu = ({ menu }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery()
    const searchQuery = query.get('searchQuery')
    const history = useNavigate()

    const [ men, setMen ] = useState({})

    const listPlayer = (mainMenu, sub) => {
        const categories = [ mainMenu, sub ]
        dispatch(getPlayers({ name: categories.join(',') }));
        history(`/players/search?searchQuery=${categories.join(',')}`, { redirect: true })
    }

    const handleClick = (item) => {
        let newData = {...men, [item] : !men[item]};
        setMen(newData);
    }

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem button key={menu._id} name={menu.mainMenu} onClick={() => handleClick(menu._id)} component='li'>
                <ListItemText primary={menu.mainMenu} />
                {men[menu._id] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={Boolean(men[menu._id])} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.flexContainer}>
                    {menu.subMenu.map((sub, index) =>
                        <ListItem button key={sub._id} className={classes.nested} onClick={() => {listPlayer(menu.mainMenu, sub)}}>
                            <ListItemText primary={sub} />
                        </ListItem>
                    )}
                </List>

            </Collapse>

        </List>
    );
};

export default Menu;