# 📚 Тренажер таблиці множення — Повна технічна специфікація

## Мета
Інтерактивний веб-сайт для дітей, що тренує таблицю множення (та ділення як екстра-режим).
Без бекенду. Лише HTML + CSS + Vanilla JS + JSON. Дані зберігаються в `localStorage`.

---

## Структура файлів

```
/
├── index.html
├── style.css
├── app.js
├── data/
│   ├── tasks.json
│   └── badges.json
└── assets/
    └── badges/          ← PNG/SVG картинки бейджів (додаються окремо)
```

---

## data/tasks.json

```json
{
  "sets": [
    {
      "id": "multiply-2-5",
      "label": "Таблиці 2–5",
      "mode": "multiply",
      "extra": false,
      "timeLimit": 180,
      "tasks": [
        {"a": 2, "b": 1, "op": "*"}, {"a": 2, "b": 2, "op": "*"}, {"a": 2, "b": 3, "op": "*"},
        {"a": 2, "b": 4, "op": "*"}, {"a": 2, "b": 5, "op": "*"}, {"a": 2, "b": 6, "op": "*"},
        {"a": 2, "b": 7, "op": "*"}, {"a": 2, "b": 8, "op": "*"}, {"a": 2, "b": 9, "op": "*"},
        {"a": 3, "b": 1, "op": "*"}, {"a": 3, "b": 2, "op": "*"}, {"a": 3, "b": 3, "op": "*"},
        {"a": 3, "b": 4, "op": "*"}, {"a": 3, "b": 5, "op": "*"}, {"a": 3, "b": 6, "op": "*"},
        {"a": 3, "b": 7, "op": "*"}, {"a": 3, "b": 8, "op": "*"}, {"a": 3, "b": 9, "op": "*"},
        {"a": 4, "b": 1, "op": "*"}, {"a": 4, "b": 2, "op": "*"}, {"a": 4, "b": 3, "op": "*"},
        {"a": 4, "b": 4, "op": "*"}, {"a": 4, "b": 5, "op": "*"}, {"a": 4, "b": 6, "op": "*"},
        {"a": 4, "b": 7, "op": "*"}, {"a": 4, "b": 8, "op": "*"}, {"a": 4, "b": 9, "op": "*"},
        {"a": 5, "b": 1, "op": "*"}, {"a": 5, "b": 2, "op": "*"}, {"a": 5, "b": 3, "op": "*"},
        {"a": 5, "b": 4, "op": "*"}, {"a": 5, "b": 5, "op": "*"}, {"a": 5, "b": 6, "op": "*"},
        {"a": 5, "b": 7, "op": "*"}, {"a": 5, "b": 8, "op": "*"}, {"a": 5, "b": 9, "op": "*"}
      ]
    },
    {
      "id": "multiply-6-9",
      "label": "Таблиці 6–9",
      "mode": "multiply",
      "extra": false,
      "timeLimit": 180,
      "tasks": [
        {"a": 6, "b": 1, "op": "*"}, {"a": 6, "b": 2, "op": "*"}, {"a": 6, "b": 3, "op": "*"},
        {"a": 6, "b": 4, "op": "*"}, {"a": 6, "b": 5, "op": "*"}, {"a": 6, "b": 6, "op": "*"},
        {"a": 6, "b": 7, "op": "*"}, {"a": 6, "b": 8, "op": "*"}, {"a": 6, "b": 9, "op": "*"},
        {"a": 7, "b": 1, "op": "*"}, {"a": 7, "b": 2, "op": "*"}, {"a": 7, "b": 3, "op": "*"},
        {"a": 7, "b": 4, "op": "*"}, {"a": 7, "b": 5, "op": "*"}, {"a": 7, "b": 6, "op": "*"},
        {"a": 7, "b": 7, "op": "*"}, {"a": 7, "b": 8, "op": "*"}, {"a": 7, "b": 9, "op": "*"},
        {"a": 8, "b": 1, "op": "*"}, {"a": 8, "b": 2, "op": "*"}, {"a": 8, "b": 3, "op": "*"},
        {"a": 8, "b": 4, "op": "*"}, {"a": 8, "b": 5, "op": "*"}, {"a": 8, "b": 6, "op": "*"},
        {"a": 8, "b": 7, "op": "*"}, {"a": 8, "b": 8, "op": "*"}, {"a": 8, "b": 9, "op": "*"},
        {"a": 9, "b": 1, "op": "*"}, {"a": 9, "b": 2, "op": "*"}, {"a": 9, "b": 3, "op": "*"},
        {"a": 9, "b": 4, "op": "*"}, {"a": 9, "b": 5, "op": "*"}, {"a": 9, "b": 6, "op": "*"},
        {"a": 9, "b": 7, "op": "*"}, {"a": 9, "b": 8, "op": "*"}, {"a": 9, "b": 9, "op": "*"}
      ]
    },
    {
      "id": "divide-extra",
      "label": "Ділення (Екстра ⚡)",
      "mode": "divide",
      "extra": true,
      "timeLimit": 240,
      "tasks": [
        {"a": 4,  "b": 2, "op": "/"}, {"a": 6,  "b": 2, "op": "/"}, {"a": 8,  "b": 2, "op": "/"},
        {"a": 10, "b": 2, "op": "/"}, {"a": 12, "b": 2, "op": "/"}, {"a": 14, "b": 2, "op": "/"},
        {"a": 16, "b": 2, "op": "/"}, {"a": 18, "b": 2, "op": "/"}, {"a": 9,  "b": 3, "op": "/"},
        {"a": 12, "b": 3, "op": "/"}, {"a": 15, "b": 3, "op": "/"}, {"a": 18, "b": 3, "op": "/"},
        {"a": 21, "b": 3, "op": "/"}, {"a": 24, "b": 3, "op": "/"}, {"a": 27, "b": 3, "op": "/"},
        {"a": 16, "b": 4, "op": "/"}, {"a": 20, "b": 4, "op": "/"}, {"a": 24, "b": 4, "op": "/"},
        {"a": 28, "b": 4, "op": "/"}, {"a": 32, "b": 4, "op": "/"}, {"a": 36, "b": 4, "op": "/"},
        {"a": 25, "b": 5, "op": "/"}, {"a": 30, "b": 5, "op": "/"}, {"a": 35, "b": 5, "op": "/"},
        {"a": 40, "b": 5, "op": "/"}, {"a": 45, "b": 5, "op": "/"}, {"a": 36, "b": 6, "op": "/"},
        {"a": 42, "b": 6, "op": "/"}, {"a": 48, "b": 6, "op": "/"}, {"a": 54, "b": 6, "op": "/"},
        {"a": 49, "b": 7, "op": "/"}, {"a": 56, "b": 7, "op": "/"}, {"a": 63, "b": 7, "op": "/"},
        {"a": 64, "b": 8, "op": "/"}, {"a": 72, "b": 8, "op": "/"}, {"a": 81, "b": 9, "op": "/"}
      ]
    }
  ]
}
```

