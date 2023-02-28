//api key : AIzaSyAsqYQeYNNxIS_gybPNkwi2uYWNVK-o0Wg
const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAsqYQeYNNxIS_gybPNkwi2uYWNVK-o0Wg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http ="https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    //console.log(data)
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err))

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        //console.log(video_data) 
        makeVideoCard(video_data);
    })
}

//Creating card for videos
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
        <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="" >
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>
    `;
}

//search bar
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let serachLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click',()=>{
    if(searchInput.value.length){
        location.href = serachLink + searchInput.value;
    }
})

function enterKeyPress(event){
    //console.log(event.keyCode)
    if(event.keyCode == 13){
        location.href = serachLink + searchInput.value;
    }
}

//function to create a video
function create_video(){
    //console.log("create video icon clicked")
    location.href = "https://studio.youtube.com/channel/UCcv7B0qnaAZswpqFWFJ5yVw/videos/upload?d=ud&filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D";
}

//show_hide navbar
    function show_hide_nav() {
        var sidebar = document.getElementsByClassName('side-bar');
        console.log("Toggle icon clicked")
        // if (sidebar.style.display === "none") {
        //   sidebar.style.display = "block";
        // } else {
        //   sidebar.style.display = "none";
        // }
      }

//to get subscribers
// let subc_http = "https://www.googleapis.com/youtube/v3/subscriptions?";
// fetch(subc_http + new URLSearchParams({
//     key: api_key,
//     part: 'subscriberSnippet',
//     filters: 'id',
//     maxResults: 10
// }))
// .then(res => res.json())
// .then(data3 => console.log(data3))