import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CategorySelect from './CategorySelect';
import PlayerData from './PlayerData';
import ImageUpload from './ImageUpload';
import useStyles from './styles';

function AddUpdatePlayerForm({ player, handleSubmit, handleCloseUpdatePlayer }) {
  const classes = useStyles();
  const [playerData, setPlayerData] = useState({ name: '', club: '', infoEnglish: '', infoNorwegian: '', category: [] });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const category = useSelector((state) => state.menus);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMainCategories, setSelectedMainCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoriesByCategory, setSelectedSubCategoriesByCategory] = useState({});
  const [selectedSubCategoriesByMainCategory, setSelectedSubCategoriesByMainCategory] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [existingCategories, setExistingCategories] = useState([]);
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

  useEffect(() => {
    if (player) {
      console.log("player: ", player);
      setPlayerData({
        name: player.name || '',
        club: player.club || '',
        infoEnglish: player.infoEnglish || '',
        infoNorwegian: player.infoNorwegian || '',
        category: player.category || [],
      });
  
      const newMainCategories = Array.from(new Set([...selectedMainCategories, ...player.category]));
      setSelectedMainCategories(newMainCategories);
      setExistingImages(player.images);
  
      // Kombinera befintliga kategorier och underkategorier till en enda array
      const updatedSelectedSubCategories = [...selectedSubCategories];
  
      // Loopa igenom player.category och player.subCategory och lägg till i updatedSelectedSubCategories
      player.category.forEach((main, index) => {
        updatedSelectedSubCategories.push({
          main: main,
          sub: player.subCategory[index] || '' // Om subCategory är tom, lägg till en tom sträng
        });
      });
  
      // Uppdatera selectedSubCategories med den nya arrayen
      setSelectedSubCategoriesByMainCategory({
        ...selectedSubCategoriesByMainCategory,
        [player.category]: updatedSelectedSubCategories,
      });
    }
  }, [player]);
  

  // Handle input change for player data fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

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
    setPlayerData({ ...playerData, images: [...imageFiles, ...files] });
  };

  // Handle removal of an image preview
  const handleRemoveImage = (index) => {
    if (index < existingImages.length) {
      const updatedExistingImages = [...existingImages];
      updatedExistingImages.splice(index, 1);
      setExistingImages(updatedExistingImages);
    } else {
      const updatedFiles = [...imageFiles];
      const updatedPreviews = [...imagePreviews];

      const newIndex = index - existingImages.length;

      updatedFiles.splice(newIndex, 1);
      updatedPreviews.splice(newIndex, 1);

      setImageFiles(updatedFiles);
      setImagePreviews(updatedPreviews);
    }

    // Clear the value of the input field to remove the filename
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryValues = event.target.value;
  
    // Update the selectedSubCategoriesByCategory object
    setSelectedSubCategoriesByCategory({
      ...selectedSubCategoriesByCategory,
      [selectedCategory]: selectedSubCategoryValues,
    });
    
    // Kontrollera om huvudkategorin redan finns i den uppdaterade listan
    // Uppdatera selectedSubCategoriesByMainCategory för den aktuella huvudkategorin
    const updatedSelectedSubCategories = { ...selectedSubCategoriesByMainCategory };

    // Rensa den befintliga listan för huvudkategorin
    updatedSelectedSubCategories[selectedCategory] = [];

    // Lägg till de valda underkategorierna
    selectedSubCategoryValues.forEach((sub) => {
      updatedSelectedSubCategories[selectedCategory].push({ main: selectedCategory, sub: sub });
    });

    setSelectedSubCategories(selectedSubCategoryValues);

    // Uppdatera selectedSubCategoriesByMainCategory för den aktuella huvudkategorin
    setSelectedSubCategoriesByMainCategory({
      ...selectedSubCategoriesByMainCategory,
      [selectedCategory]: updatedSelectedSubCategories[selectedCategory],
    });
  };
  
  
  // Function to clear form data
  const clear = () => {
    setPlayerData({ name: '', club: '', infoEnglish: '', infoNorwegian: '', category: '' });
    setImageFiles([]);
    setImagePreviews([]);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("selected category: ", selectedSubCategoriesByMainCategory)

    // Prepare updated player data
    const updatedPlayerData = {
      ...playerData,
      category: selectedSubCategoriesByMainCategory,
      images: existingImages.concat(imageFiles),
    };

    console.log("updatedPlayerData: ", updatedPlayerData)
    // Handle form submission
    handleSubmit(updatedPlayerData);
    handleCloseUpdatePlayer(false); // Close player update form
    clear(); // Clear form data
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      {/* Grid container for arranging form components */}
      <Grid container spacing={2}>
        {/* Grid item for player data fields */}
        <Grid item xs={12} sm={6}>
          <PlayerData playerData={playerData} handleInputChange={handleInputChange} />
        </Grid>
        {/* Grid item for category selection */}
        <Grid item xs={12} sm={6}>
          <CategorySelect
            selectedCategory={selectedCategory}
            showExistingCategories={player ? true :false}
            handleSelectChange={handleSelectChange}
            menuData={menuData}
            handleSubCategoryChange={(e) => handleSubCategoryChange(e, selectedCategory)}
            selectedSubCategoryValues={selectedSubCategories}
          />
        </Grid>
        {/* Grid item for image upload */}
        <Grid item xs={12} sm={6}>
          <ImageUpload
            imagePreviews={imagePreviews}
            showExistingImages={player ? true : false}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            existingImages={existingImages}
          />
        </Grid>
        {/* Grid item for form submission */}
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" type="submit">
            {player ? "Update Player" : "Add Player"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddUpdatePlayerForm;
