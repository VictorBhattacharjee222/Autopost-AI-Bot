export async function askQuestion(username: string, question: string) {
  const response = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, question }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server error response:", errorText);
    throw new Error("Failed to fetch answer");
  }

  const data = await response.json();
  return data.answer;
}
