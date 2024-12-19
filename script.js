const filmsList = document.getElementById("films");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const description = document.getElementById("description");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const tickets = document.getElementById("tickets");
const buyTicketButton = document.getElementById("buy-ticket");

let currentMovie = null;


fetch("http://localhost:3000/films")
  .then((response) => response.json())
  .then((films) => {
    filmsList.innerHTML = ""; 
    films.forEach((film) => {
      const filmItem = document.createElement("li");
      filmItem.textContent = film.title;
      filmItem.classList.add("film-item");
      filmItem.addEventListener("click", () => loadMovieDetails(film));
      filmsList.appendChild(filmItem);
    });

    
    if (films.length > 0) {
      loadMovieDetails(films[0]);
    }
  });
 // movie details
function loadMovieDetails(movie) {
  currentMovie = movie;
  poster.src = movie.poster;
  title.textContent = movie.title;
  description.textContent = movie.description;
  runtime.textContent = movie.runtime;
  showtime.textContent = movie.showtime;
  tickets.textContent = movie.capacity - movie.tickets_sold;
  updateBuyButton();
}

// Buy Ticket buttom update
function updateBuyButton() {
  const availableTickets = currentMovie.capacity - currentMovie.tickets_sold;
  buyTicketButton.disabled = availableTickets <= 0;
  buyTicketButton.textContent = availableTickets > 0 ? "Buy Ticket" : "Sold Out";
}

// ticket purchase
buyTicketButton.addEventListener("click", () => {
  if (currentMovie.tickets_sold < currentMovie.capacity) {
    currentMovie.tickets_sold++;
    tickets.textContent = currentMovie.capacity - currentMovie.tickets_sold;
    updateBuyButton();
  }
});
