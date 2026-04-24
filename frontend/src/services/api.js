const BASE_URL = import.meta.env.VITE_API_URL;

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    return data;
  }

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response;
}

export async function analyzeMethod(method, text) {
  const response = await fetch(`${BASE_URL}/analyze/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return handleResponse(response);
}

export async function compareModels(text) {
  const response = await fetch(`${BASE_URL}/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return handleResponse(response);
}

export async function fetchHistory() {
  const response = await fetch(`${BASE_URL}/history`);
  return handleResponse(response);
}

export async function fetchSummary() {
  const response = await fetch(`${BASE_URL}/reports/summary`);
  return handleResponse(response);
}

export function downloadReport() {
  window.open(`${BASE_URL}/reports/download`, "_blank");
}