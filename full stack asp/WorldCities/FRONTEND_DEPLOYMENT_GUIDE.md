# 🚀 Frontend Deployment Guide: Netlify vs Vercel

## 📊 Quick Comparison

| Feature | Netlify | Vercel |
|---------|---------|--------|
| **Free Tier** | ✅ 100GB bandwidth/month | ✅ 100GB bandwidth/month |
| **Build Time** | 300 min/month | 6000 min/month (better!) |
| **Ease of Use** | ⭐⭐⭐⭐⭐ Very Easy | ⭐⭐⭐⭐⭐ Very Easy |
| **Angular Support** | ✅ Excellent | ✅ Excellent |
| **Auto-Deploy** | ✅ Yes (GitHub) | ✅ Yes (GitHub) |
| **Custom Domain** | ✅ Free | ✅ Free |
| **Environment Variables** | ✅ Yes | ✅ Yes |
| **Performance** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent (Edge Network) |
| **Documentation** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **Best For** | General use, simplicity | Performance, Next.js ecosystem |

## 🏆 Recommendation

**For Your Angular App: Both are excellent!**

- **Choose Netlify if**: You want simplicity, great free tier, easy setup
- **Choose Vercel if**: You want better performance, more build minutes, or plan to use Next.js later

**My Recommendation**: **Vercel** (slightly better for Angular, more build minutes, excellent performance)

---

## 🚀 Option 1: Deploy to Netlify (Recommended for Simplicity)

### Why Netlify?
- ✅ Super easy setup (5 minutes)
- ✅ Great free tier
- ✅ Excellent Angular support
- ✅ Free custom domain
- ✅ Automatic HTTPS

### Step-by-Step Guide

#### Step 1: Sign Up
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" → Choose "GitHub" (easiest)
3. Authorize Netlify to access your GitHub

#### Step 2: Prepare Your Code
Make sure your code is pushed to GitHub first!

#### Step 3: Create New Site
1. In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Select **GitHub** (or GitLab/Bitbucket)
3. Authorize if needed
4. Select your repository
5. Select the branch (usually `main` or `master`)

#### Step 4: Configure Build Settings
Netlify will try to auto-detect, but configure manually:

**Build settings:**
- **Base directory**: `worldcities.client`
- **Build command**: `npm install && npm run build -- --configuration production`
- **Publish directory**: `worldcities.client/dist/worldcities.client`

#### Step 5: Set Environment Variables
1. Click **"Show advanced"** or go to **Site settings** → **Environment variables**
2. Click **"Add variable"**
3. Add:
   - **Key**: `API_URL`
   - **Value**: `https://worldcities-api-[yourname].azurewebsites.net` (your Azure backend URL)
4. Click **"Save"**

#### Step 6: Update Angular Environment File
Update `worldcities.client/src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  baseUrl: (typeof process !== 'undefined' && process.env && process.env['API_URL']) 
    ? process.env['API_URL'] + '/' 
    : 'https://worldcities-api-[yourname].azurewebsites.net/'
};
```

**Note**: Netlify injects environment variables at build time, so we need to handle it properly.

#### Step 7: Create netlify.toml (Optional but Recommended)
Create `worldcities.client/netlify.toml`:

```toml
[build]
  base = "worldcities.client"
  publish = "worldcities.client/dist/worldcities.client"
  command = "npm install && npm run build -- --configuration production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures Angular routing works correctly (SPA redirect).

#### Step 8: Deploy!
1. Click **"Deploy site"**
2. Wait 2-5 minutes for build
3. Your site will be live at: `https://random-name-12345.netlify.app`

#### Step 9: Update CORS in Azure
1. Go to Azure Portal → Your App Service
2. Configuration → Application settings
3. Update `CORS__AllowedOrigins__0` with your Netlify URL:
   - Value: `https://your-app-name.netlify.app`
4. Save and restart app

#### Step 10: Custom Domain (Optional)
1. In Netlify → Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS setup instructions

---

## 🚀 Option 2: Deploy to Vercel (Recommended for Performance)

### Why Vercel?
- ✅ Excellent performance (Edge Network)
- ✅ More build minutes (6000 vs 300)
- ✅ Better for Angular apps
- ✅ Great developer experience
- ✅ Free custom domain

### Step-by-Step Guide

#### Step 1: Sign Up
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" → Choose "GitHub"
3. Authorize Vercel to access your GitHub

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select your repository

#### Step 3: Configure Project
Vercel will auto-detect Angular, but configure:

**Framework Preset**: Angular (auto-detected)

**Root Directory**: 
- Click "Edit" next to Root Directory
- Set to: `worldcities.client`

**Build Settings**:
- **Build Command**: `npm run build -- --configuration production`
- **Output Directory**: `dist/worldcities.client`
- **Install Command**: `npm install`

