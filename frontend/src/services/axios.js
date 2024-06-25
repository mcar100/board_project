import axios from "axios";

const callAxios = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true,
});

export default callAxios;
