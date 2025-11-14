# ⚡ Azure Quick Start (5-Minute Checklist)

## ✅ Pre-Deployment Checklist

- [ ] Azure account created (azure.microsoft.com)
- [ ] Code pushed to GitHub
- [ ] Azure CLI installed (optional)

---

## 🚀 Quick Deployment Steps

### 1. Create Azure SQL Database (5 min)
```
Azure Portal → Create Resource → SQL Database
- Name: worldcities-db
- Server: Create new (save credentials!)
- Pricing: Free tier
- Firewall: Allow Azure services
- Copy connection string
```

### 2. Create App Service (3 min)
```
Azure Portal → Create Resource → Web App
- Name: worldcities-api-[yourname]
- Runtime: .NET 8
- Plan: Free (F1)
- Same resource group as database
```

### 3. Configure App Service (2 min)
```
App Service → Configuration → Connection strings
- Add: DefaultConnection = [your SQL connection string]

App Service → Configuration → Application settings
- JwtSettings__SecurityKey = [random 32+ chars]
- JwtSettings__Issuer = WorldCities
- JwtSettings__Audience = https://your-app.azurewebsites.net
- ASPNETCORE_ENVIRONMENT = Production
```

### 4. Deploy Backend (5 min)
**Option A - Visual Studio:**
```
Right-click WorldCities.Server → Publish
→ Azure App Service → Select your app → Publish
```

**Option B - GitHub:**
```
App Service → Deployment Center
→ GitHub → Select repo → Save
(Auto-deploys on push)
```

### 5. Run Migrations (2 min)
```bash
# Update appsettings.Development.json temporarily with Azure SQL connection string
dotnet ef database update
```

### 6. Deploy Frontend (5 min)
**Netlify:**
```
netlify.com → New Site → GitHub
- Base: worldcities.client
- Build: npm install && npm run build -- --configuration production
- Publish: worldcities.client/dist/worldcities.client
- Env: API_URL = https://your-app.azurewebsites.net
```

### 7. Update CORS (1 min)
```
App Service → Configuration
- CORS__AllowedOrigins__0 = https://your-app.netlify.app
- Save
```

---

## 🎯 Your URLs

- **Backend**: `https://worldcities-api-[yourname].azurewebsites.net`
- **Swagger**: `https://worldcities-api-[yourname].azurewebsites.net/swagger`
- **Frontend**: `https://your-app.netlify.app`

---

## 🔧 Common Issues

**Database connection fails:**
- Check firewall rules (allow Azure services)
- Verify connection string format
- Check credentials

**App won't start:**
- Check Log stream in App Service
- Verify all environment variables set
- Check connection string name matches

**CORS errors:**
- Verify CORS settings match frontend URL exactly
- Restart app after CORS changes

---

## 📚 Full Guide

See `AZURE_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 💰 Cost

- **Free for 12 months** (SQL Database)
- **Free tier** (App Service F1)
- **Free forever** (Netlify frontend)

**Total: $0/month for 12 months!**

