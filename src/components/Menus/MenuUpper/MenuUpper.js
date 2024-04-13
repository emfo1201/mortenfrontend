import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import {getPlayers} from "../../../actions/players";
import ButtonGroup from "@mui/material/ButtonGroup";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const MenuUpper = ({ menu }) => {
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
        <ButtonGroup variant="text" aria-label="text button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            <Button>Four</Button>
            <Button>Five</Button>
            <Button>Six</Button>
            <Button>Seven</Button>
            <Button>Eight</Button>
            <Button>Nine</Button>
            <Button>Ten</Button>
            <Button>Eleven</Button>
            <Button>Twelve</Button>
        </ButtonGroup>
    );
};

export default MenuUpper