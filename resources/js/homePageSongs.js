var populairList = document.querySelector('#populairSongs .songList');

document.addEventListener("DOMContentLoaded", function () {
    fetchData()
});

async function fetchData() {
    console.log('works', populairList);
    
    let response = await fetch(`http://localhost:3000/standard`);
    var data = await response.json();
    console.log(data);
    
}