import React from 'react';
import { List, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Menu from './Menu/Menu';
import useStyles from './styles';

const Menus = () => {
    const menu = useSelector((state) => state.menus);
    const classes = useStyles();

    return (
       !menu.length ? <CircularProgress /> : (
           <div className={classes.divRoot}>
                {menu.map((menu) => (
                    <List key={menu._id} item xs={12} sm={6} md={6}>
                        <Menu menu={menu} />
                    </List>
                ))}
           </div>
        )
    );
};

export default Menus;