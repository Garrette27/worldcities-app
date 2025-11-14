# 🚀 Azure Deployment Guide (SQL Server - Free for 12 Months)

This guide will help you deploy your WorldCities app to Azure using:
- **Azure App Service** (Free F1 tier)
- **Azure SQL Database** (Free tier for 12 months)
- **Azure Static Web Apps** or **Netlify** (for frontend - free forever)

---

## 📋 Prerequisites

1. **Azure Account** (free to create)
   - Go to [azure.microsoft.com](https://azure.microsoft.com)
   - Sign up (requires credit card, but won't charge on free tier)
   - Get $200 free credit for 30 days + free tier services

2. **GitHub Account** (for deployment)
   - Push your code to GitHub

3. **Azure CLI** (optional, but helpful)
   - Download from [aka.ms/azure-cli](https://aka.ms/azure-cli)

---

## 🎯 Step-by-Step Deployment

### Step 1: Create Azure SQL Database (Free Tier)

1. **Sign in to Azure Portal**: [portal.azure.com](https://portal.azure.com)

2. **Create SQL Database**:
   - Click "Create a resource"
   - Search for "SQL Database"
   - Click "Create"

3. **Configure Database**:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new (e.g., "WorldCities-RG")
   - **Database name**: `worldcities-db`
   - **Server**: Click "Create new"
     - **Server name**: `worldcities-server-[yourname]` (must be unique)
     - **Location**: Choose closest to you
     - **Authentication method**: SQL authentication
     - **Server admin login**: `worldcitiesadmin` (or your choice)
     - **Password**: Create strong password (save this!)
     - **Confirm password**: Same password
   - **Want to use SQL elastic pool?**: No
   - **Compute + storage**: Click "Configure database"
     - **Service tier**: **Free** (or "Basic" if Free not available)
     - **Compute tier**: Serverless (for free tier)
     - Click "Apply"
   - **Backup storage redundancy**: Locally-redundant backup storage
   - Click "Review + create" → "Create"

4. **Configure Firewall**:
   - After database is created, go to your SQL server
   - Click "Networking" → "Public network access"
   - Enable "Allow Azure services and resources to access this server"
   - Click "Add client IP" (to allow your local machine)
   - Click "Save"

5. **Get Connection String**:
   - Go to your database
   - Click "Connection strings" in left menu
   - Copy the **ADO.NET** connection string
   - Replace `{your_username}` and `{your_password}` with your actual credentials
   - Save this connection string (you'll need it)

**Example connection string**:
```
Server=tcp:worldcities-server-xxx.database.windows.net,1433;Initial Catalog=worldcities-db;Persist Security Info=False;User ID=worldcitiesadmin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

---

### Step 2: Create Azure App Service (Free Tier)

1. **Create App Service**:
   - In Azure Portal, click "Create a resource"
   - Search for "Web App"
   - Click "Create"

2. **Configure App Service**:
   - **Subscription**: Your subscription
   - **Resource Group**: Same as database (WorldCities-RG)
   - **Name**: `worldcities-api-[yourname]` (must be unique)
   - **Publish**: Code
   - **Runtime stack**: .NET 8
   - **Operating System**: Windows (or Linux)
   - **Region**: Same as database
   - **App Service Plan**: Click "Create new"
     - **Name**: `worldcities-plan`
     - **Operating System**: Same as above
     - **Region**: Same as database
     - **Pricing tier**: **Free (F1)** - Shared infrastructure
     - Click "OK"
   - Click "Review + create" → "Create"

3. **Wait for deployment** (~2-3 minutes)

---

### Step 3: Configure App Service Settings

1. **Go to your App Service** in Azure Portal

2. **Set Connection String**:
   - Click "Configuration" in left menu
   - Click "Connection strings" tab
   - Click "+ New connection string"
   - **Name**: `DefaultConnection`
   - **Value**: Paste your SQL Database connection string
   - **Type**: SQLAzure
   - Click "OK" → "Save"

3. **Set Application Settings** (Environment Variables):
   - Click "Application settings" tab
   - Click "+ New application setting" for each:

   ```
   Name: JwtSettings__SecurityKey
   Value: aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7
   
   Name: JwtSettings__Issuer
   Value: WorldCities
   
   Name: JwtSettings__Audience
   Value: https://worldcities-api-[yourname].azurewebsites.net
   
   Name: JwtSettings__ExpirationTimeInMinutes
   Value: 30
   
   Name: ASPNETCORE_ENVIRONMENT
   Value: Production
   
   Name: CORS__AllowedOrigins__0
   Value: https://your-frontend-url.netlify.app
   (Update this after deploying frontend)
   ```

   - Click "Save" after adding all

---

### Step 4: Deploy Backend to Azure App Service

#### Option A: Deploy from Visual Studio (Easiest)

1. **Open your project** in Visual Studio

2. **Right-click** on `WorldCities.Server` project
   - Select "Publish"

3. **Choose Target**:
   - Select "Azure" → "Azure App Service (Windows)" or "Azure App Service (Linux)"
   - Sign in if prompted
   - Select your subscription
   - Find and select your App Service
   - Click "Finish"

4. **Publish**:
   - Click "Publish" button
   - Wait for deployment (~5-10 minutes)

#### Option B: Deploy from GitHub (CI/CD)

1. **Push code to GitHub** (if not already)

2. **In Azure Portal**:
   - Go to your App Service
   - Click "Deployment Center" in left menu
   - **Source**: GitHub
   - **Organization**: Your GitHub org/username
   - **Repository**: Your repo
   - **Branch**: main (or master)
   - **Build provider**: GitHub Actions (recommended)
   - Click "Save"

3. **Azure will create GitHub Action**:
   - Automatically creates `.github/workflows` file
   - Auto-deploys on every push

#### Option C: Deploy using Azure CLI

```bash
# Login to Azure
az login

# Navigate to your project
cd "angular/full stack asp/WorldCities/WorldCities.Server"

# Build and publish
dotnet publish -c Release -o ./publish

# Deploy (replace with your app name)
az webapp deploy --resource-group WorldCities-RG --name worldcities-api-[yourname] --src-path ./publish --type zip
```

---

### Step 5: Run Database Migrations

After deploying, you need to run EF Core migrations:

#### Option A: Using Azure Cloud Shell

1. **Open Azure Cloud Shell** (top bar in portal, >_ icon)

2. **Run migration command**:
   ```bash
   # Install .NET if needed
   # Then run migrations (you'll need to upload your project or use EF Core tools)
   ```

#### Option B: Run Locally (Recommended)

1. **Update local connection string** temporarily:
   - In `appsettings.Development.json`, add:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "<your-azure-sql-connection-string>"
     }
   }
   ```

2. **Run migration**:
   ```bash
   cd "angular/full stack asp/WorldCities/WorldCities.Server"
   dotnet ef database update
   ```

3. **Remove connection string** from `appsettings.Development.json` after migration

#### Option C: Use SQL Server Management Studio (SSMS)

1. **Download SSMS**: [aka.ms/ssms](https://aka.ms/ssms)

2. **Connect to Azure SQL**:
   - Server: `worldcities-server-xxx.database.windows.net`
   - Authentication: SQL Server Authentication
   - Login: Your admin username
   - Password: Your password

3. **Run SQL scripts** from your migrations manually (not recommended)

---

### Step 6: Deploy Frontend

#### Option A: Deploy to Netlify (Free Forever) - RECOMMENDED

**📚 See `FRONTEND_DEPLOYMENT_GUIDE.md` for complete step-by-step instructions!**

**Quick Steps:**
1. **Sign up**: [netlify.com](https://netlify.com) (free)
2. **New Site from Git**: Connect GitHub → Select your repo
3. **Build Settings** (auto-detected from `netlify.toml`):
   - Base directory: `worldcities.client`
   - Build command: `npm install && npm run build -- --configuration production`
   - Publish directory: `worldcities.client/dist/worldcities.client`
4. **Environment Variables**: Add `API_URL` = `https://worldcities-api-[yourname].azurewebsites.net`
5. **Update Environment File**: Update `worldcities.client/src/environments/environment.ts` with your Azure backend URL
6. **Deploy**: Click "Deploy site"

**✅ Configuration file `netlify.toml` is already created for you!**

#### Option B: Deploy to Vercel (Free Forever) - ALSO RECOMMENDED

**📚 See `FRONTEND_DEPLOYMENT_GUIDE.md` for complete step-by-step instructions!**

**Quick Steps:**
1. **Sign up**: [vercel.com](https://vercel.com) (free)
2. **Import Project**: Connect GitHub → Select your repo
3. **Configure** (auto-detected from `vercel.json`):
   - Root Directory: `worldcities.client`
   - Framework: Angular
   - Output Directory: `dist/worldcities.client`
4. **Environment Variables**: Add `API_URL` = `https://worldcities-api-[yourname].azurewebsites.net`
5. **Update Environment File**: Update `worldcities.client/src/environments/environment.ts` with your Azure backend URL
6. **Deploy**: Click "Deploy"

**✅ Configuration file `vercel.json` is already created for you!**

#### Option C: Deploy to Azure Static Web Apps (Free)

1. **In Azure Portal**:
   - Create a resource → "Static Web App"
   - Connect to GitHub
   - Configure build:
     - **App location**: `worldcities.client`
     - **Api location**: (leave empty)
     - **Output location**: `dist/worldcities.client`

2. **Set Environment Variables**:
   - In Static Web App → Configuration
   - Add: `API_URL` = Your backend URL

---

### Step 7: Update CORS in Backend

1. **Go to Azure Portal** → Your App Service

2. **Configuration** → **Application settings**:
   - Update `CORS__AllowedOrigins__0` with your frontend URL
   - Or add multiple origins:
     ```
     CORS__AllowedOrigins__0=https://your-app.netlify.app
     CORS__AllowedOrigins__1=https://your-app.azurestaticapps.net
     ```

3. **Save** and restart app (if needed)

---

### Step 8: Test Your Deployment

1. **Test API**:
   - Visit: `https://worldcities-api-[yourname].azurewebsites.net/swagger`
   - Should see Swagger UI

2. **Test Frontend**:
   - Visit your Netlify/Azure Static Web App URL
   - Try logging in
   - Test CRUD operations

---

## 🔧 Troubleshooting

### Database Connection Issues

**Problem**: Can't connect to Azure SQL Database

**Solutions**:
1. Check firewall rules (allow Azure services)
2. Verify connection string format
3. Check username/password
4. Ensure database server is running

### App Service Not Starting

**Problem**: App fails to start

**Solutions**:
1. Check "Log stream" in App Service
2. Verify all environment variables are set
3. Check "Diagnose and solve problems" in portal
4. Review application logs

### CORS Errors

**Problem**: Frontend can't call API

**Solutions**:
1. Verify CORS settings in App Service
2. Check frontend URL matches exactly (including https://)
3. Restart App Service after CORS changes

---

## 💰 Cost Breakdown (Free Tier)

- **Azure SQL Database**: **FREE** for 12 months (then ~$5/month for Basic tier)
- **Azure App Service (F1)**: **FREE** (limited to 60 minutes/day compute)
- **Azure Static Web Apps**: **FREE** (100GB bandwidth/month)
- **Netlify**: **FREE** forever (100GB bandwidth/month)

**Total**: $0 for 12 months, then ~$5/month

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - App Service F1: Sleeps after inactivity, limited compute
   - SQL Database Free: 32MB max size, limited DTUs
   - Consider upgrading if you need more resources

2. **Security**:
   - Never commit connection strings to GitHub
   - Use Azure Key Vault for production secrets (optional)
   - Keep JWT SecurityKey secret and strong

3. **Monitoring**:
   - Use Azure Application Insights (free tier available)
   - Monitor App Service metrics in portal

---

## 🎉 You're Done!

Your app should now be live at:
- **Backend API**: `https://worldcities-api-[yourname].azurewebsites.net`
- **Frontend**: `https://your-app.netlify.app` (or Azure Static Web Apps)

---

## 🆘 Need Help?

If you encounter issues:
1. Check Azure Portal logs
2. Review this guide
3. Check Azure documentation
4. Let me know and I can help troubleshoot!

