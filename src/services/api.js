import axios from "axios";

const api = axios.create({
  baseURL: "https://openldr.herokuapp.com"
  // baseURL: "http://localhost:4444"
});

export default api;
