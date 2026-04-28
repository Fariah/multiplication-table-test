# 🧮 Multiply Trainer — Project Context

## Project Overview
Multiply Trainer is an interactive, tablet-optimized web application designed for children to practice multiplication and division tables. It combines educational tasks with gamification elements like badges and leaderboards to keep users engaged.

### Core Technologies
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Flexbox/Grid).
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL via PostgREST) for the global leaderboard.
- **Storage**: `localStorage` for player names, local history, and device identification.
- **Data**: JSON files (`data/tasks.json`, `data/badges.json`) define the available task sets and rewards.

### Architecture
- **State Management**: A global `state` object in `app.js` tracks current game progress (time, tasks, score).
- **Gamification**:
  - **Dynamic Tasks**: Tasks are shuffled/regenerated per session.
  - **Badges**: Awarded based on performance (accuracy, speed, streaks).
  - **Leaderboard**: Real-time sync with Supabase for competitive play.

---

## Building and Running

### Development
1. **Local Server**: The project uses `fetch` to load JSON data, which triggers CORS or "Protocol not supported" errors when opened via `file://`. Use a local server:
   - **VS Code**: Use the "Live Server" extension.
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx serve .`
2. **Supabase Integration**: Ensure `SUPABASE_URL` and `SUPABASE_KEY` in `app.js` are correctly configured.

### Deployment
- The project is configured for manual deployment (e.g., Netlify, GitHub Pages).
- Ensure the `assets/` and `data/` directories are included in the build.

---

## Development Conventions

### Coding Style
- **Vanilla JS**: No frameworks (React/Vue) are used. Maintain the procedural/functional hybrid style in `app.js`.
- **CSS Variables**: Use the variables defined in `:root` (in `style.css`) for consistent colors, spacing, and radius.
- **Dynamic UI**: UI components (task grids, set cards) are generated dynamically via JavaScript. Use `innerHTML` or `createElement` consistently.

### Data Management
- **Task Sets**: To add new practice modes, modify `data/tasks.json`.
- **Badges**: Badge definitions and logic reside in `data/badges.json` and the `calculateBadges` function in `app.js`.

### Key Files
- `index.html`: Main application skeleton with multiple screens (home, game, result, leaderboard).
- `app.js`: Contains all business logic, timer, scoring, and Supabase integration.
- `style.css`: Responsive design optimized for tablets (iPad).
- `SPEC.md`: Technical specification in Ukrainian (detailed reference for logic).
- `data/*.json`: Static data for tasks and rewards.
