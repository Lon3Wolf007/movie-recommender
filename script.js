const apiKey = "c9c9f1e5de0d2bc91c057433ad88afda"; // replace with your key

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  const resultsDiv = document.getElementById("movieResults");
  const recTitle = document.getElementById("recTitle");
  const recDiv = document.getElementById("recommendations");
  resultsDiv.innerHTML = "";
  recTitle.innerHTML = "";
  recDiv.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
    `;
    div.onclick = () => getRecommendations(movie.id);
    resultsDiv.appendChild(div);
  });
}

async function getRecommendations(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`);
  const data = await response.json();
  const recDiv = document.getElementById("recommendations");
  const recTitle = document.getElementById("recTitle");

  recTitle.innerHTML = "Recommended Movies:";
  recDiv.innerHTML = "";

  data.results.slice(0, 6).forEach((movie) => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
    `;
    recDiv.appendChild(div);
  });
}