---

## data/badges.json

```json
{
  "badges": [
    {
      "id": "sniper",
      "label": "Снайпер",
      "description": "Жодної помилки!",
      "icon": "assets/badges/sniper.png",
      "emoji": "🎯"
    },
    {
      "id": "lightning",
      "label": "Блискавка",
      "description": "Виконав за половину відведеного часу",
      "icon": "assets/badges/lightning.png",
      "emoji": "⚡"
    },
    {
      "id": "streak",
      "label": "Стрік",
      "description": "3 спроби поспіль без помилок",
      "icon": "assets/badges/streak.png",
      "emoji": "🔥"
    },
    {
      "id": "master",
      "label": "Майстер",
      "description": "Екстра режим без помилок",
      "icon": "assets/badges/master.png",
      "emoji": "🌟"
    },
    {
      "id": "record",
      "label": "Рекордсмен",
      "description": "Новий особистий рекорд",
      "icon": "assets/badges/record.png",
      "emoji": "🚀"
    },
    {
      "id": "perfect",
      "label": "Перфекціоніст",
      "description": "100% правильно І більше половини часу залишилось",
      "icon": "assets/badges/perfect.png",
      "emoji": "💯"
    },
    {
      "id": "first",
      "label": "Перший раз",
      "description": "Перша спроба!",
      "icon": "assets/badges/first.png",
      "emoji": "🎉"
    }
  ]
}
```

---

## Екрани і HTML структура

