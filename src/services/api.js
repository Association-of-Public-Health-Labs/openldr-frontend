import axios from "axios";

const api = axios.create({
  // baseURL: "https://openldr.herokuapp.com",
  baseURL: "https://queue.openldr.org.mz",
  // baseURL: "http://localhost:4444",
});

export default api;
