const API_KEY = 'c9c9f1e5de0d2bc91c057433ad88afda'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsSection = document.getElementById("results");

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) searchMovies(query);
  }
});

searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim();
  if (query) searchMovies(query);
});

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    resultsSection.innerHTML = "";

    if (data.results.length === 0) {
      resultsSection.innerHTML = `<p>No results found for "${query}".</p>`;
      return;
    }

    data.results.forEach(movie => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <img src="${movie.poster_path ? IMG_BASE + movie.poster_path : 'https://via.placeholder.com/180x270?text=No+Image'}" alt="${movie.title}">
        <div class="info">
          <div class="title">${movie.title}</div>
          <div class="year">${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</div>
        </div>
      `;

      resultsSection.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsSection.innerHTML = `<p>Something went wrong. Try again later.</p>`;
  }
}
