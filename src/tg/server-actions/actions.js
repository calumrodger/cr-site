'use server';

export async function getYouTubeComments(videoId) {
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?maxResults=5000&part=snippet&part=replies&videoId=' + videoId + '&key=' + process.env.YOUTUBE_API_KEY)
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
       
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
       
        return res.json()
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

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
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