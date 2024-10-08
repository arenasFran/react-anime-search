import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeResults, setAnimeResults] = useState([]);

  const searchAnime = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    const api = `https://api.jikan.moe/v4/anime?q=${searchTerm}`;

    try {
      const response = await fetch(api);
      const data = await response.json();
      setAnimeResults(data.data);
    } catch (error) {
      console.log("No se han encontrado animes", error);
    }
  };

  return (
    <div className="App p-6 bg-gradient-to-r from-purple-200 to-blue-300 min-h-screen text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Buscar anime por nombre</h2>
      <form onSubmit={searchAnime} className="mb-6">
        <input
          type="text"
          placeholder="Nombre del anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700 transition duration-200"
        >
          Buscar
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {animeResults.map((anime) => (
          <div
            key={anime.mal_id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
          >
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-60 object-cover transition-transform duration-200 transform hover:scale-110"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{anime.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
