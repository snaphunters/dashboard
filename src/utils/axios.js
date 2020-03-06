import axios from "axios";
const instance = axios.create({
  baseURL: "https://snaphunt-demo-backend.herokuapp.com"
});
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
