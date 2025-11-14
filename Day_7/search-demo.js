// Import API key và utilities
import { TMDB_API_KEY, formatDate, formatRating, getImageUrl, truncateText } from "./demo-config.js";

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const loadingEl = document.getElementById('loading');
const resultsSectionEl = document.getElementById('resultsSection');
const resultsTitleEl = document.getElementById('resultsTitle');
const resultsCountEl = document.getElementById('resultsCount');
const moviesGridEl = document.getElementById('moviesGrid');
const noResultsEl = document.getElementById('noResults');
const errorEl = document.getElementById('error');

// State
let currentQuery = '';
let currentPage = 1;
let totalPages = 1;

// Function hiển thị loading
function showLoading() {
    loadingEl.style.display = 'block';
    resultsSectionEl.style.display = 'none';
    noResultsEl.style.display = 'none';
    errorEl.style.display = 'none';
}

// Function hiển thị lỗi
function showError(message) {
    loadingEl.style.display = 'none';
    resultsSectionEl.style.display = 'none';
    noResultsEl.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.innerHTML = `<p>❌ ${message}</p>`;
}

// Function hiển thị không có kết quả
function showNoResults() {
    loadingEl.style.display = 'none';
    resultsSectionEl.style.display = 'none';
    noResultsEl.style.display = 'block';
    errorEl.style.display = 'none';
}

// Function hiển thị kết quả
function showResults(movies, query, totalResults) {
    loadingEl.style.display = 'none';
    resultsSectionEl.style.display = 'block';
    noResultsEl.style.display = 'none';
    errorEl.style.display = 'none';
    
    // Cập nhật title và count
    resultsTitleEl.textContent = `Search results for "${query}"`;
    resultsCountEl.textContent = `Found ${totalResults} movies`;
    
    // Tạo HTML cho movies
    const moviesHTML = movies.map(movie => `
        <a href="./info.html?id=${movie.id}" class="movie-card">
            <img 
                src="${getImageUrl(movie.poster_path, 'w300')}" 
                alt="${movie.title}"
                onerror="this.src='./assets/default-poster.png'"
            />
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-rating">⭐ ${formatRating(movie.vote_average)}/10</div>
                <div class="movie-year">${formatDate(movie.release_date)}</div>
            </div>
        </a>
    `).join('');
    
    moviesGridEl.innerHTML = moviesHTML;
}

// Function tìm kiếm movies
async function searchMovies(query, page = 1) {
    try {
        console.log(`🔍 Searching for: "${query}", page: ${page}`);
        
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_API_KEY}&page=${page}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📊 Search results:', data);
        
        return {
            movies: data.results || [],
            totalResults: data.total_results || 0,
            totalPages: data.total_pages || 1,
            currentPage: data.page || 1
        };
        
    } catch (error) {
        console.error('❌ Search error:', error);
        throw error;
    }
}

// Function xử lý search
async function handleSearch(query) {
    if (!query.trim()) {
        console.log('⚠️ Empty search query');
        return;
    }
    
    try {
        // Hiển thị loading
        showLoading();
        
        // Lưu query hiện tại
        currentQuery = query.trim();
        currentPage = 1;
        
        // Tìm kiếm
        const { movies, totalResults, totalPages: totalPagesResult } = await searchMovies(currentQuery, currentPage);
        
        // Cập nhật state
        totalPages = totalPagesResult;
        
        // Hiển thị kết quả
        if (movies.length === 0) {
            showNoResults();
        } else {
            showResults(movies, currentQuery, totalResults);
        }
        
    } catch (error) {
        console.error('💥 Search failed:', error);
        showError(error.message);
    }
}

// Function search từ suggestion
window.searchMovie = function(query) {
    searchInput.value = query;
    handleSearch(query);
};

// Event listeners
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    handleSearch(query);
});

// Search khi nhấn Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        handleSearch(query);
    }
});

// Auto-search khi gõ (debounced)
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // Clear timeout cũ
    clearTimeout(searchTimeout);
    
    // Nếu query rỗng, ẩn results
    if (!query) {
        resultsSectionEl.style.display = 'none';
        noResultsEl.style.display = 'none';
        errorEl.style.display = 'none';
        return;
    }
    
    // Debounce search (chờ 500ms sau khi user ngừng gõ)
    searchTimeout = setTimeout(() => {
        handleSearch(query);
    }, 500);
});

// Load search từ URL parameters
function loadSearchFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        searchInput.value = query;
        handleSearch(query);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Search demo initialized');
    loadSearchFromURL();
});

// Export functions để sử dụng ở nơi khác
export { searchMovies, handleSearch };
