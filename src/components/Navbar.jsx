function Navbar({ setCategory, setSearch }) {
  return (
    <nav className="navbar">

      <div className="logo">
        📰 <span>NewsNest</span>
      </div>

      <div className="nav-links">

        <button onClick={() => setCategory("home")}>
          Home
        </button>

        <button onClick={() => setCategory("india")}>
          India
        </button>

        <button onClick={() => setCategory("world")}>
          World
        </button>

        <button onClick={() => setCategory("sports")}>
          Sports
        </button>

        <button onClick={() => setCategory("movies")}>
          Movies
        </button>

        <button onClick={() => setCategory("games")}>
          Games
        </button>

        <input
          type="text"
          placeholder="🔍 Search news..."
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

    </nav>
  );
}

export default Navbar;