import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhQGdhbWFpbC5jb20iLCJpYXQiOjE2NjU3NjIxMTMsImV4cCI6MzMzMTg4NDIyNiwiaXNzIjoiRVJQIn0.Dg-Fyrn6POmUJpBD8tyxywXVpYldkvx_mGyxrM54EUo",
  }
});