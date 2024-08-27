import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';

import { getPlayers, getPlayersBySearch } from '../../actions/players';
import useStyles from './styles';

const Paginate = ({ page, searchParams }) => {
    const classes = useStyles();
    const dispatch = useDispatch();  

  useEffect(() => {
    console.log("IN PAGINATION!!!!")
    if (page) {
        const searchQuery = searchParams.get('searchQuery');
        const key = searchParams.get('key');

        if (searchQuery) {
            const [categories] = searchQuery.split('?');
            dispatch(getPlayersBySearch( categories, page ));
        } else if (key) {
            const [categories] = key.split('?');
            dispatch(getPlayers( categories, page ));
        }
    }
}, [page, searchParams, dispatch]);     

    return (
        <Pagination
    classes={{ ul: classes.ul }}
    count={5} // Anpassa till rätt antal sidor om du har denna info
    page={Number(page) || 1}
    variant="outlined"
    color="primary"
    renderItem={(item) => {
        const key = searchParams.get('key');
        const url = key ? `/players/listPlayers?key=${key}&page=${item.page}` : `/players/listPlayers?page=${item.page}`;
    
        return (
            <PaginationItem 
                {...item} 
                component={Link} 
                to={url} 
            />
        );
    }}
/>

    );
};

export default Paginate;