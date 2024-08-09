import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CategorySelect from './CategorySelect';
import PlayerData from './PlayerData';
import ImageUpload from './ImageUpload';

function AddUpdatePlayerForm({ player, handleSubmit, handleCloseUpdatePlayer }) {
  const [playerData, setPlayerData] = useState({ name: '', club: '', infoEnglish: '', infoNorwegian: '', category: [] });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const category = useSelector((state) => state.menus);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoriesByCategory, setSelectedSubCategoriesByCategory] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [menuData, setMenuData] = useState({
    categories: [],
    subCategories: {},
  });

  // Fetch and update menu data when 'category' state changes
  useEffect(() => {
    const categories = category || [];
    const subCategories = {};

    categories.forEach((cat) => {
      subCategories[cat.mainMenu] = cat.subMenu;
    });

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
      // Debug output
      console.log("player: ", player);

      // Sätt playerData
      setPlayerData({
        name: player.name || '',
        club: player.club || '',
        infoEnglish: player.infoEnglish || '',
        infoNorwegian: player.infoNorwegian || '',
        category: player.category || [],  // Den nya strukturen för kategorier
      });

      // Hantera bilder
      setExistingImages(player.images || []);

      // Omvandla `player.category` till en struktur som är lättare att använda
      const updatedSelectedSubCategoriesByCategory = player.category.reduce((acc, { main, sub }) => {
        if (!acc[main]) acc[main] = [];
        if (sub) acc[main].push(sub); // Lägg till sub om den är definierad
        return acc;
      }, {});

      const firstCategory = Object.keys(updatedSelectedSubCategoriesByCategory)[0] || '';

      setSelectedCategory(firstCategory);
      setSelectedSubCategoriesByCategory(updatedSelectedSubCategoriesByCategory);
      setSelectedSubCategories(updatedSelectedSubCategoriesByCategory[firstCategory] || []);
    } else {
      // Om ingen spelare är vald, rensa selekterade kategorier och subkategorier
      setSelectedCategory('');
      setSelectedSubCategoriesByCategory({});
      setSelectedSubCategories([]);
    }
  }, [player]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);

    // Kontrollera om det finns valda subkategorier för den nya huvudkategorin
    const selectedSubCategoriesForNewCategory = selectedSubCategoriesByCategory[newSelectedCategory] || [];

    // Sätt de valda subkategorierna för den nya huvudkategorin
    setSelectedSubCategories(selectedSubCategoriesForNewCategory);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImageFiles([...imageFiles, ...files]);
    setImagePreviews([...imagePreviews, ...previews]);
    setPlayerData({ ...playerData, images: [...imageFiles, ...files] });
  };

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

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubCategoryChange = (event) => {
    const { value } = event.target;
    const newSubCategories = value;

    if (typeof selectedCategory === 'string') {
      setSelectedSubCategoriesByCategory(prev => ({
        ...prev,
        [selectedCategory]: newSubCategories,
      }));
    }

    setSelectedSubCategories(newSubCategories);
  };

  const clear = () => {
    setPlayerData({ name: '', club: '', infoEnglish: '', infoNorwegian: '', category: [] });
    setImageFiles([]);
    setImagePreviews([]);
    setSelectedCategory('');
    setSelectedSubCategories([]);
    setSelectedSubCategoriesByCategory({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const flattenedCategories = Object.keys(selectedSubCategoriesByCategory).reduce((acc, main) => {
      return acc.concat(selectedSubCategoriesByCategory[main].map(sub => ({ main, sub })));
    }, []);

    const updatedPlayerData = {
      ...playerData,
      category: flattenedCategories, // Skicka som array av objekt
      images: existingImages.concat(imageFiles),
    };

    console.log("updatedPlayerData: ", updatedPlayerData);

    handleSubmit(updatedPlayerData);
    handleCloseUpdatePlayer(false); // Stäng formuläret
    clear(); // Rensa formulärdata
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PlayerData playerData={playerData} handleInputChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategorySelect
            selectedCategory={selectedCategory}
            handleSelectChange={handleSelectChange}
            menuData={menuData}
            selectedSubCategoryValues={selectedSubCategories}
            handleSubCategoryChange={handleSubCategoryChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ImageUpload
            imagePreviews={imagePreviews}
            showExistingImages={player ? true : false}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            existingImages={existingImages}
          />
        </Grid>
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