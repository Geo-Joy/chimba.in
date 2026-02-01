# Setup Guide for Chimba.in

This guide will help you set up the YouTube API integration for your site.

## Step 1: Get YouTube API Key

### Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click "New Project"
5. Enter a project name (e.g., "Chimba.in")
6. Click "Create"

### Enable YouTube Data API v3

1. In the Google Cloud Console, make sure your new project is selected
2. Go to "APIs & Services" > "Library" (from the left sidebar)
3. Search for "YouTube Data API v3"
4. Click on "YouTube Data API v3" from the results
5. Click the "Enable" button
6. Wait for it to enable (takes a few seconds)

### Create API Key

1. Go to "APIs & Services" > "Credentials" (from the left sidebar)
2. Click "Create Credentials" at the top
3. Select "API Key" from the dropdown
4. Your API key will be created and shown in a popup
5. **IMPORTANT**: Click "Copy" to copy your API key
6. (Optional but recommended) Click "Restrict Key" to add restrictions:
   - Under "API restrictions", select "Restrict key"
   - Check "YouTube Data API v3"
   - Click "Save"

## Step 2: Get YouTube Channel ID

### Method 1: From YouTube Studio

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Sign in with your channel account
3. Click on "Settings" (gear icon) at the bottom left
4. Click "Channel" in the left sidebar
5. Click "Advanced settings"
6. You'll see your "Channel ID" - it starts with "UC" followed by 22 characters
7. Copy this Channel ID

### Method 2: From Channel URL

1. Go to your YouTube channel
2. Look at the URL in your browser
3. If it shows `youtube.com/@YourHandle`:
   - Use an online tool to convert it to Channel ID
   - Go to [Comment Picker's Channel ID Finder](https://commentpicker.com/youtube-channel-id.php)
   - Paste your channel URL
   - Click "Get YouTube Channel ID"
   - Copy the Channel ID shown

### Method 3: From Video URL (Easiest)

1. Go to any video on your channel
2. Right-click on your channel name below the video
3. Select "Copy link address"
4. The link will look like: `https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxx`
5. The part after `/channel/` is your Channel ID

## Step 3: Configure Environment Variables

1. In your project root directory, find the file `.env.local`
2. Open it in a text editor
3. Replace the placeholder values:

```env
YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxx
```

4. Save the file

**IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore` to protect your API key.

## Step 4: Test Locally

1. Make sure you've saved `.env.local` with your actual keys
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser
5. You should see your channel name and videos loading!

## Step 5: Deploy to Vercel

### Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub
3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/chimba.in.git
   git branch -M main
   git push -u origin main
   ```

### Deploy on Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with your GitHub account
3. Click "Add New..." > "Project"
4. Select your `chimba.in` repository
5. In the "Environment Variables" section:
   - Add variable: `YOUTUBE_API_KEY` = `your_actual_api_key`
   - Add variable: `YOUTUBE_CHANNEL_ID` = `your_actual_channel_id`
6. Click "Deploy"
7. Wait for deployment to complete
8. Click "Visit" to see your live site!

### Add Custom Domain (Optional)

1. In Vercel, go to your project settings
2. Click on "Domains"
3. Add `chimba.in` and follow the instructions to update DNS
4. Vercel will automatically set up SSL/HTTPS

## Troubleshooting

### Videos not loading?

1. Check browser console (F12) for errors
2. Verify your API key is correct in `.env.local` or Vercel environment variables
3. Verify your Channel ID is correct (should start with "UC")
4. Make sure YouTube Data API v3 is enabled in Google Cloud Console
5. Check if you've hit API quota limits (10,000 units per day)

### API Quota Issues?

The free tier gives you 10,000 units per day. Each page load uses:
- 100 units for search request
- 1 unit per video for statistics

With 1-hour caching, a site with moderate traffic should stay within limits.

To check your quota usage:
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" > "Dashboard"
3. Click on "YouTube Data API v3"
4. View usage statistics

### Still having issues?

- Double-check all credentials are correct
- Try deleting `.next` folder and rebuilding: `rm -rf .next && npm run build`
- Check that `.env.local` is in the root directory (same level as `package.json`)

## Security Notes

- **Never** commit your API key to Git
- **Never** share your `.env.local` file
- Use API restrictions in Google Cloud Console to limit key usage
- For Vercel, environment variables are encrypted and secure
- Consider adding an HTTP referrer restriction to your API key to prevent unauthorized use

## Need Help?

If you encounter any issues:
1. Check the Next.js documentation: https://nextjs.org/docs
2. Check YouTube Data API docs: https://developers.google.com/youtube/v3
3. Check Vercel deployment docs: https://vercel.com/docs
