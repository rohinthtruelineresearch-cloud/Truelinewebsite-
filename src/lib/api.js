const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

async function handleJsonResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage =
      payload?.error ||
      payload?.message ||
      `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

export async function getHealthStatus(signal) {
  const response = await fetch(`${API_BASE_URL}/api/health`, { signal });
  return handleJsonResponse(response);
}

export async function submitContact(formData) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handleJsonResponse(response);
}

export { API_BASE_URL };
