import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { deleteCategory } from '../../../api';

function DeleteCategory() {
  const [categoryToDelete, setCategoryToDelete] = useState('');
  const dispatch = useDispatch();

  const handleDeleteCategory = () => {
    console.log("catDel: ", categoryToDelete)
  //  dispatch(deleteCategory(categoryToDelete));
  };

  return (
    <div>
      <h3>Delete category</h3>
      <FormControl variant="outlined">
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={categoryToDelete}
          onChange={(e) => setCategoryToDelete(e.target.value)}
        >
          {/* Add your category options here */}
        </Select>
      </FormControl>
      <p />
      <Button variant="contained" color="primary" onClick={handleDeleteCategory}>
        Delete category
      </Button>
    </div>
  );
}

export default DeleteCategory;
