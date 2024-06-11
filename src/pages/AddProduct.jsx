import React, { useState } from "react";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { CloudUpload } from "@mui/icons-material/";
import NavBar from "../Components/NavBar";
import axios from "axios";
import Cookies from "js-cookie";

function AddProduct() {
  const token = Cookies.get("_auth");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    image: "",
  });

  const [open, setOpen] = useState(false); // Snackbar state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const extractImageData = (dataUrl) => {
    const [header, base64Data] = dataUrl.split(",");
    const match = header.match(/data:image\/([a-zA-Z]*);base64/);
    if (match) {
      const imageType = match[1];
      return { imageType, base64Data };
    } else {
      throw new Error("Invalid data URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, category, stockQuantity, image } =
      formData;

    const { imageType, base64Data } = extractImageData(image);

    try {
      console.log(token);
      const response = await axios.post(
        "http://localhost:3000/api/v1/Admin/addProduct",
        {
          name,
          description,
          price,
          category,
          stockQuantity,
          imageType,
          base64Data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (response.status === 201) {
        setOpen(true);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stockQuantity: "",
          image: "",
        }); // Open Snackbar on success
      }
      console.log(response.data);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <NavBar index={1} />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <TextField
            label="Stock Quantity"
            variant="outlined"
            fullWidth
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <CloudUpload />
            </label>
            <Typography variant="body1">
              {formData.image ? "Photo selected" : "Select photo"}
            </Typography>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Selected"
              className="w-32 h-32 object-contain mt-4"
            />
          )}
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddProduct;
