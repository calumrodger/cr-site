import { NextResponse } from "next/server";
 
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
import Replicate from "replicate";
 
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });
 
// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.fixedWindow(5, "1440 m"),
// });
 
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
 
export async function POST(request) {
//   const identifier = "api-route";
//   const result = await ratelimit.limit(identifier);
 
//   if (!result.success) {
//     return NextResponse.json("No generations remaining.", {
//       status: 429,
//       headers: {
//       },
//     });
//   }
try {
  const { prompt } = await request.json();
    const output = await replicate.run(
      // This is the ID of the replicate model you are running
      "anthropic/claude-3.5-haiku",
      {
        input: {
          prompt: prompt,
          // ... other model parameters
        },
      },
    );
 
    return NextResponse.json(output, {headers: {}});
  } catch (error) {
    console.log(error);
    return 'error';
  }
}