### index.html — скелет

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Тренажер множення</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- ЕКРАН 1: Головна -->
  <div id="screen-home" class="screen active">
    <h1>🧮 Тренажер множення</h1>
    <div class="name-input-block">
      <label for="player-name">Твоє ім'я:</label>
      <input type="text" id="player-name" placeholder="Введи ім'я" maxlength="20">
    </div>
    <h2>Обери набір:</h2>
    <div id="sets-list" class="sets-grid">
      <!-- Генерується з tasks.json через JS -->
    </div>
    <button id="btn-leaderboard" class="btn-secondary">🏆 Таблиця рекордів</button>
  </div>

  <!-- ЕКРАН 2: Гра -->
  <div id="screen-game" class="screen">
    <div class="game-header">
      <div id="timer-display" class="timer">3:00</div>
      <div id="game-title" class="game-title"></div>
      <button id="btn-check" class="btn-primary">✅ Перевірити</button>
    </div>
    <div id="tasks-grid" class="tasks-grid">
      <!-- Генерується динамічно через JS -->
    </div>
  </div>

  <!-- ЕКРАН 3: Результат -->
  <div id="screen-result" class="screen">
    <h1>Результат!</h1>
    <div id="result-score" class="score-display"></div>
    <div id="result-stats" class="stats-block"></div>
    <div id="result-badges" class="badges-block"></div>
    <div id="result-grid" class="tasks-grid readonly"></div>
    <div class="result-actions">
      <button id="btn-retry" class="btn-primary">🔄 Спробувати ще</button>
      <button id="btn-home" class="btn-secondary">🏠 Головна</button>
    </div>
  </div>

  <!-- ЕКРАН 4: Таблиця рекордів -->
  <div id="screen-leaderboard" class="screen">
    <h1>🏆 Таблиця рекордів</h1>
    <div id="leaderboard-filters" class="filters"></div>
    <table id="leaderboard-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ім'я</th>
          <th>Набір</th>
          <th>Очки</th>
          <th>Час</th>
          <th>Правильно</th>
          <th>Бейджі</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody id="leaderboard-body"></tbody>
    </table>
    <button id="btn-leaderboard-home" class="btn-secondary">🏠 Головна</button>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

---

## app.js — повна логіка

### 1. Ініціалізація та стан

```js
// Глобальний стан гри
const state = {
  playerName: '',
  currentSet: null,      // об'єкт набору з tasks.json
  tasks: [],             // масив завдань поточної гри
  timeLimit: 180,        // секунди
  timeLeft: 180,
  timerInterval: null,
  startTime: null,
  isFinished: false,
};

// Завантаження при старті
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  loadPlayerName();
  renderHomeSets();
  bindEvents();
});
```

### 2. Завантаження JSON

```js
let tasksData = null;
let badgesData = null;

async function loadData() {
  const [t, b] = await Promise.all([
    fetch('data/tasks.json').then(r => r.json()),
    fetch('data/badges.json').then(r => r.json()),
  ]);
  tasksData = t;
  badgesData = b;
}
```

### 3. Навігація між екранами

```js
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}
```

### 4. Головна — рендер наборів

```js
function renderHomeSets() {
  const container = document.getElementById('sets-list');
  container.innerHTML = '';
  tasksData.sets.forEach(set => {
    const card = document.createElement('div');
    card.className = 'set-card' + (set.extra ? ' extra' : '');
    card.innerHTML = `
      <div class="set-label">${set.label}</div>
      <div class="set-meta">${set.tasks.length} прикладів · ${formatTime(set.timeLimit)}</div>
      ${set.extra ? '<div class="set-bonus">×1.5 очок</div>' : ''}
    `;
    card.addEventListener('click', () => startGame(set));
    container.appendChild(card);
  });
}
```

### 5. Старт гри

```js
function startGame(set) {
  const name = document.getElementById('player-name').value.trim();
  if (!name) {
    alert('Введи своє ім\'я!');
    return;
  }

  state.playerName = name;
  savePlayerName(name);
  state.currentSet = set;
  state.tasks = shuffleArray([...set.tasks]); // перемішати приклади
  state.timeLimit = set.timeLimit;
  state.timeLeft = set.timeLimit;
  state.isFinished = false;
  state.startTime = Date.now();

  document.getElementById('game-title').textContent = set.label;
  renderTasksGrid();
  startTimer();
  showScreen('game');

  // Фокус на перший інпут
  setTimeout(() => {
    const first = document.querySelector('.answer-input');
    if (first) first.focus();
  }, 100);
}
```

