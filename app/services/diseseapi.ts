import axios from "axios";

const diseaseAPI = axios.create({
  baseURL: "https://smart-agritech-assistance.onrender.com/predict",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default diseaseAPI;