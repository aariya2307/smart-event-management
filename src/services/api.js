import axios from "axios";

// backend controllers are rooted at the server's root (no "/api" prefix)
// this value can later be pulled from an environment variable if needed
const API = axios.create({
    baseURL: "http://localhost:8080"
});

export default API;