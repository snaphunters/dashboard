import axios from "axios";
const instance = axios.create({
  baseURL: process.env.SNAPI_HEROKU_BACKEND_URL || "https://snaphunt-demo-backend"
});
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
