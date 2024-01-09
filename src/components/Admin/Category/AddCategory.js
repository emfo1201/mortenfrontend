import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../../actions/menu'; // Importera din Redux-action

function AddCategory() {
  const [categoryData, setCategoryData] = useState({ categoryName: '' });
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
    // Skapa den nya kategorin med mainCategory-informationen
    const newCategory = {
      newCategory: categoryData.categoryName, // Anpassa det här för att matcha din backend
    };

    // Använd Redux-action för att skicka data till din backend
    dispatch(addCategory(newCategory));
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