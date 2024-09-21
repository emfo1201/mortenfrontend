//DeleteCategory.js
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { deleteCategory } from "../../../actions/menu";

function DeleteCategory({ category, id, handleCloseDialog }) {
  const dispatch = useDispatch();

  const handleDeleteCategory = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(deleteCategory(id));
      handleCloseDialog();
    },
    [dispatch, handleCloseDialog, id]
  );

  return (
    <div>
      <h3>Delete category</h3>
      <p>
        Are you sure you want to delete the category &quot;{category}&quot;?
      </p>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteCategory}
      >
        Yes, delete
      </Button>
      <Button variant="contained" color="primary" onClick={handleCloseDialog}>
        Cancel
      </Button>
    </div>
  );
}

export default DeleteCategory;
