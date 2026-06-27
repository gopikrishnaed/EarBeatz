# EarBeatz - Next-Gen Music Experience

EarBeatz is a modern music streaming and social platform built with Next.js, Supabase, and Genkit AI.

## Features

- **AI Playlist Generation:** Create custom playlists based on your mood using Google's Gemini.
- **Social Feed:** Share what you're listening to and interact with friends.
- **Music Library:** Browse songs, albums, and playlists.
- **Search:** Find your favorite tracks and artists instantly.

## How to Push to GitHub (Safely)

1. **Create a new repository** on [GitHub](https://github.com/new). Do **not** initialize it with a README or .gitignore (we already have them).
2. **Open your terminal** in the project folder.
3. **Initialize Git:**
   ```bash
   git init
   ```
4. **Add your files:**
   ```bash
   git add .
   ```
5. **Commit your changes:**
   ```bash
   git commit -m "Initial commit"
   ```
6. **Link to GitHub:** (Replace `<your-repo-url>` with the URL from step 1)
   ```bash
   git remote add origin <your-repo-url>
   ```
7. **Push your code:**
   ```bash
   git push -u origin main
   ```

## Local Development Setup

1. **Clone the repository.**
2. **Setup Environment Variables:**
   - Copy `.env.example` to a new file named `.env.local`.
   - Fill in your Supabase and Google AI API keys.
   - **Note:** The `.gitignore` file ensures your `.env.local` is never uploaded to GitHub.
3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** Supabase
- **AI:** Genkit (Google Gemini)
- **UI:** Shadcn/UI & Tailwind CSS
- **Icons:** Lucide React
