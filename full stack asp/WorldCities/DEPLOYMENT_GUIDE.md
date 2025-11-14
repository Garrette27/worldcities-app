# Deployment Guide for WorldCities Full-Stack Application

## Overview
This is a full-stack application with:
- **Backend**: ASP.NET Core 8.0 Web API with SQL Server
- **Frontend**: Angular 17 SPA
- **Authentication**: JWT Bearer tokens with ASP.NET Core Identity
- **Database**: SQL Server (Entity Framework Core)

---

## What You CAN Do in Cursor

✅ **Local Development & Testing**
- Run the application locally for development
- Build the Angular frontend
- Build the ASP.NET Core backend
- Test the application locally
- Configure environment settings
- Prepare deployment artifacts

❌ **What You CANNOT Do in Cursor**
- Deploy directly to cloud services (requires cloud accounts)
- Set up production databases (requires database hosting)
- Configure production SSL certificates
- Set up CI/CD pipelines (requires external services)

---

## Deployment Options

### Option 1: Azure App Service (Recommended for .NET)

**Best for**: Easy deployment, integrated with .NET ecosystem

**Steps**:
1. **Prerequisites**:
   - Azure account (free tier available)
   - Azure SQL Database or SQL Server on Azure VM
   - Azure App Service plan

2. **In Cursor - Prepare for Deployment**:
   ```bash
   # Build Angular for production
   cd worldcities.client
   npm install
   npm run build -- --configuration production
   
   # Build .NET application
   cd ../WorldCities.Server
   dotnet publish -c Release -o ./publish
   ```

3. **Deploy Backend**:
   - Create Azure App Service (Windows or Linux)
   - Deploy via Visual Studio, VS Code, or Azure CLI
   - Configure connection string in Azure App Settings
   - Set JWT settings as environment variables

4. **Deploy Frontend**:
   - Option A: Serve from same App Service (static files)
   - Option B: Deploy to Azure Static Web Apps (separate service)

5. **Database**:
   - Create Azure SQL Database
   - Update connection string
   - Run migrations: `dotnet ef database update`

**Cost**: ~$13-55/month (depending on tier)

---

### Option 2: Docker + Cloud Platform

**Best for**: Containerized deployment, platform flexibility

**Steps**:
1. **In Cursor - Create Dockerfile**:
   - Multi-stage build for Angular + ASP.NET Core
   - Configure for production

2. **Deploy Options**:
   - **Azure Container Apps**
   - **AWS ECS/Fargate**
   - **Google Cloud Run**
   - **DigitalOcean App Platform**
   - **Heroku** (with Docker support)

3. **Database**: Use managed database service (Azure SQL, AWS RDS, etc.)

**Cost**: Varies by platform (~$5-50/month)

---

### Option 3: AWS (EC2 or Elastic Beanstalk)

**Best for**: Full control, AWS ecosystem

**Steps**:
1. **EC2 Approach**:
   - Launch Windows Server or Linux EC2 instance
   - Install .NET 8.0 runtime
   - Install SQL Server Express or use RDS
   - Deploy application
   - Configure IIS (Windows) or Nginx (Linux)

2. **Elastic Beanstalk Approach**:
   - Package application
   - Deploy via EB CLI or console
   - Configure environment variables

**Cost**: ~$15-100/month (depending on instance size)

---

### Option 4: Self-Hosted (VPS)

**Best for**: Full control, cost-effective

**Platforms**: DigitalOcean, Linode, Vultr, Hetzner

