//Pagination.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";

import { getPlayers, getPlayersBySearch } from "../../actions/players";
import useStyles from "./styles";

const Paginate = ({ page, searchParams }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.players);
  const searchQuery = searchParams.get("searchQuery");
  const key = searchParams.get("key");

  useEffect(() => {
    if (page) {
      if (searchQuery) {
        const [searchString] = searchQuery.split("?");
        console.log("searchQuery searchTerm: ", searchString, " page: ", page);
        dispatch(getPlayersBySearch(searchString, page));
      } else if (key) {
        const [categories] = key.split("?");
        console.log("searchParams: ", categories);
        dispatch(getPlayers(categories, page));
      }
    }
  }, [page, key, searchQuery, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => {
        const key = searchParams.get("key");
        let url = "";

        if (searchQuery) {
          url = `/players/search?searchQuery=${searchQuery}&page=${item.page}`;
        } else if (key) {
          url = `/players/listPlayers?key=${key}&page=${item.page}`;
        } else {
          url = `/players/page=${item.page}`;
        }

        return <PaginationItem {...item} component={Link} to={url} />;
      }}
    />
  );
};

export default Paginate;