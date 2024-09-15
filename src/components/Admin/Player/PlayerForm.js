//PlayerForm.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CategorySelect from "./CategorySelect";
import PlayerData from "./PlayerData";
import ImageUpload from "./ImageUpload";

function AddUpdatePlayerForm({
  player,
  handleSubmit,
  handleCloseUpdatePlayer,
}) {
  const [playerData, setPlayerData] = useState({
    name: "",
    club: "",
    infoEnglish: "",
    infoNorwegian: "",
    category: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const category = useSelector((state) => state.menus);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSubCategoriesByCategory, setSelectedSubCategoriesByCategory] =
    useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [menuData, setMenuData] = useState({
    categories: [],
    subCategories: {},
  });

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
      console.log("main: ", player.category.main);
      console.log("sub: ", player.category.sub);
      setPlayerData({
        name: player.name || "",
        club: player.club || "",
        infoEnglish: player.infoEnglish || "",
        infoNorwegian: player.infoNorwegian || "",
        category: player.category || [],
      });

      setExistingImages(player.images || []);

      const updatedSelectedSubCategories = [];
      player.category.forEach(({ main, sub }) => {
        updatedSelectedSubCategories.push({
          main: main,
          sub: sub || "",
        });
      });

      const updatedSelectedSubCategoriesByCategory =
        updatedSelectedSubCategories.reduce((acc, { main, sub }) => {
          if (!acc[main]) acc[main] = [];
          acc[main].push(sub);
          return acc;
        }, {});

      setSelectedSubCategoriesByCategory(
        updatedSelectedSubCategoriesByCategory
      );
      setSelectedSubCategories(
        Object.values(updatedSelectedSubCategoriesByCategory).flat()
      );
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

    const selectedSubCategoriesForNewCategory =
      selectedSubCategoriesByCategory[newSelectedCategory] || [];

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
      fileInput.value = "";
    }
  };

  const handleSubCategoryChange = (event) => {
    const { value } = event.target;
    const newSubCategories = value;

    if (typeof selectedCategory === "string") {
      setSelectedSubCategoriesByCategory((prev) => ({
        ...prev,
        [selectedCategory]: newSubCategories,
      }));
    }

    setSelectedSubCategories(newSubCategories);
  };

  const mergeCategories = (existingCategories, newCategories) => {
    const existingSet = new Set(
      existingCategories.map((cat) => JSON.stringify(cat))
    );

    newCategories.forEach((cat) => existingSet.add(JSON.stringify(cat)));

    return Array.from(existingSet).map((cat) => JSON.parse(cat));
  };

  const clear = () => {
    setPlayerData({
      name: "",
      club: "",
      infoEnglish: "",
      infoNorwegian: "",
      category: "",
    });
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const flattenedCategories = Object.entries(
      selectedSubCategoriesByCategory
    ).flatMap(([main, subCategories]) =>
      subCategories.map((sub) => ({ main, sub }))
    );

    const mergedCategories = mergeCategories(
      playerData.category,
      flattenedCategories
    );

    const updatedPlayerData = {
      ...playerData,
      category: mergedCategories,
      images: existingImages.concat(imageFiles),
    };

    console.log("updatedPlayerData: ", updatedPlayerData);

    handleSubmit(updatedPlayerData);
    handleCloseUpdatePlayer(false);
    clear();
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <PlayerData
            playerData={playerData}
            handleInputChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategorySelect
            selectedCategory={selectedCategory}
            showExistingCategories={!!player}
            handleSelectChange={handleSelectChange}
            menuData={menuData}
            handleSubCategoryChange={handleSubCategoryChange}
            selectedSubCategoryValues={selectedSubCategories}
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