**Steps**:
1. **Server Setup**:
   - Install .NET 8.0 runtime
   - Install SQL Server Express or PostgreSQL (with EF Core changes)
   - Install Nginx (reverse proxy)
   - Configure SSL (Let's Encrypt)

2. **Deploy**:
   - Build application in Cursor
   - Copy files to server
   - Configure as Windows Service or systemd service

**Cost**: ~$5-20/month

---

### Option 5: GitHub Pages + Separate API Hosting

**Best for**: Free frontend hosting, separate backend

**Steps**:
1. **Frontend**: Deploy Angular build to GitHub Pages
2. **Backend**: Deploy API to any of the above options
3. **CORS**: Configure CORS in backend for frontend domain

**Cost**: Free (GitHub Pages) + backend hosting cost

---

## Pre-Deployment Checklist (Do in Cursor)

### 1. Environment Configuration
- [ ] Update `appsettings.json` with production settings
- [ ] Set secure JWT SecurityKey (use secrets manager)
- [ ] Update database connection string
- [ ] Configure CORS for production domain
- [ ] Update Angular environment files with production API URL

### 2. Build Configuration
- [ ] Build Angular with production configuration
- [ ] Ensure Angular build output goes to `wwwroot` or appropriate folder
- [ ] Build .NET with Release configuration
- [ ] Test production build locally

### 3. Security
- [ ] Change default JWT SecurityKey
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Configure proper CORS policies
- [ ] Review authentication settings

### 4. Database
- [ ] Create production database
- [ ] Run migrations: `dotnet ef database update`
- [ ] Seed initial data if needed
- [ ] Backup strategy

---

## Quick Start: Local Production Build Test

Run these commands in Cursor to test production build locally:

```bash
# Navigate to Angular project
cd "angular/full stack asp/WorldCities/worldcities.client"

# Install dependencies
npm install

# Build for production
npm run build -- --configuration production

# Navigate to backend
cd ../WorldCities.Server

# Publish .NET application
dotnet publish -c Release -o ./publish

# Run published application
cd publish
dotnet WorldCities.Server.dll
```

---

## 🆓 FREE Deployment Options (Fast & Easy)

### ⭐ Option A: Railway.app (BEST FREE OPTION - Recommended!)

**Why it's great**: 
- ✅ **Completely FREE** for small projects (500 hours/month free)
- ✅ **Super fast deployment** (connects to GitHub, auto-deploys)
- ✅ **Includes PostgreSQL database** (free tier)
- ✅ **Automatic SSL certificates**
- ✅ **No credit card required** for free tier
- ✅ **Can host both frontend and backend**

**Steps**:
1. **Sign up**: Go to [railway.app](https://railway.app) (free, no credit card)
2. **Connect GitHub**: Link your repository
3. **Deploy Backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects .NET projects
   - Add PostgreSQL database (free tier included)
   - Set environment variables (connection string, JWT settings)
4. **Deploy Frontend**:
   - Add another service for Angular
   - Or deploy separately to Netlify/Vercel (see Option B)

**Time to deploy**: ~10-15 minutes

**Limitations**: 
- Free tier: 500 hours/month (enough for personal projects)
- Sleeps after inactivity (wakes up on first request)
- 512MB RAM limit

---

### ⭐ Option B: Separate Frontend + Backend (100% FREE Forever)

**Frontend**: GitHub Pages, Netlify, or Vercel (all free forever)
**Backend**: Railway, Render, or Fly.io (free tiers)

**Why it's great**:
- ✅ **100% free** with no time limits
- ✅ **Fast deployment** (GitHub integration)
- ✅ **Better performance** (CDN for frontend)

**Steps**:

#### Frontend (Choose one - all free):

**1. Netlify** (Easiest):
   - Sign up at [netlify.com](https://netlify.com) (free)
   - Connect GitHub repo
   - Build command: `cd worldcities.client && npm install && npm run build -- --configuration production`
   - Publish directory: `worldcities.client/dist/worldcities.client`
   - Done! Gets free HTTPS and custom domain

**2. Vercel** (Also easy):
   - Sign up at [vercel.com](https://vercel.com) (free)
   - Import GitHub repo
   - Configure build settings (same as Netlify)
   - Auto-deploys on every push

**3. GitHub Pages**:
   - Push Angular build to `gh-pages` branch
   - Enable GitHub Pages in repo settings
   - Free forever, but no server-side features

#### Backend (Choose one):

**1. Railway.app** (Recommended - see Option A above)

**2. Render.com**:
   - Sign up at [render.com](https://render.com) (free)
   - New Web Service → Connect GitHub
   - Build: `dotnet publish -c Release -o ./publish`
   - Start: `cd publish && dotnet WorldCities.Server.dll`
   - Add PostgreSQL database (free tier)
   - **Free tier**: Sleeps after 15 min inactivity, but free forever

**3. Fly.io**:
   - Sign up at [fly.io](https://fly.io) (free)
   - Generous free tier (3 shared VMs)
   - Need Dockerfile (I can create this for you)

**Time to deploy**: ~15-20 minutes total

---

### ⭐ Option C: Azure App Service + Azure SQL Database (RECOMMENDED for SQL Server!)

**Why it's great**:
- ✅ **Free tier** (F1 - Shared) for App Service
- ✅ **Azure SQL Database FREE for 12 months** (perfect for SQL Server!)
- ✅ **Native .NET support**
- ✅ **Easy deployment** from Visual Studio
- ✅ **No code changes needed** (uses SQL Server)
- ✅ **$200 free credit** for 30 days

**Limitations**:
- ⚠️ **App Service F1**: Very limited (1GB storage, 60 minutes/day compute, sleeps after inactivity)
- ⚠️ **SQL Database Free**: 32MB max size, limited DTUs
- ⚠️ **Requires credit card** (but won't charge on free tier)
- ⚠️ **After 12 months**: SQL Database costs ~$5/month (Basic tier)

**Steps**:
1. Create Azure account (free $200 credit for 30 days)
2. Create **Azure SQL Database** (Free tier - 12 months)
3. Create **App Service** (F1 free tier)
4. Deploy via Visual Studio or GitHub Actions
5. Deploy frontend to Netlify (free forever)

**📚 See `AZURE_DEPLOYMENT_GUIDE.md` for complete step-by-step instructions!**

---

### ⚠️ Important: Database Consideration

Your app uses **SQL Server**, but many free tiers offer **PostgreSQL**. 

**Options**:
1. **Keep SQL Server**: Use Azure SQL Database free tier (12 months) or SQL Server Express
2. **Switch to PostgreSQL**: I can help you modify the code (easy change, just connection string + EF Core provider)

**Free PostgreSQL options**:
- **Supabase** (free tier, 500MB database)
- **Railway** (included with free tier)
- **Render** (included with free tier)
- **Neon.tech** (free tier, serverless PostgreSQL)

---

## Recommended Approach for Beginners

### 🆓 **For FREE Deployment with SQL Server** (Recommended):

1. **Use Azure App Service + Azure SQL Database** (Option C above) ⭐
   - **FREE for 12 months** (SQL Database)
   - **No code changes needed** (uses SQL Server)
   - **Native .NET support**
   - **Easy Visual Studio deployment**
   - **Perfect if you want to keep SQL Server!**
   - See `AZURE_DEPLOYMENT_GUIDE.md` for complete guide

2. **OR use Railway.app** (Option A)
   - Fastest setup (~10 minutes)
   - Includes PostgreSQL database (requires code change)
   - No credit card needed
   - Auto-deploys from GitHub

3. **OR use Separate Frontend/Backend** (Option B)
   - Frontend: Netlify (free forever)
   - Backend: Railway or Render (free tier with PostgreSQL)
   - More reliable, better performance

### 💰 **If you have budget later**:

1. **Start with Azure App Service** (easiest for .NET)
   - Free tier available for testing
   - Integrated deployment tools
   - Good documentation

2. **Use Azure SQL Database** (managed database)
   - No server management
   - Automatic backups
   - Scales easily

3. **Deploy via Visual Studio or Azure CLI**
   - Right-click publish in Visual Studio
   - Or use `az webapp deploy` command

---

## Next Steps

1. **Choose your deployment platform**
2. **I can help you**:
   - Create Dockerfile for containerized deployment
   - Configure production appsettings
   - Set up build scripts
   - Create deployment documentation
   - Configure CORS and environment variables

3. **You'll need to do** (outside Cursor):
   - Create cloud account
   - Set up database hosting
   - Configure domain/SSL
   - Set up CI/CD (optional)

---

## Questions?

Let me know which deployment option you'd like to pursue, and I can help you:
- Create necessary configuration files
- Set up build scripts
- Configure production settings
- Create Dockerfiles
- Prepare deployment packages

