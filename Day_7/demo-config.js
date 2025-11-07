// Demo config - chỉ chứa API key và các function cần thiết cho demo phim
export const TMDB_API_KEY = "9b7c3ede447b14c5e0e9d33a137ddac9";

// Các function utility cho demo
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear();
};

export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : 'N/A';
};

export const getImageUrl = (path, size = 'w300') => {
  if (!path) return './assets/default-poster.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};