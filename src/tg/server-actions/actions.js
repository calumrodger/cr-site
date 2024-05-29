'use server';

export async function getYouTubeComments(videoId) {
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?maxResults=5000&part=snippet&part=replies&videoId=' + videoId + '&key=' + process.env.YOUTUBE_API_KEY)
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
       
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          // throw new Error('Failed to fetch data')
          return 'error';
        }
       
        return res.json()
}

export async function getWordFromDictionary(word) {
  const res = await fetch('https://wordsapiv1.p.rapidapi.com/words/' + word,
    {headers: {"x-rapidapi-key": process.env.WORDS_API_KEY, "x-rapidapi-host": "wordsapiv1.p.rapidapi.com", "Accept": "application/json"}}
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getLoadOfWordsFromDictionary(word) {
  const res = await fetch('https://wordsapiv1.p.mashape.com/words?lettersMax=4',
    {headers: {"x-rapidapi-key": process.env.WORDS_API_KEY, "x-rapidapi-host": "wordsapiv1.p.rapidapi.com", "Accept": "application/json"}}
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}



export async function getFilmData(filmTitle) {
  const res = await fetch('https://www.omdbapi.com/?t=' + filmTitle + '&plot=full&apikey=' + process.env.OMDB_API_KEY)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getGuardianData(searchKey) {
  const res = await fetch('https://content.guardianapis.com/search?q=' + searchKey + '&api-key=' + process.env.GUARDIAN_API_KEY)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getWeatherData(location) {
  var date = new Date();
  var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
  const res = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + location + '/' + dateString + '?key=' + process.env.VISUAL_CROSSING_API_TOKEN)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

// export async function getDictionary() {
//   const file = '../../../public/word-lists/word-lists.json';
//   let reader = new FileReader();
//   if (!file) {
//       return;
//   }
//   reader.readAsText(file)
//   reader.onload = function() {
//       console.log(JSON.parse(reader.result)[0]);
//   };
// }