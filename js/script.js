const movies = [
    {"title": "Avengers: Age of Ultron", "youtubeId": "tmeOjFno6Do"},
    {"title": "Guardians of The Galaxy", "youtubeId": "d96cjJhvlMA"},
    {"title": "Inception", "youtubeId": "YoHD9XEInc0"},
    {"title": "Ralph Breaks the Internet", "youtubeId": "KHQhp2cGZtE"},
    {"title": "Annihilation", "youtubeId": "ufaDurSCKOk"},
    {"title": "Interstellar", "youtubeId": "zSWdZVtXT7E"}
]

let youtube = {
    getIdFromUrl: function (videoIdOrUrl) {
        if (videoIdOrUrl.indexOf('http') === 0) {
            return videoIdOrUrl.split('v=')[1];
        } else {
            return videoIdOrUrl
        }
    },

    generateThumbnailUrl: function (videoIdOrUrl) {
        return 'https://i3.ytimg.com/vi/' + youtube.getIdFromUrl(videoIdOrUrl) + '/default.jpg';
    },

    generateEmbedUrl: function (videoIdOrUrl) {
        return 'https://www.youtube.com/embed/' + youtube.getIdFromUrl(videoIdOrUrl);
    }
};

function showMovies() {
    movies.forEach(function(movie) 
    {
        fetch('https://www.omdbapi.com/?t=' + movie.title + '&apikey=789d41d5')
            .then(response => {
                return response.json();
            })
            .then(data =>
                {
                    console.log(data);
                    const section = document.createElement('section');
                    const article = document.createElement('article');
                    const images = document.createElement('img');
                    const imgDiv = document.createElement('div');
                    imgDiv.setAttribute('class', 'imgDiv');

                    images.src = data.Poster;
                    images.alt = data.Title + 'poster';

                    const h2 = document.createElement('h2');
                    h2.innerHTML = data.Title;

                    const button = document.createElement('button');
                    button.innerHTML = 'Watch trailer';
                   
                    button.setAttribute('onClick', "buttonClick("+movie.youtubeId+")");



                    const expandDiv = document.createElement('div');
                    expandDiv.setAttribute('class', 'description');
                    const h3 = document.createElement('h3');
                    const plot = document.createElement('p');
                    const div2 = document.createElement('div');
                    div2.setAttribute('class', 'rating');
                    const ratingSource = document.createElement('p');
                    const ratingValue = document.createElement('p');
                    const age = document.createElement('p');

                    h3.innerHTML = 'Description'
                    plot.innerHTML = data.Plot;
                    ratingSource.innerHTML = data.Ratings[0].Source;
                    ratingValue.innerHTML = data.Ratings[0].Value;

                    let today = new Date();
                    let currentYear = today.getFullYear();

                    age.innerHTML = currentYear - data.Year + " years old";

                    const videoDiv = document.createElement('div');
                    videoDiv.setAttribute('class', 'videoModal')
                    const video = document.createElement('iframe');
                    video.src = youtube.generateEmbedUrl(movie.youtubeId);
                    videoDiv.setAttribute('class','videoModal');
                    videoDiv.setAttribute('id',movie.youtubeId);

                    // Append elements to the body
                    section.appendChild(article);
                    article.appendChild(imgDiv);
                    imgDiv.appendChild(images);
                    article.appendChild(h2);
                    article.appendChild(button);
                    article.appendChild(expandDiv);
                    expandDiv.appendChild(h3);
                    expandDiv.appendChild(plot);
                    expandDiv.appendChild(div2);
                    div2.appendChild(ratingSource);
                    div2.appendChild(ratingValue);
                    expandDiv.appendChild(age);
                    article.appendChild(videoDiv);
                    videoDiv.appendChild(video);

                    document.getElementById('body').appendChild(section);
                })
            
    }
    
    ) 
}
showMovies();

function buttonClick(clickId) {
   //document.getElementById('"'+clickId+'"').style.display = 'flex';
clickId.style.display = "flex";
}

