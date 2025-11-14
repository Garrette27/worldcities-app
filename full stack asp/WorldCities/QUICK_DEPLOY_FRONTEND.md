# ⚡ Quick Frontend Deployment (5 Minutes)

## 🎯 Which Should You Choose?

**Netlify** = Easier, simpler, great for beginners
**Vercel** = Better performance, more build minutes, excellent for Angular

**My Recommendation**: **Start with Netlify** (easier), or **Vercel** (better performance)

Both are FREE and excellent! You can switch anytime.

---

## 🚀 Netlify Deployment (5 Minutes)

### Step 1: Sign Up & Connect
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository

### Step 2: Configure Build
**Settings:**
- **Base directory**: `worldcities.client`
- **Build command**: `npm install && npm run build -- --configuration production`
- **Publish directory**: `worldcities.client/dist/worldcities.client`

**OR** - I've created `netlify.toml` for you, so Netlify will auto-detect these settings!

### Step 3: Set Environment Variable
1. Click "Show advanced" or go to Site settings → Environment variables
2. Add:
   - **Key**: `API_URL`
   - **Value**: `https://worldcities-api-[yourname].azurewebsites.net` (your Azure backend URL)

### Step 4: Update Environment File
Update `worldcities.client/src/environments/environment.ts` with your Azure backend URL:

```typescript
baseUrl: "https://worldcities-api-[yourname].azurewebsites.net/"
```

### Step 5: Deploy!
Click "Deploy site" → Wait 2-5 minutes → Done! 🎉

Your site: `https://random-name-12345.netlify.app`

### Step 6: Update CORS in Azure
1. Azure Portal → App Service → Configuration
2. Update `CORS__AllowedOrigins__0` = `https://your-app.netlify.app`
3. Save

---

## 🚀 Vercel Deployment (5 Minutes)

### Step 1: Sign Up & Connect
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository

### Step 2: Configure Project
**Settings:**
- **Root Directory**: `worldcities.client` (click "Edit" to set)
- **Framework Preset**: Angular (auto-detected)
- **Build Command**: `npm run build -- --configuration production`
- **Output Directory**: `dist/worldcities.client`

**OR** - I've created `vercel.json` for you, so Vercel will auto-detect these settings!

### Step 3: Set Environment Variable
1. In project settings → Environment Variables
2. Add:
   - **Key**: `API_URL`
   - **Value**: `https://worldcities-api-[yourname].azurewebsites.net` (your Azure backend URL)
   - **Environment**: Production

### Step 4: Update Environment File
Update `worldcities.client/src/environments/environment.ts` with your Azure backend URL:

```typescript
baseUrl: "https://worldcities-api-[yourname].azurewebsites.net/"
```

### Step 5: Deploy!
Click "Deploy" → Wait 2-5 minutes → Done! 🎉

Your site: `https://your-app-name.vercel.app`

### Step 6: Update CORS in Azure
1. Azure Portal → App Service → Configuration
2. Update `CORS__AllowedOrigins__0` = `https://your-app.vercel.app`
3. Save

---

## ✅ That's It!

Your frontend is now live! 

**Next**: Test your app, make sure API calls work, and enjoy! 🎉

---

## 📚 Full Guide

See `FRONTEND_DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.

