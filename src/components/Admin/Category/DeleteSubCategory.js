import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function DeleteSubCategory() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryOptions = (e) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setSelectedCategories(selectedValues);
  };

  const deleteSubCategory = () => {
    // Add your logic to delete selected sub-categories here
  };

  return (
    <div>
      <h3>Delete sub category</h3>
      <FormControl>
        <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
        <Select
          native
          id="grouped-native-select"
          multiple
          onChange={handleCategoryOptions}
        >
          {/* Add your category options here */}
        </Select>
      </FormControl>
      <p />
      <Button variant="contained" color="primary" onClick={deleteSubCategory}>
        Delete sub category
      </Button>
    </div>
  );
}

export default DeleteSubCategory;