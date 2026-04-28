# 🧮 Multiply Trainer

An interactive web application for children to practice multiplication and division tables. Designed for iPads and tablets with a focus on speed, accuracy, and engagement through gamification.

## 🚀 Live Demo
[Sprightly Sundae - Netlify](https://sprightly-sundae-eda4a6.netlify.app/)

## ✨ Features

- **Dynamic Task Generation**: Problems are generated randomly every session, ensuring the child doesn't just memorize the sequence of answers.
- **Global Leaderboard**: Results are synced to a Supabase cloud database, allowing multiple users to compete.
- **Gamification**: 
  - **Badges**: Earn rewards like "Sniper" (no mistakes), "Lightning" (fast completion), or "Streak" (consistent performance).
  - **Points System**: Scoring based on accuracy and time remaining.
- **Tablet Optimized**: Compact UI designed to fit all tasks on a single screen without scrolling on iPads.
- **Local History**: Even without an internet connection, the last 50 results are stored in the browser's `localStorage`.

## 🛠 Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (Grid & Flexbox).
- **Backend-as-a-Service**: [Supabase](https://supabase.com/) (PostgreSQL).
- **Deployment**: [Netlify](https://www.netlify.com/).

## 🔧 Setup & Installation

### 1. Database Configuration
To enable the leaderboard, create a table in your Supabase SQL Editor:

```sql
create table leaderboard (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  player_name text not null,
  set_label text not null,
  score integer not null,
  time_spent integer not null,
  correct integer not null,
  total integer not null,
  badges text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table leaderboard enable row level security;
create policy "Allow public read access" on leaderboard for select using (true);
create policy "Allow public insert access" on leaderboard for insert with check (true);
```

### 2. Connect API Keys
Update the following constants in `app.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-anon-public-key';
```

### 3. Local Development
Run the project using a local server (e.g., Live Server in VS Code) to avoid CORS issues with JSON data fetching:
1. Open `index.html`.
2. Right-click -> **Open with Live Server**.

## 📝 License
Personal project created for educational purposes.
