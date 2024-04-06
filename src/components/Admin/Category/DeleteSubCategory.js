import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { deleteSubCategory } from '../../../actions/menu';

function DeleteSubCategory({ mainCategory, subCategory, handleCloseDialog }) {
  const dispatch = useDispatch();

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    console.log("main: ", mainCategory, " sub ", subCategory)
    const delSubCategory = {
      categoryId: mainCategory,
      subCategoryName: subCategory,
    };
    dispatch(deleteSubCategory(delSubCategory));
    handleCloseDialog(); // Stänger dialogrutan när kategorin är borttagen
  };

  return (
    <div>
      <h3>Delete category</h3>
      <p>Are you sure you want to delete the sub category "{subCategory}"?</p>
      <Button variant="contained" color="secondary" onClick={handleDeleteCategory}>
        Yes, delete
      </Button>
      <Button variant="contained" color="primary" onClick={handleCloseDialog}>
        Cancel
      </Button>
    </div>
  );
}

export default DeleteSubCategory;