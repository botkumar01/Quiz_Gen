const API_BASE = "http://localhost:8000"; // Flask backend

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json(); // returns { text: "..." }
};

export const askAI = async (text) => {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });

  if (!res.ok) throw new Error("AI request failed");
  return res.json(); // returns { text: "..." }
};
