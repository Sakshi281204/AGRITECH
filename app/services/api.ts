import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.31.252:8000/api/crops", // your backend IP
});

export default API;

// ✅ API functions

export const getTalukas = async () => {
  const res = await API.get("/talukas");
  return res.data;
};

export const getVillages = async (taluka: string) => {
  const res = await API.get(`/villages/${taluka}`);
  return res.data;
};

export const getCrops = async (
  taluka: string,
  village: string,
  season: string
) => {
  const res = await API.get(
    `/recommend?taluka=${taluka}&village=${village}&season=${season}`
  );
  return res.data;
};