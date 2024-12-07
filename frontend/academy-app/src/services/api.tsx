import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const endpoints = {
  LOGIN: "/auth/login",
  FORMS: "/forms",
  USER: "/users",
  GROUP: "/groups",
  USER_GROUP: "/user_groups",
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;