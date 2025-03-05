# The Best Construction Service

This is a Next.js project for the company profile website **The Best Construction Service**.

## Features

- **Modern UI** with Tailwind CSS and ShadCN
- **Fully Responsive** for mobile and desktop
- **Fast Search** powered by Algolia/Laravel Scout
- **Dynamic Content** for services, portfolio, and blog
- **Admin Dashboard** to manage content and messages
- **SEO Optimized** with sitemap, meta tags, and Google Analytics
- **Google Maps Integration** for company location

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/Sedetil/company-profile.git
cd company-profile
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Create Environment Variables
Create a `.env.local` file in the root directory:
```sh
touch .env.local
```
Then add the required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server
```sh
npm run dev
```
Your project will be available at **http://localhost:3000/**.

## Project Structure
```
.next/          # Build output
app/           # Next.js App Router structure
components/    # Reusable UI components
hooks/         # Custom React hooks
lib/           # Utility functions
public/        # Static assets (images, icons, etc.)
styles/        # Global styles (Tailwind CSS)
.env.local     # Environment variables
next.config.mjs # Next.js configuration
package.json   # Project dependencies and scripts
```

## Deployment
For production deployment, build and start the project:
```sh
npm run build
npm start
```

## License
This project is licensed under the MIT License.

