import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";
import "./App.css";

function App() {
  const [category, setCategory] = useState("home");
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    setLoading(true);

    try {
      let query = "India";

      if (category === "india") {
        query = "India";
      } else if (category === "world") {
        query = "world";
      } else if (category === "sports") {
        query = "sports";
      } else if (category === "movies") {
        query = "movies";
      } else if (category === "games") {
        query = "gaming";
      }

      const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=30&apiKey=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok") {
        setNews(data.articles || []);
      } else {
        console.error("API Error:", data.message);
        setNews([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter((item) => {
    const title = item.title || "";
    const description = item.description || "";

    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase())
    );
  });

  /* ================================
     FULL ARTICLE
  ================================= */

  if (selectedNews) {
    return (
      <div className="app">

        <Navbar
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
        />

        <main className="article-page">

          <button
            className="back-button"
            onClick={() => setSelectedNews(null)}
          >
            ← Back to News
          </button>

          <article className="full-article">

            {selectedNews.urlToImage && (
              <img
                src={selectedNews.urlToImage}
                alt={selectedNews.title}
                className="article-image"
              />
            )}

            <div className="article-content">

              <span className="category">
                {selectedNews.source?.name || "News"}
              </span>

              <h1>{selectedNews.title}</h1>

              <div className="article-meta">

                <span>
                  {selectedNews.author || "NewsNest"}
                </span>

                <span>
                  {selectedNews.publishedAt
                    ? new Date(
                        selectedNews.publishedAt
                      ).toLocaleDateString()
                    : ""}
                </span>

              </div>

              <p className="article-description">
                {selectedNews.description ||
                  "No description available."}
              </p>

              <p className="article-text">
                {selectedNews.content ||
                  selectedNews.description ||
                  "Article content is not available."}
              </p>

              {selectedNews.url && (
                <a
                  href={selectedNews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="original-link"
                >
                  Read Full Article ↗
                </a>
              )}

            </div>

          </article>

        </main>

      </div>
    );
  }

  /* ================================
     NEWS HOME
  ================================= */

  return (
    <div className="app">

      <Navbar
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <main className="main-content">

        <h1>
          {category === "home"
            ? "Latest News"
            : `${category.charAt(0).toUpperCase()}${category.slice(1)} News`}
        </h1>

        {loading ? (

          <div className="loading">
            Loading latest news...
          </div>

        ) : filteredNews.length > 0 ? (

          <div className="news-grid">

            {filteredNews.map((item, index) => (

              <NewsCard
                key={item.url || index}
                news={item}
                onReadMore={setSelectedNews}
              />

            ))}

          </div>

        ) : (

          <div className="no-news">

            <h2>No news found 🔎</h2>

            <p>
              Try another category or search.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default App;