import { loadingBeforeSubmit, submittedFormLoading } from "./forms";

export async function searchSongs() {
    loadingBeforeSubmit();

    await fetchSearchResult();
    
    submittedFormLoading();
}

function getSearchParams() {
    var param = document.getElementById('searchBar').value;
    if (!param) return;
    return param;
}

async function fetchSearchResult() {
    var param = getSearchParams();

    const {
        statusCode,
        headers,
        trailers,
        body
    } = await fetch(`http://localhost:3000/search?q=${param}`)
      
      console.log('response received', statusCode)
      console.log('headers', headers)
      
      for await (const data of body) { console.log('data', data) }
      
      console.log('trailers', trailers)
}