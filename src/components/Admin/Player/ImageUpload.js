//ImageUpload.js
import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function ImageUpload({
  imagePreviews,
  handleImageChange,
  handleRemoveImage,
  existingImages,
}) {
  useEffect(() => {
    console.log("exist: ", existingImages);
  }, [existingImages]);

  return (
    <div>
      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      {existingImages?.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Existing ${index + 1}`}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <IconButton onClick={() => handleRemoveImage(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      {imagePreviews?.map((preview, index) => (
        <div key={index}>
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <IconButton onClick={() => handleRemoveImage(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default ImageUpload;
