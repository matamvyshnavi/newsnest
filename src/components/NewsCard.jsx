function NewsCard({ news, onReadMore }) {
  return (
    <article className="news-card">

      {news.urlToImage ? (
        <img
          src={news.urlToImage}
          alt={news.title}
        />
      ) : (
        <div className="no-image">
          No Image
        </div>
      )}

      <div className="news-content">

        <span className="category">
          {news.source?.name || "News"}
        </span>

        <h2>
          {news.title}
        </h2>

        <p>
          {news.description ||
            "No description available."}
        </p>

        <div className="card-bottom">

          <span>
            {news.publishedAt
              ? new Date(
                  news.publishedAt
                ).toLocaleDateString()
              : ""}
          </span>

          <button
            onClick={() => onReadMore(news)}
          >
            Read More →
          </button>

        </div>

      </div>

    </article>
  );
}

export default NewsCard;