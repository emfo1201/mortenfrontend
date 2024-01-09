import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function CategorySelect({
  selectedCategory,
  handleSelectChange,
  menuData,
  selectedSubCategoryValues,
  handleSubCategoryChange,
}) {
  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={selectedCategory}
          onChange={handleSelectChange}
          label="Category"
        >
          {menuData.categories.map((category, index) => (
            <MenuItem key={index} value={category.mainMenu}>
              {category.mainMenu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategory && (
        <FormControl variant="outlined">
          <InputLabel id="subCategory">Sub Category</InputLabel>
          <Select
            labelId="subCategory"
            id="subCategory"
            multiple
            value={selectedSubCategoryValues}
            onChange={handleSubCategoryChange}
            label="Sub Category"
          >
            {menuData.subCategories[selectedCategory]?.map(
              (subCategory, index) => (
                <MenuItem key={index} value={subCategory}>
                  {subCategory}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default CategorySelect;