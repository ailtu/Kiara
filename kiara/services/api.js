const API_URL = "http://localhost:3333"

export async function api(path, options = {}) {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
        ? `Bearer ${token}`
        : "",
    },
    ...options,
  })

  return response.json()
}