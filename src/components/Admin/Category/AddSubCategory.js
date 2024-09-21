//AddSubCategory.js
import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addSubCategory } from "../../../actions/menu";

function AddSubCategory({ mainCategory, handleCloseDialog }) {
  const [subCategory, setSubCategory] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newSubCategory = {
        category: mainCategory,
        newSubCategory: subCategory,
      };

      dispatch(addSubCategory(newSubCategory));

      setSubCategory("");
      handleCloseDialog();
    },
    [dispatch, handleCloseDialog, mainCategory, subCategory]
  );

  return (
    <div>
      <h3>Add new subcategory</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          name="categoryName"
          label="New subcategory"
          variant="outlined"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />
        <p />
        <Button variant="contained" color="primary" type="submit">
          Add new subcategory
        </Button>
      </form>
    </div>
  );
}

export default AddSubCategory;
