# Chimba.in

A Next.js website that redirects users to the ChimbanumChimbiyum YouTube channel. On mobile devices, it attempts to open the native YouTube app for a better user experience.

## Features

- **Mobile App Detection**: Automatically detects mobile devices and opens the YouTube app
- **Fallback Support**: Falls back to YouTube web if the app is not installed
- **Desktop Friendly**: Redirects desktop users directly to YouTube web
- **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS

## Development

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building

Build the production version:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deploy to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will automatically detect Next.js and configure everything
6. Click "Deploy"

### Using Vercel CLI

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy:
```bash
vercel
```

For production:
```bash
vercel --prod
```

## Project Structure

```
chimba.in/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page with YouTube redirect logic
│   └── globals.css     # Global styles with Tailwind
├── package.json
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## Future Plans

This is a simple redirect page to start with. Future enhancements may include:
- Custom landing page with channel information
- Video gallery
- About section
- Contact form
- Newsletter subscription

## License

MIT
