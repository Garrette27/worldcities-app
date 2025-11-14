export const environment = {
  production: true,
  // Update this with your production API URL after deployment
  // For Azure: https://worldcities-api-[yourname].azurewebsites.net/
  // For Railway: https://your-app.railway.app/
  // For Render: https://your-app.onrender.com/
  // Note: Environment variables from Netlify/Vercel are injected at build time
  // If using Netlify/Vercel, set API_URL environment variable there
  baseUrl: (typeof process !== 'undefined' && process.env && process.env['API_URL']) 
    ? process.env['API_URL'] + '/' 
    : "https://localhost:40443/" // Default - UPDATE THIS with your Azure backend URL
};