#### Step 4: Set Environment Variables
1. In project settings, go to **"Environment Variables"**
2. Click **"Add"**
3. Add:
   - **Key**: `API_URL`
   - **Value**: `https://worldcities-api-[yourname].azurewebsites.net` (your Azure backend URL)
   - **Environment**: Production (and Preview if you want)
4. Click **"Save"**

#### Step 5: Update Angular Environment File
Update `worldcities.client/src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  baseUrl: (typeof process !== 'undefined' && process.env && process.env['API_URL']) 
    ? process.env['API_URL'] + '/' 
    : 'https://worldcities-api-[yourname].azurewebsites.net/'
};
```

#### Step 6: Create vercel.json (Optional but Recommended)
Create `worldcities.client/vercel.json`:

```json
{
  "buildCommand": "npm run build -- --configuration production",
  "outputDirectory": "dist/worldcities.client",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures Angular routing works correctly.

#### Step 7: Deploy!
1. Click **"Deploy"**
2. Wait 2-5 minutes for build
3. Your site will be live at: `https://your-app-name.vercel.app`

#### Step 8: Update CORS in Azure
1. Go to Azure Portal → Your App Service
2. Configuration → Application settings
3. Update `CORS__AllowedOrigins__0` with your Vercel URL:
   - Value: `https://your-app-name.vercel.app`
4. Save and restart app

#### Step 9: Custom Domain (Optional)
1. In Vercel → Project Settings → Domains
2. Add your domain
3. Follow DNS setup instructions

---

## 🔧 Fixing Environment Variables Issue

Both Netlify and Vercel inject environment variables at **build time**, but Angular's `process.env` might not work directly. Here's a better solution:

### Option A: Use Angular's fileReplacements (Recommended)

1. **Create production environment file**:
   Create `worldcities.client/src/environments/environment.production.ts`:

```typescript
// This will be replaced at build time
declare const process: any;

export const environment = {
  production: true,
  baseUrl: process.env['API_URL'] 
    ? process.env['API_URL'] + '/' 
    : 'https://worldcities-api-[yourname].azurewebsites.net/'
};
```

2. **Update angular.json** to use this file:
   (Already configured, but verify in `angular.json` line 64-68)

### Option B: Use Build-Time Replacement Script

Create `worldcities.client/replace-env.js`:

```javascript
const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, 'src', 'environments', 'environment.production.ts');
let content = fs.readFileSync(envFile, 'utf8');

const apiUrl = process.env.API_URL || 'https://worldcities-api-[yourname].azurewebsites.net';
content = content.replace(/baseUrl:.*/, `baseUrl: '${apiUrl}/'`);

fs.writeFileSync(envFile, content);
```

Then update build command:
- Netlify: `npm install && node replace-env.js && npm run build -- --configuration production`
- Vercel: `npm install && node replace-env.js && npm run build -- --configuration production`

### Option C: Hardcode for Now (Simplest)

Just update `environment.ts` with your Azure URL directly:

```typescript
export const environment = {
  production: true,
  baseUrl: 'https://worldcities-api-[yourname].azurewebsites.net/'
};
```

**This works fine** - you can update it later if needed.

---

## 📋 Deployment Checklist

### Before Deploying:
- [ ] Code pushed to GitHub
- [ ] Angular environment file updated with API URL
- [ ] Backend deployed to Azure
- [ ] Backend URL noted down

### During Deployment:
- [ ] Build settings configured correctly
- [ ] Environment variables set (API_URL)
- [ ] Build completes successfully
- [ ] Site is accessible

### After Deployment:
- [ ] Test frontend loads
- [ ] Test API calls work
- [ ] Update CORS in Azure with frontend URL
- [ ] Test login/authentication
- [ ] Test CRUD operations

---

## 🐛 Troubleshooting

### Build Fails
- **Check build logs** in Netlify/Vercel dashboard
- **Verify Node version** (Angular 17 needs Node 18+)
- **Check build command** is correct
- **Verify paths** are correct

### API Calls Fail (CORS Error)
- **Check CORS settings** in Azure App Service
- **Verify frontend URL** matches exactly (including https://)
- **Restart Azure App Service** after CORS changes

### Routing Doesn't Work (404 on refresh)
- **Add redirect rules** (netlify.toml or vercel.json)
- **Verify output directory** is correct
- **Check Angular routing** configuration

### Environment Variables Not Working
- **Use Option C** (hardcode) for now
- **Or implement** build-time replacement
- **Check** environment variable names match exactly

---

## 🎯 My Recommendation

**For your first deployment**: **Start with Netlify** (easier, simpler)

**For better performance**: **Use Vercel** (faster, more build minutes)

Both are excellent choices! You can always switch later.

---

## 📚 Next Steps

1. **Choose** Netlify or Vercel
2. **Follow** the step-by-step guide above
3. **Update** CORS in Azure
4. **Test** your deployed app
5. **Enjoy** your live application! 🎉

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section
2. Review build logs in Netlify/Vercel
3. Verify all settings match the guide
4. Let me know and I can help!

