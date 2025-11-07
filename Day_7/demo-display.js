import { TMDB_API_KEY, formatDate, formatRating, getImageUrl, truncateText } from "./demo-config.js";

const loadingEl = document.getElementById('loading')
const moviesContainerEl = document.getElementById('movies-container')
const moviesGridEl = document.getElementById('movies-grid')
const errorEl = document.getElementById('error')

function showMovies(movies){
    loadingEl.style.display = 'none';
    moviesContainerEl.style.display = 'block';
    errorEl.style.display = 'none';

    const moviesHTML = movies.map(movie => `
        <div class="movie-card">
            <img 
                src="${getImageUrl(movie.poster_path, 'w300')}" 
                alt="${movie.title}"
                onerror="this.src='./assets/default-poster.png'"
            />
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-rating">⭐ ${formatRating(movie.vote_average)}/10</div>
                <div class="movie-year">${formatDate(movie.release_date)}</div>
                <div class="movie-overview">${truncateText(movie.overview, 100)}</div>
            </div>
        </div>
    `).join('');

    moviesGridEl.innerHTML = moviesHTML; 
}

function showError(message) {
    loadingEl.style.display = 'none';
    moviesContainerEl.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.innerHTML = `<p>❌ Có lỗi xảy ra: ${message}</p>`;
}

async function fetchMovies(){
    try{
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
        );

        console.log("Status: ",response.status)
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();
        console.log("Dữ liệu nhận được: ", data)

        if (!data.results || !Array.isArray(data.results)){
            throw new Error("Dữ liệu không hợp lệ")
        }

        return data.results
    }catch(error){
        throw error;
    }
}

async function initApp(){
    try{
        const movies = await fetchMovies();
        showMovies(movies);
        console.log("Chạy thành công");
    }catch(error){
        console.error("Lỗi khi tải dữ liệu:", error);
        showError(error.message);
    }
}

// Khởi chạy app khi DOM đã load
document.addEventListener('DOMContentLoaded', initApp);

export{fetchMovies, showMovies};