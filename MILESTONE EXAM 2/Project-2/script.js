const apiKey = '11f8b6ee';


document.getElementById('searchButton').addEventListener('click', searchMovie);


function searchMovie(event) {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (searchInput === '') {
    return;
  }
  
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchInput)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        const movies = data.Search;
        fetchMovieDetails(movies);
      } else {
        displayErrorMessage('Movies not found.');
      }
    })
    .catch(error => {
      displayErrorMessage('An error occurred. Please try again later.');
    });
}

// removes search box text, button, searchdiv, heading,  after hitting search button 
const searchBox = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchDiv = document.getElementById("search");
const heading = document.getElementById("heading");
const endSearch = document.getElementById("cross");

searchButton.addEventListener("click", (event) => {
  if (searchBox.value == "") {
    event.preventDefault();
  }
  
});


function hideSearch() {
  searchBox.value = "";
  searchDiv.style.display = "none",
  heading.textContent = "Search Results",
  heading.style.border = "solid #ffffff 2px";
  endSearch.style.display = "block"

}

searchButton.addEventListener("click", hideSearch);


function fetchMovieDetails(movies) {
  const movieDetailsElement = document.getElementById('movieDetails');
  movieDetailsElement.innerHTML = '';

  const promises = movies.map(movie => {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          displayMovieDetails(data);
        } else {
          displayErrorMessage(`Movie '${movie.Title}' details not found.`);
        }
      })
      .catch(error => {
        displayErrorMessage(`An error occurred while fetching movie '${movie.Title}' details.`);
      });
  });

  Promise.all(promises)
    .then(() => {
      console.log('All movies fetched successfully.');
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
}

function displayMovieDetails(movie) {
  const movieDetailsElement = document.getElementById('movieDetails');
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  movieElement.innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" alt="Movie Poster">
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    <button>Watch Now</button>
    `;
    // <p><strong>Plot:</strong> ${movie.Plot}</p> 

  movieDetailsElement.appendChild(movieElement);
}

function displayErrorMessage(message) {
  const movieDetailsElement = document.getElementById('movieDetails');
  const errorMessageElement = document.createElement('p');
  errorMessageElement.classList.add('error-message');
  errorMessageElement.textContent = message;

  movieDetailsElement.appendChild(errorMessageElement);
}