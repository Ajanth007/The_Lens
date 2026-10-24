import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// BACKEND: every call below goes to {API_URL}/authors/me/...
// withCredentials sends your existing login cookie.
const client = axios.create({
  baseURL: `${API_URL}/me`,
  withCredentials: true,
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export class ApiError extends Error {
  constructor(status, message, cancelled = false) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.cancelled = cancelled;
  }
}

function toApiError(err) {
  if (axios.isCancel(err)) return new ApiError(0, "Request cancelled.", true);
  if (!err.response) {
    return new ApiError(
      0,
      err.code === "ECONNABORTED"
        ? "The request took too long. Please try again."
        : "Can't reach the server. Check your connection and try again."
    );
  }
  const { status, data } = err.response;
  const serverMessage = typeof data?.message === "string" ? data.message : "";

  if (status === 401) return new ApiError(401, "Your session has expired. Please sign in again.");
  if (status === 403) return new ApiError(403, "You don't have permission to do that.");
  if (status === 404) return new ApiError(404, "That item could not be found.");
  if (status === 400 || status === 422) {
    return new ApiError(status, serverMessage || "Please check the details and try again.");
  }
  return new ApiError(status, "Something went wrong on our side. Please try again.");
}

// BACKEND: GET /api/authors/me/articles -> { author, articles }
export async function fetchMyWorks(signal) {
  try {
    return (await client.get("/articles", { signal })).data;
  } catch (err) {
    throw toApiError(err);
  }
}


// BACKEND: GET /api/authors/me/articles/:id -> full article including content
export async function fetchMyArticle(id, signal) {
  try {
    return (await client.get(`/articles/${id}`, { signal })).data;
  } catch (err) {
    throw toApiError(err);
  }
}

// BACKEND: PUT /api/authors/me/articles/:id  body: { title, category, excerpt, content }
export async function updateMyArticle(id, payload) {
  try {
    return (await client.put(`/articles/${id}`, payload)).data;
  } catch (err) {
    throw toApiError(err);
  }
}

// BACKEND: DELETE /api/authors/me/articles/:id -> 204
export async function deleteMyArticle(id) {
  try {
    await client.delete(`/articles/${id}`);
  } catch (err) {
    throw toApiError(err);
  }
}