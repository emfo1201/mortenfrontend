import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory } from '../../../actions/menu'; // Ersätt 'actions/menu' med sökvägen till din Redux-action för att lägga till subkategorier

function AddSubCategory({ mainCategory, handleCloseDialog }) {
  const [subCategory, setSubCategory] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Skapa den nya subkategorin med nödvändig information
    const newSubCategory = {
      category: mainCategory,
      newSubCategory: subCategory,
    };

    // Använd Redux-actionen för att lägga till subkategorin i ditt Redux-tillstånd och/eller skicka den till din backend
    dispatch(addSubCategory(newSubCategory));

    // Återställ formuläret efter inskickning
    setSubCategory('');
    handleCloseDialog();
  };

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