### 6. Рендер таблиці прикладів

```js
function renderTasksGrid() {
  const grid = document.getElementById('tasks-grid');
  grid.innerHTML = '';

  state.tasks.forEach((task, index) => {
    const cell = document.createElement('div');
    cell.className = 'task-cell';
    cell.dataset.index = index;

    const opSymbol = task.op === '*' ? '×' : '÷';
    cell.innerHTML = `
      <span class="task-text">${task.a} ${opSymbol} ${task.b} =</span>
      <input
        type="number"
        class="answer-input"
        data-index="${index}"
        inputmode="numeric"
        autocomplete="off"
      >
    `;
    grid.appendChild(cell);
  });

  // Enter переходить до наступного поля
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputs = Array.from(grid.querySelectorAll('.answer-input'));
      const idx = inputs.indexOf(e.target);
      if (idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      } else {
        checkAnswers();
      }
    }
  });
}
```

### 7. Таймер

```js
function startTimer() {
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      checkAnswers();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  el.textContent = formatTime(state.timeLeft);
  // Червоний колір коли лишилось менше 30 секунд
  el.classList.toggle('timer-danger', state.timeLeft <= 30);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
```

### 8. Перевірка відповідей та рахунок

```js
function checkAnswers() {
  if (state.isFinished) return;
  state.isFinished = true;
  clearInterval(state.timerInterval);

  const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
  const timeLeft = Math.max(0, state.timeLimit - timeSpent);

  const inputs = document.querySelectorAll('.answer-input');
  let correct = 0;
  const results = [];

  state.tasks.forEach((task, index) => {
    const input = inputs[index];
    const userAnswer = input ? parseInt(input.value, 10) : NaN;
    const correctAnswer = task.op === '*' ? task.a * task.b : task.a / task.b;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) correct++;
    results.push({ task, userAnswer, correctAnswer, isCorrect });
  });

  const total = state.tasks.length;
  const score = calculateScore(correct, total, timeLeft, state.currentSet.extra);
  const earnedBadges = calculateBadges(correct, total, timeLeft, state.currentSet);

  const attempt = {
    id: Date.now(),
    playerName: state.playerName,
    setId: state.currentSet.id,
    setLabel: state.currentSet.label,
    score,
    correct,
    total,
    timeSpent,
    timeLeft,
    badges: earnedBadges.map(b => b.id),
    date: new Date().toLocaleDateString('uk-UA'),
  };

  saveAttempt(attempt);
  showResult(results, attempt, earnedBadges);
}
```

### 9. Розрахунок очок

```js
function calculateScore(correct, total, timeLeft, isExtra) {
  let score = correct * 10;                         // 10 очок за правильну відповідь
  if (correct === total) score += 50;               // бонус за всі правильно
  score += Math.floor(timeLeft / 5);                // 1 очко за кожні 5 сек залишку
  if (isExtra) score = Math.round(score * 1.5);     // ×1.5 для екстра режиму
  return score;
}
```

### 10. Розрахунок бейджів

```js
function calculateBadges(correct, total, timeLeft, set) {
  const earned = [];
  const allBadges = badgesData.badges;
  const find = (id) => allBadges.find(b => b.id === id);

  // Перша спроба взагалі
  const history = getHistory();
  if (history.length === 1) earned.push(find('first'));

  // Жодної помилки
  if (correct === total) earned.push(find('sniper'));

  // Виконав за половину часу
  if (timeLeft >= set.timeLimit / 2) earned.push(find('lightning'));

  // Перфекціоніст (все правильно + більше половини часу)
  if (correct === total && timeLeft >= set.timeLimit / 2) earned.push(find('perfect'));

  // Стрік (3 підряд без помилок для цього набору)
  const setHistory = history.filter(a => a.setId === set.id);
  if (setHistory.length >= 3) {
    const last3 = setHistory.slice(-3);
    if (last3.every(a => a.correct === a.total)) earned.push(find('streak'));
  }

  // Майстер (екстра без помилок)
  if (set.extra && correct === total) earned.push(find('master'));

  // Рекордсмен
  const prevBest = Math.max(0, ...history.slice(0, -1).map(a => a.score));
  const currentScore = history[history.length - 1]?.score ?? 0;
  if (currentScore > prevBest && history.length > 1) earned.push(find('record'));

  return earned.filter(Boolean);
}
```

