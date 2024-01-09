import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles';
import CategorySelect from './CategorySelect';
import PlayerData from './PlayerData';
import ImageUpload from './ImageUpload';
import { addPlayer } from '../../../../actions/players';

function Player() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState({ name: '', club: '', infoEnglish: '', infoNorwegian: '',
        category: ''});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.menus);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoriesByCategory, setSelectedSubCategoriesByCategory] = useState({});
  const [selectedSubCategoriesByMainCategory, setSelectedSubCategoriesByMainCategory] = useState({});
  const selectedSubCategoryValues = selectedSubCategoriesByMainCategory[selectedCategory]?.map(subCategory => subCategory.sub) || [];

  // State to manage menu data
  const [menuData, setMenuData] = useState({
    categories: [],
    subCategories: {},
  });

  // Fetch and update menu data when 'category' state changes
  useEffect(() => {
    const categories = category || [];
    const subCategories = {};

    // Organize categories and subcategories
    categories.forEach((cat) => {
      subCategories[cat.mainMenu] = cat.subMenu;
    });

    // Filter categories with subcategories
    const filteredCategories = categories.filter(
      (cat) => subCategories[cat.mainMenu].length > 0
    );

    setMenuData({
      categories: filteredCategories,
      subCategories,
    });
  }, [category]);

  // Handle input change for player data fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  // Handle category selection change
  // Handle category selection change
const handleSelectChange = (event) => {
  const newSelectedCategory = event.target.value;
  setSelectedCategory(newSelectedCategory);

  // Check if there are selected subcategories for the new category
  const selectedSubCategoriesForNewCategory = selectedSubCategoriesByCategory[newSelectedCategory] || [];

  // Set the selected subcategories for the new category
  setSelectedSubCategories(selectedSubCategoriesForNewCategory);
};

  // Handle image selection change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
  
    setImageFiles([...imageFiles, ...files]);
    setImagePreviews([...imagePreviews, ...previews]);
  
    // Använd imageFiles istället för e.target.files
    // Här är ändringen nedan, använd imageFiles i stället för e.target.files
    setPlayerData({ ...playerData, images: [...imageFiles, ...files] });
  };

  // Handle removal of an image preview
  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  

  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryValues = event.target.value;
  
    // Skapa en kopia av de tidigare valda underkategorierna för den aktuella huvudkategorin
    const selectedSubCategoriesForMainCategory = selectedSubCategoriesByMainCategory[selectedCategory] || [];
  
    // Skapa en ny array med de tidigare valda underkategorierna samt de nya
    const updatedSelectedSubCategories = [
      ...selectedSubCategoriesForMainCategory,
      ...selectedSubCategoryValues.map((subCategory) => ({
        main: selectedCategory,
        sub: subCategory,
      })),
    ];
  
    // Update the selected subcategories for the current category
    setSelectedSubCategories(selectedSubCategoryValues);
  
    // Update the selectedSubCategoriesByCategory object
    setSelectedSubCategoriesByCategory({
      ...selectedSubCategoriesByCategory,
      [selectedCategory]: selectedSubCategoryValues,
    });
  
    // Uppdatera selectedSubCategoriesByMainCategory för den aktuella huvudkategorin
    setSelectedSubCategoriesByMainCategory({
      ...selectedSubCategoriesByMainCategory,
      [selectedCategory]: updatedSelectedSubCategories,
    });
  };
    

  const clear = () => {
    setPlayerData({ name: '', club: '', infoEnglish: '', infoNorwegian: '',
        category: ''})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
  
    data.append('name', playerData.name);
    data.append('club', playerData.club);
    data.append('infoEnglish', playerData.infoEnglish);
    data.append('infoNorwegian', playerData.infoNorwegian);
  
    const categories = [];

    const selectedCategoriesToSend = selectedSubCategories.map((subCategory) => ({
      main: selectedCategory,
      sub: subCategory,
    }));

    data.append('categories', JSON.stringify(selectedCategoriesToSend));
  
    imageFiles.forEach((image, index) => {
      data.append(`images`, image);
    });
  
    dispatch(addPlayer(data, navigate));
    console.log("dispatch utförd");
    clear();
  };    

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <PlayerData playerData={playerData} handleInputChange={handleInputChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategorySelect
          selectedCategory={selectedCategory}
          handleSelectChange={handleSelectChange}
          menuData={menuData}
          selectedSubCategoryValues={selectedSubCategoryValues}
          handleSubCategoryChange={handleSubCategoryChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ImageUpload
          imagePreviews={imagePreviews}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" type="submit">
          Add Player
        </Button>
      </Grid>
    </Grid>
  </form>
);
}

export default Player;