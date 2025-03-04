const MAX_REQUESTS_PER_MINUTE = parseInt(process.env.REACT_APP_MAX_REQUESTS_PER_MINUTE || '1');
const requestTimestamps: number[] = [];

export const rateLimit = async (): Promise<void> => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;

  // Remove timestamps older than 1 minute
  while (requestTimestamps.length > 0 && requestTimestamps[0] < oneMinuteAgo) {
    requestTimestamps.shift();
  }

  // Check if we've exceeded the rate limit
  if (requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    const oldestRequest = requestTimestamps[0];
    const timeToWait = 60000 - (now - oldestRequest);
    
    if (timeToWait > 0) {
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(timeToWait / 1000)} seconds.`);
    }
  }

  // Add current timestamp
  requestTimestamps.push(now);
}; 