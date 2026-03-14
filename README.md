# Daily Random Essays

A minimal, aesthetically pleasing Next.js web application that curates and displays 5 random essays daily from trusted intellectual publications (JSTOR, Aeon, Smithsonian, Quanta, Nautilus).

## Features
- **Daily Ephemeral Reading**: Shows exactly 5 random articles daily. They are replaced at midnight.
- **Read Log**: A timeline of past day curations.
- **Serverless Ready Database**: Uses Upstash Redis for seamless deployment on Vercel or similar platforms.
- **Beautiful Typography**: Uses Playfair Display (Serif) and Inter (Sans).
- **Dark Mode**: Automatically respects your system's dark/light mode preference.

## Setup Instructions

Since you opted to run this without having Node.js configured yet, you will need to install Node to test it locally. However, the codebase is completely ready for production deployment on Vercel out of the box.

### Local Development (Requires Node.js)
1. **Install Node.js**: Download and install from [Nodejs.org](https://nodejs.org/).
2. **Open Terminal**: Navigate to this project directory: `cd "C:\Users\Priyansh Saini\Desktop\Random Article website"`.
3. **Install Dependencies**: Run `npm install`.
4. **Environment Variables**:
   Create a `.env.local` file in the root directory. You need a free [Upstash Redis](https://upstash.com/) account.
   ```
   UPSTASH_REDIS_REST_URL="your-upstash-url-here"
   UPSTASH_REDIS_REST_TOKEN="your-upstash-token-here"
   ```
5. **Run App**: Run `npm run dev`. Your app will be running at `http://localhost:3000`.

### Vercel Deployment (The Easiest Way)
1. Create a GitHub repository and push this folder's contents.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. In the deployment settings, add the two Environment Variables (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`) you got from your Upstash console.
4. Hit Deploy! It will automatically build and host your Daily Random Essays site for free.