### 11. Екран результату

```js
function showResult(results, attempt, badges) {
  document.getElementById('result-score').innerHTML = `
    <div class="score-big">${attempt.score} очок</div>
    <div class="score-detail">
      ✅ ${attempt.correct} / ${attempt.total} правильно &nbsp;|&nbsp;
      ⏱ ${formatTime(attempt.timeSpent)}
    </div>
  `;

  // Бейджі
  const badgesEl = document.getElementById('result-badges');
  if (badges.length > 0) {
    badgesEl.innerHTML = '<h3>Отримані нагороди:</h3>' +
      badges.map(b => `
        <div class="badge-item">
          <img src="${b.icon}" alt="${b.label}" onerror="this.style.display='none'">
          <span class="badge-emoji">${b.emoji}</span>
          <span class="badge-label">${b.label}</span>
          <span class="badge-desc">${b.description}</span>
        </div>
      `).join('');
  } else {
    badgesEl.innerHTML = '';
  }

  // Таблиця з підсвіткою
  const grid = document.getElementById('result-grid');
  grid.innerHTML = '';
  results.forEach(({ task, userAnswer, correctAnswer, isCorrect }) => {
    const cell = document.createElement('div');
    const opSymbol = task.op === '*' ? '×' : '÷';
    cell.className = 'task-cell ' + (isCorrect ? 'correct' : 'wrong');
    cell.innerHTML = `
      <span class="task-text">${task.a} ${opSymbol} ${task.b} = </span>
      <span class="answer-shown ${isCorrect ? 'answer-correct' : 'answer-wrong'}">
        ${isCorrect ? correctAnswer : `<s>${userAnswer}</s> → ${correctAnswer}`}
      </span>
    `;
    grid.appendChild(cell);
  });

  showScreen('result');
}
```

### 12. LocalStorage — збереження та читання

```js
const STORAGE_KEY = 'math_trainer_history';
const NAME_KEY = 'math_trainer_name';

function saveAttempt(attempt) {
  const history = getHistory();
  history.push(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function savePlayerName(name) {
  localStorage.setItem(NAME_KEY, name);
}

function loadPlayerName() {
  const name = localStorage.getItem(NAME_KEY);
  if (name) document.getElementById('player-name').value = name;
}
```

### 13. Таблиця рекордів

```js
function renderLeaderboard() {
  const history = getHistory();
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '';

  // Сортуємо за очками (від більшого)
  const sorted = [...history].sort((a, b) => b.score - a.score);

  sorted.forEach((attempt, i) => {
    const badgeEmojis = (attempt.badges || [])
      .map(id => badgesData.badges.find(b => b.id === id)?.emoji || '')
      .join(' ');

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${attempt.playerName}</td>
      <td>${attempt.setLabel}</td>
      <td><strong>${attempt.score}</strong></td>
      <td>${formatTime(attempt.timeSpent)}</td>
      <td>${attempt.correct}/${attempt.total}</td>
      <td>${badgeEmojis}</td>
      <td>${attempt.date}</td>
    `;
    tbody.appendChild(tr);
  });

  if (sorted.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8">Ще немає результатів</td></tr>';
  }
}
```

### 14. Прив'язка подій

```js
function bindEvents() {
  document.getElementById('btn-check').addEventListener('click', checkAnswers);
  document.getElementById('btn-retry').addEventListener('click', () => {
    startGame(state.currentSet);
  });
  document.getElementById('btn-home').addEventListener('click', () => showScreen('home'));
  document.getElementById('btn-leaderboard').addEventListener('click', () => {
    renderLeaderboard();
    showScreen('leaderboard');
  });
  document.getElementById('btn-leaderboard-home').addEventListener('click', () => showScreen('home'));
}
```

### 15. Допоміжні функції

```js
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

---

## style.css — ключові стилі

### CSS змінні та базові стилі

