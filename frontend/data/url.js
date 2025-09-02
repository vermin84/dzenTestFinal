export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://dzen-backend-production-7de7.up.railway.app";

// потом в createAsyncThunk или fetch

