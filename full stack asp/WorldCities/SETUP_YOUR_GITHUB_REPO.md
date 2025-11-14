# 🔧 Set Up Your Own GitHub Repository

## ⚠️ Current Situation

Your project is currently connected to:
```
https://github.com/PacktPublishing/ASP.NET-Core-8-and-Angular.git
```

This is the original book repository. You need to create **your own repository** for deployment.

---

## 🎯 Solution: Create Your Own Repository

### Option 1: Create New Repository (Recommended)

#### Step 1: Create Repository on GitHub

1. **Go to GitHub**: [github.com](https://github.com)
2. **Click** "+" (top right) → **"New repository"**
3. **Repository name**: `worldcities-app` (or your choice)
4. **Description**: "Full Stack ASP.NET Core + Angular WorldCities Application"
5. **Visibility**: 
   - ✅ **Public** (free, for deployment)
   - ⚠️ **Private** (free for personal accounts)
6. **DO NOT** check "Initialize with README"
7. **Click** "Create repository"

#### Step 2: Update Remote in Your Project

Open PowerShell in your project folder:

```powershell
cd "C:\Users\Admin\Desktop\Full Stack ASP\angular\full stack asp\WorldCities"

# Remove old remote
git remote remove origin

# Add your new repository (replace with YOUR username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/worldcities-app.git

# Verify
git remote -v
```

**Example** (if your username is `johndoe`):
```powershell
git remote remove origin
git remote add origin https://github.com/johndoe/worldcities-app.git
git remote -v
```

#### Step 3: Create .gitignore (If Not Exists)

Create a `.gitignore` file to exclude unnecessary files:

```powershell
# Create .gitignore
@"
# Build outputs
**/bin/
**/obj/
**/dist/
**/publish/
**/node_modules/
**/.angular/

# IDE
**/.vs/
**/.vscode/
**/.idea/
*.user
*.suo

# Logs
*.log
npm-debug.log*

# Environment files (keep structure, but don't commit secrets)
**/appsettings.Development.json

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
```

#### Step 4: Add and Commit Your Files

```powershell
# Check what files will be added
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit: WorldCities full stack application ready for deployment"
```

#### Step 5: Push to Your Repository

```powershell
# Push to your new repository
git branch -M main
git push -u origin main
```

**Note**: GitHub will ask for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password!)

**To create Personal Access Token**:
1. GitHub → Your profile → Settings
2. Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Name: "WorldCities Deployment"
5. Expiration: 90 days (or your choice)
6. Scopes: Check `repo` (full control)
7. Generate token
8. **Copy the token** (you won't see it again!)
9. Use this token as your password when pushing

---

### Option 2: Fork the Original Repository (Alternative)

If you want to keep the connection to the original:

1. **Go to**: https://github.com/PacktPublishing/ASP.NET-Core-8-and-Angular
2. **Click** "Fork" (top right)
3. This creates a copy in your account
4. **Update remote**:
   ```powershell
   git remote set-url origin https://github.com/YOUR_USERNAME/ASP.NET-Core-8-and-Angular.git
   ```

**Note**: This will fork the entire book repository, not just WorldCities.

---

## ✅ Verify Your Setup

After pushing, verify:

1. **Go to your GitHub repository**
2. **You should see**:
   - `WorldCities.Server/` folder
   - `worldcities.client/` folder
   - All your deployment guides
   - Configuration files

---

## 🚀 Quick Commands Summary

```powershell
# Navigate to project
cd "C:\Users\Admin\Desktop\Full Stack ASP\angular\full stack asp\WorldCities"

# Remove old remote
git remote remove origin

# Add your repository (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Create .gitignore (if needed)
# (Use the content above)

# Add and commit
git add .
git commit -m "Initial commit: WorldCities app"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🎯 Next Steps After Pushing

Once your code is on GitHub:

1. ✅ **Deploy Backend to Azure** (see `AZURE_DEPLOYMENT_GUIDE.md`)
2. ✅ **Deploy Frontend to Netlify/Vercel** (see `FRONTEND_DEPLOYMENT_GUIDE.md`)
3. ✅ **Set up GitHub Actions** for auto-deployment (optional)

---

## 🆘 Troubleshooting

### "Repository not found"
- Check your repository URL is correct
- Make sure repository exists on GitHub
- Verify you're logged into the right GitHub account

### "Authentication failed"
- Use Personal Access Token (not password)
- Make sure token has `repo` scope
- Token might have expired - create a new one

### "Permission denied"
- Make sure you own the repository
- Check repository visibility (public/private)
- Verify your GitHub account has access

### "Large files" error
- Some files might be too large for GitHub
- Add large files to `.gitignore`
- Remove from tracking: `git rm --cached filename`

---

## 💡 Pro Tips

1. **Use Personal Access Token** - More secure than password
2. **Keep .gitignore updated** - Don't commit secrets or build files
3. **Use meaningful commit messages** - Helps track changes
4. **Push regularly** - Don't wait until deployment

---

## 🎉 You're Ready!

Once your code is pushed to GitHub, you can:
- Deploy to Azure App Service
- Deploy frontend to Netlify/Vercel
- Set up CI/CD pipelines
- Share your code

**Let me know if you need help with any step!** 🚀