```css
:root {
  --bg: #1a1a2e;
  --surface: #16213e;
  --card: #0f3460;
  --accent: #e94560;
  --accent2: #f5a623;
  --text: #eaeaea;
  --text-muted: #8892a4;
  --correct: #2ecc71;
  --wrong: #e74c3c;
  --radius: 12px;
  --font: 'Nunito', 'Segoe UI', sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  padding: 16px;
}

/* Підключи Google Fonts у head: */
/* <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet"> */
```

### Екрани

```css
.screen { display: none; }
.screen.active { display: block; }
```

### Картки наборів

```css
.sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.set-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 24px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  border: 2px solid transparent;
}

.set-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.set-card.extra {
  border-color: var(--accent2);
  background: linear-gradient(135deg, #1a1a2e, #2d1f00);
}

.set-label { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.set-bonus { color: var(--accent2); font-weight: 900; font-size: 1.1rem; margin-top: 8px; }
```

### Таблиця прикладів

```css
.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.task-cell {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid transparent;
}

.task-cell.correct { border-color: var(--correct); background: rgba(46,204,113,0.1); }
.task-cell.wrong   { border-color: var(--wrong);   background: rgba(231,76,60,0.1); }

.task-text { font-size: 1.1rem; font-weight: 700; white-space: nowrap; }

.answer-input {
  width: 64px;
  padding: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  background: var(--card);
  color: var(--text);
  border: 2px solid var(--accent);
  border-radius: 8px;
  outline: none;
}

.answer-input:focus { border-color: var(--accent2); box-shadow: 0 0 0 3px rgba(245,166,35,0.2); }

/* Прибираємо стрілки у number input */
.answer-input::-webkit-inner-spin-button,
.answer-input::-webkit-outer-spin-button { -webkit-appearance: none; }
```

### Таймер

```css
.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}

.timer {
  font-size: 2rem;
  font-weight: 900;
  color: var(--accent2);
  min-width: 80px;
  text-align: center;
  transition: color 0.3s;
}

.timer.timer-danger {
  color: var(--wrong);
  animation: pulse 0.5s infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); }
  to   { transform: scale(1.1); }
}
```

### Кнопки

```css
.btn-primary, .btn-secondary {
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-secondary {
  background: var(--card);
  color: var(--text);
  border: 2px solid var(--accent);
}

.btn-primary:hover, .btn-secondary:hover { transform: scale(1.03); opacity: 0.9; }
```

### Результат

```css
.score-big {
  font-size: 3rem;
  font-weight: 900;
  color: var(--accent2);
  text-align: center;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card);
  border-radius: var(--radius);
  padding: 12px 16px;
  margin: 8px 0;
}

.badge-emoji { font-size: 2rem; }
.badge-label { font-weight: 700; font-size: 1.1rem; }
.badge-desc  { color: var(--text-muted); font-size: 0.9rem; }

.answer-correct { color: var(--correct); font-weight: 700; }
.answer-wrong   { color: var(--wrong);   font-weight: 700; }
```

### Таблиця рекордів

```css
#leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

#leaderboard-table th,
#leaderboard-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--card);
}

#leaderboard-table th {
  background: var(--card);
  font-weight: 700;
}

#leaderboard-table tr:hover td { background: rgba(255,255,255,0.03); }
```

### Адаптив для планшету/телефону

```css
@media (max-width: 600px) {
  .tasks-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .score-big { font-size: 2rem; }

  .game-header { flex-direction: column; align-items: flex-start; }

  #leaderboard-table th:nth-child(8),
  #leaderboard-table td:nth-child(8) { display: none; } /* ховаємо дату на малих екранах */
}
```

---

## Деплой на Netlify

1. Зібрати всі файли в одну папку
2. Зайти на [app.netlify.com](https://app.netlify.com)
3. Зареєструватись (безкоштовно)
4. `Sites → Add new site → Deploy manually`
5. **Перетягнути папку** в браузер
6. Отримати посилання типу `https://назва.netlify.app`
7. Відкрити на планшеті — готово ✅

---

## Підказки для Copilot

При роботі з Copilot використовуй такі промпти:

- *"Generate the full app.js based on this spec"*
- *"Create the tasks grid render function that reads from state.tasks"*
- *"Implement the timer with danger state when under 30 seconds"*
- *"Write the badge calculation logic based on this rules table"*
- *"Make the leaderboard table sortable by score"*
- *"Add smooth CSS transitions between screens"*
