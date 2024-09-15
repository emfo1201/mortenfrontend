//AddCategory.js
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addCategory } from "../../../actions/menu";

function AddCategory({ handleCloseDialog }) {
  const [categoryData, setCategoryData] = useState({ categoryName: "" });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      newCategory: categoryData.categoryName,
    };
    dispatch(addCategory(newCategory));
    handleCloseDialog();
  };

  return (
    <div>
      <h3>Add new category</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          name="categoryName"
          label="New category"
          variant="outlined"
          value={categoryData.categoryName}
          onChange={handleInputChange}
        />
        <p />
        <Button variant="contained" color="primary" type="submit">
          Add new category
        </Button>
      </form>
    </div>
  );
}

export default AddCategory;
