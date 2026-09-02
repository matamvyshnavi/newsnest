export default async function handler(req, res) {
  const query = req.query.query || "India";
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      status: "error",
      message: "NEWS_API_KEY is not configured",
    });
  }

  try {
    const url =
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}` +
      `&language=en&sortBy=publishedAt&pageSize=30&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch news",
    });
  }
}