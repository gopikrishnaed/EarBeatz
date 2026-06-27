# EarBeatz - Next-Gen Music Experience

EarBeatz is a modern music streaming and social platform built with Next.js, Supabase, and Genkit AI.

## 🚀 Getting Started

### 1. Find Your Project Folder
If you're not sure where these files are on your computer:
- **In VS Code:** Right-click any file in the left sidebar and select "Reveal in Finder" (Mac) or "Reveal in File Explorer" (Windows).
- **In the Terminal:** Type `pwd` (Mac/Linux) or `echo %cd%` (Windows) to see the full path.

### 2. Open the Terminal
- In VS Code, press ``Ctrl + ` `` (backtick) or go to **Terminal > New Terminal**.

### 3. Push to GitHub (Safely)
1. **Create a new repository** on [GitHub](https://github.com/new). Do **not** initialize it with a README or .gitignore.
2. **Run these commands** in your terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## 🛠 Local Development Setup

1. **Setup Environment Variables:**
   - Create a file named `.env` in the root folder.
   - Copy the keys from your provider (Supabase/Google AI) into it.
   - **Note:** The `.gitignore` file ensures your `.env` is never uploaded to GitHub.
2. **Run the development server:**
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** Supabase
- **AI:** Genkit (Google Gemini)
- **UI:** Shadcn/UI & Tailwind CSS
- **Icons:** Lucide React
