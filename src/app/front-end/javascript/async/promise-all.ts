/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Define the type for the API response, which we expect from JSONPlaceholder API
interface ApiResponse {
  status: string;
  value?: any; // If fulfilled, we store the result
  reason?: string; // If rejected, we store the error message
}

// Dummy API URLs for testing
const api1: Promise<Response> = fetch(
  'https://jsonplaceholder.typicode.com/posts'
); // Success
const api2: Promise<Response> = fetch(
  'https://jsonplaceholder.typicode.com/comments'
); // Success
const api3: Promise<Response> = fetch(
  'https://jsonplaceholder.typicode.com/users'
); // Success
const api4: Promise<Response> = fetch(
  'https://jsonplaceholder.typicode.com/non-existent-endpoint'
); // Failure
const api5: Promise<Response> = fetch(
  'https://jsonplaceholder.typicode.com/albums'
); // Success

/*
  This code demonstrates two different ways to handle multiple asynchronous API calls using the `fetch()` function:
  
  1. **Using `Promise.all()`**:
     - This approach initiates all the network requests concurrently and waits for all promises to resolve. If any of the promises fail (reject), the entire operation fails immediately, and no further results are returned. It provides a quick way to execute multiple promises but doesn't handle errors gracefully.
  
  2. **Using `myAllSettledWithGrace()`** (Custom Implementation):
     - This custom function handles multiple promises and ensures that all promises are settled (either fulfilled or rejected). Even if one or more of the API calls fail, the other successful calls still return their results. Each promise’s outcome is captured, and the final result contains the status and the respective value or error for each request. This approach is particularly useful when you want to continue processing all promises even if some fail.
  
  The code uses the `jsonplaceholder.typicode.com` API for testing, making five API requests with a mix of success and failure cases, demonstrating both approaches to handling multiple promises in JavaScript (or TypeScript).
*/

// Approach 1: Using Promise.all()

Promise.all([api1, api2, api3, api4, api5])
  .then((responses: Response[]) => {
    return Promise.all(responses.map((res: Response) => res.json())); // Parsing JSON from responses
  })
  .then((results: any[]) => {
    console.log('Promise.all() Results:', results); // Will not get here if any promise fails
  })
  .catch((error: Error) => {
    console.error('Promise.all() Error:', error); // This will be triggered if any promise fails
  });

// Approach 2: Using Custom myAllSettledWithGrace()

// Custom function that handles success and rejection
function myAllSettledWithGrace(
  promises: Promise<Response>[]
): Promise<ApiResponse[]> {
  const handledPromises: Promise<ApiResponse>[] = promises.map((p) =>
    p
      .then((response: Response) => response.json()) // If resolved, parse JSON
      .then((value: any) => ({ status: 'fulfilled', value }))
      .catch((reason: string) => ({ status: 'rejected', reason }))
  );

  return Promise.all(handledPromises); // Using Promise.all to handle all promises
}

myAllSettledWithGrace([api1, api2, api3, api4, api5])
  .then((results: ApiResponse[]) => {
    console.log('myAllSettledWithGrace() Results:', results);
  })
  .catch((error: Error) => {
    console.error('Error:', error); // This should never happen as we catch all errors inside the promises
  });
