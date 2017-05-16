$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val()
        getMovies(searchText);
        e.preventDefault();


    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-3 overlay">
                    <div class="center text well">
                    <img src="${movie.Poster}"
                        <h5 class="center title">${movie.Title}</h5>
                     <!--   <a onclick="movieSelected('${movie.imdbID}')">Movie Details</a> -->
                        <button class="btn draw-border" onclick="movieSelected('${movie.imdbID}')" >Movie Details</button>
                    </div>
                </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });

}


function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
        <div class="row">
          <div class="col-4">
            <img src="${movie.Poster}" class="thumbnail img img-responsive">
          </div>
          <div class="col-8">
            <h2 class="text">${movie.Title}</h2>
            <ul class="text">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>Run Time:</strong> ${movie.Runtime}</li>

            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well text">
            <h3 class="text center">Plot</h3>
            <p class="text center">${movie.Plot}</p>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn-two blue large center">View IMDB</a>
            <a href="index.html" class="btn-two blue large center">Go Back To Search</a>
          </div>
        </div>
      `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}