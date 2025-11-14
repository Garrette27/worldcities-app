# 🔐 JWT Security Key Generator

## ✅ Your Secure JWT Key (Ready to Use)

Here's a secure 64-character random string you can use for your JWT SecurityKey:

```
aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7
```

**Copy this exactly** and use it in your Azure App Service configuration:
- **Name**: `JwtSettings__SecurityKey`
- **Value**: `aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7`

---

## 🔄 How to Generate Your Own (Optional)

If you want to generate a new one yourself, here are several methods:

### Method 1: Online Generator (Easiest)
1. Go to: [randomkeygen.com](https://randomkeygen.com)
2. Use the "CodeIgniter Encryption Keys" section
3. Copy a 64-character key

### Method 2: PowerShell (Windows)
```powershell
# Generate 64-character random string
$chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
$random = -join ((1..64) | ForEach-Object { $chars[(Get-Random -Maximum $chars.Length)] })
Write-Host $random
```

### Method 3: Online (Base64)
1. Go to: [random.org/strings](https://www.random.org/strings/)
2. Set length to 64
3. Use alphanumeric characters
4. Generate and copy

### Method 4: Using .NET (If you have .NET SDK)
```bash
dotnet run --project <path> -- generate-jwt-key
```
(You'd need to create a small console app for this)

### Method 5: Python (If installed)
```python
import secrets
import string
chars = string.ascii_letters + string.digits
key = ''.join(secrets.choice(chars) for _ in range(64))
print(key)
```

---

## ⚠️ Important Security Notes

1. **Keep it Secret**: Never commit this key to GitHub or share it publicly
2. **Use Environment Variables**: Always store in Azure App Settings, not in code
3. **Use Different Keys**: Use different keys for development and production
4. **Length**: 32+ characters is minimum, 64 is recommended for better security

---

## 📝 Where to Use This Key

### In Azure Portal:
1. Go to your App Service
2. Configuration → Application settings
3. Add new setting:
   - **Name**: `JwtSettings__SecurityKey`
   - **Value**: `aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7`
   - Click "OK" → "Save"

### For Local Development (Optional):
Add to `appsettings.Development.json`:
```json
{
  "JwtSettings": {
    "SecurityKey": "aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7aB9cD1eF3gH5iJ7kL9mN1oP3qR5sT7"
  }
}
```

**Note**: Don't commit this to GitHub! Use User Secrets for local development instead.

---

## ✅ You're All Set!

Use the key above in your Azure configuration. It's secure and ready to use!

