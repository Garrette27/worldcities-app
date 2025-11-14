// Declare process for TypeScript (Netlify injects env vars at build time)
declare const process: any;

export const environment = {
  production: true,
  // Update this with your production API URL
  // For Azure: https://worldcities-api-garrette.azurewebsites.net/
  // Netlify will replace API_URL at build time if set as environment variable
  baseUrl: (typeof process !== 'undefined' && process.env && process.env['API_URL']) 
    ? process.env['API_URL'] + '/' 
    : "https://worldcities-api-garrette.azurewebsites.net/" // Your Azure backend URL
};
