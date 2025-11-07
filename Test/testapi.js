const testUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=9b7c3ede447b14c5e0e9d33a137ddac9&page=2'

fetch(testUrl)
    .then(res => res.json())
    .then(data => {
        console.log("----- Dữ liệu lấy được từ API -----")
        console.log(data)
    })