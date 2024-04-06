import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../actions/menu';

function AddCategory({ handleCloseDialog }) {
  // State to manage the input value for category name
  const [categoryData, setCategoryData] = useState({ categoryName: '' });
  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle changes in the input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      newCategory: categoryData.categoryName,
    };
    dispatch(addCategory(newCategory)); // Dispatching addCategory action
    handleCloseDialog(); // Closing the dialog after submission
  };

  return (
    <div>
      {/* Heading indicating the purpose of the component */}
      <h3>Add new category</h3>
      {/* Form for adding a new category */}
      <form onSubmit={handleSubmit}>
        {/* Text field for entering new category name */}
        <TextField
          name="categoryName"
          label="New category"
          variant="outlined"
          value={categoryData.categoryName}
          onChange={handleInputChange}
        />
        {/* Empty paragraph for spacing */}
        <p />
        {/* Button to submit the form */}
        <Button variant="contained" color="primary" type="submit">
          Add new category
        </Button>
      </form>
    </div>
  );
}

export default AddCategory;