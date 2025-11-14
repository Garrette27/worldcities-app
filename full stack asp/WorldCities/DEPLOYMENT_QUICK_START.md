# 🚀 Quick Start: Free Deployment Guide

## Fastest Option: Railway.app (10 minutes)

### Step 1: Prepare Your Code

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy to Railway

1. **Sign up**: Go to [railway.app](https://railway.app) → Sign up with GitHub (free, no credit card)

2. **Create Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Database**:
   - Click "+ New" → "Database" → "Add PostgreSQL"
   - Railway will create a free PostgreSQL database
   - Copy the connection string (DATABASE_URL)

4. **Configure Backend Service**:
   - Railway should auto-detect your .NET project
   - If not, click "+ New" → "GitHub Repo" → Select your repo
   - Set root directory: `WorldCities.Server`

5. **Set Environment Variables**:
   Click on your service → "Variables" tab → Add:
   ```
   ConnectionStrings__DefaultConnection=<PostgreSQL connection string from step 3>
   JwtSettings__SecurityKey=<Generate a random 32+ character string>
   JwtSettings__Issuer=WorldCities
   JwtSettings__Audience=https://your-app.railway.app
   ASPNETCORE_ENVIRONMENT=Production
   PORT=8080
   ```

6. **Deploy**:
   - Railway will auto-deploy
   - Wait for build to complete (~5 minutes)
   - Your API will be live at: `https://your-app.railway.app`

### Step 3: Deploy Frontend to Netlify (5 minutes)

1. **Sign up**: Go to [netlify.com](https://netlify.com) → Sign up with GitHub (free)

2. **New Site from Git**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub → Select your repository

3. **Build Settings**:
   - **Base directory**: `worldcities.client`
   - **Build command**: `npm install && npm run build -- --configuration production`
   - **Publish directory**: `worldcities.client/dist/worldcities.client`

4. **Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `API_URL` = `https://your-app.railway.app` (your Railway API URL)

5. **Update Angular Environment**:
   - Update `worldcities.client/src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: process.env['API_URL'] || 'https://your-app.railway.app'
   };
   ```

6. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy (~3 minutes)
   - Your frontend will be live at: `https://your-app.netlify.app`

### Step 4: Update CORS in Backend

In Railway, add this environment variable:
```
ASPNETCORE_CORS__AllowedOrigins__0=https://your-app.netlify.app
```

Then update `Program.cs` to use CORS (I can help with this).

---

## Alternative: Render.com (15 minutes)

### Backend on Render:

1. **Sign up**: [render.com](https://render.com) → Sign up (free)

2. **New Web Service**:
   - Connect GitHub → Select repo
   - **Name**: `worldcities-api`
   - **Root Directory**: `WorldCities.Server`
   - **Environment**: `.NET Core`
   - **Build Command**: `dotnet publish -c Release -o ./publish`
   - **Start Command**: `cd publish && dotnet WorldCities.Server.dll`

3. **Add PostgreSQL Database**:
   - New → PostgreSQL
   - Name: `worldcities-db`
   - Plan: Free
   - Copy internal database URL

4. **Environment Variables**:
   ```
   ConnectionStrings__DefaultConnection=<PostgreSQL URL>
   JwtSettings__SecurityKey=<random string>
   JwtSettings__Issuer=WorldCities
   JwtSettings__Audience=https://worldcities-api.onrender.com
   ASPNETCORE_ENVIRONMENT=Production
   ```

5. **Deploy**: Render will auto-deploy

### Frontend on Netlify: (Same as Railway steps above)

---

## ⚠️ Important: Database Migration

Your app currently uses **SQL Server**, but free tiers use **PostgreSQL**.

### Option 1: Keep SQL Server (Limited Free Options)
- Azure SQL Database (free for 12 months, requires credit card)
- SQL Server Express (free, but need hosting)

### Option 2: Switch to PostgreSQL (Recommended for Free Tier)

I can help you switch to PostgreSQL - it's a simple change:
1. Change EF Core provider from SQL Server to PostgreSQL
2. Update connection string format
3. Run migrations

**Would you like me to help you switch to PostgreSQL?** It takes 5 minutes and opens up all free hosting options.

---

## Post-Deployment Checklist

- [ ] Test API endpoints (Swagger should be available)
- [ ] Test frontend login/registration
- [ ] Verify database connection
- [ ] Check CORS configuration
- [ ] Test all CRUD operations
- [ ] Set up custom domain (optional, free on Netlify)

---

## Need Help?

Let me know which platform you choose, and I can:
1. Help switch to PostgreSQL (if needed)
2. Configure CORS properly
3. Set up environment variables
4. Fix any deployment issues
5. Create build scripts

