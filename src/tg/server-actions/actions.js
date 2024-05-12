'use server';

export async function getYouTubeComments(videoId) {
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?maxResults=5000&part=snippet&part=replies&videoId=' + videoId + '&key=' + process.env.NEXT_PUBLIC_YOUTUBE_API_KEY)
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
       
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
       
        return res.json()
}