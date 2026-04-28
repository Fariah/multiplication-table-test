// 1. Ініціалізація та стан
const state = {
  playerName: '',
  userId: null,
  currentSet: null,
  tasks: [],
  timeLimit: 180,
  timeLeft: 180,
  timerInterval: null,
  startTime: null,
  isFinished: false,
};

// --- КОНФІГУРАЦІЯ SUPABASE ---
const SUPABASE_URL = 'https://mxcstpknilisaetqiepe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14Y3N0cGtuaWxpc2FldHFpZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTI4NjcsImV4cCI6MjA5Mjk2ODg2N30.hONBOBbedAXBmkgAisT2pYhxGhwLEjXP9MQGHOFQJSQ';

const sb = (SUPABASE_URL && SUPABASE_URL !== 'ВАШ_URL_ТУТ') ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

document.addEventListener('DOMContentLoaded', async () => {
  initUser();
  loadPlayerName();
  try {
    await loadData();
    renderHomeSets();
  } catch (err) {
    console.error('Помилка завантаження:', err);
  }
  bindEvents();
});

// 2. Завантаження JSON
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

// 3. Навігація
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

// 4. Рендер наборів
function renderHomeSets() {
  const container = document.getElementById('sets-list');
  if (!container || !tasksData) return;
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

// 5. Гра
function startGame(set) {
  const name = document.getElementById('player-name').value.trim();
  if (!name) { alert('Введи своє ім\'я!'); return; }
  state.playerName = name;
  savePlayerName(name);
  state.currentSet = set;
  state.tasks = generateDynamicTasks(set);
  state.timeLimit = set.timeLimit;
  state.timeLeft = set.timeLimit;
  state.isFinished = false;
  state.startTime = Date.now();
  document.getElementById('game-title').textContent = set.label;
  renderTasksGrid();
  startTimer();
  showScreen('game');
  setTimeout(() => {
    const first = document.querySelector('.answer-input');
    if (first) first.focus();
  }, 100);
}

function generateDynamicTasks(set) {
  let tasks = [];
  if (set.id === 'multiply-2-5') {
    for (let a = 2; a <= 5; a++) for (let b = 1; b <= 9; b++) tasks.push({ a, b, op: '*' });
  } else if (set.id === 'multiply-6-9') {
    for (let a = 6; a <= 9; a++) for (let b = 1; b <= 9; b++) tasks.push({ a, b, op: '*' });
  } else if (set.id === 'divide-extra') {
    for (let b = 2; b <= 9; b++) for (let res = 2; res <= 9; res++) tasks.push({ a: b * res, b, op: '/' });
    shuffleArray(tasks);
    return tasks.slice(0, 36);
  } else { tasks = [...set.tasks]; }
  return shuffleArray(tasks);
}

function renderTasksGrid() {
  const grid = document.getElementById('tasks-grid');
  grid.innerHTML = '';
  state.tasks.forEach((task, index) => {
    const cell = document.createElement('div');
    cell.className = 'task-cell';
    const opSymbol = task.op === '*' ? '×' : '÷';
    cell.innerHTML = `
      <span class="task-text">${task.a} ${opSymbol} ${task.b} =</span>
      <input type="number" class="answer-input" data-index="${index}" inputmode="numeric">
    `;
    grid.appendChild(cell);
  });
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputs = Array.from(grid.querySelectorAll('.answer-input'));
      const idx = inputs.indexOf(e.target);
      if (idx < inputs.length - 1) inputs[idx + 1].focus();
      else checkAnswers();
    }
  });
}

function startTimer() {
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) { clearInterval(state.timerInterval); checkAnswers(); }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  el.textContent = formatTime(state.timeLeft);
  el.classList.toggle('timer-danger', state.timeLeft <= 30);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

async function checkAnswers() {
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
    user_id: state.userId,
    player_name: state.playerName,
    set_label: state.currentSet.label,
    score, correct, total,
    time_spent: timeSpent,
    badges: earnedBadges.map(b => b.id),
  };
  saveAttemptLocal(attempt);
  if (sb) {
    const { error } = await sb.from('leaderboard').insert([attempt]);
    if (error) console.error('Помилка БД:', error.message);
  }
  showResult(results, { ...attempt, timeSpent, date: new Date().toLocaleDateString('uk-UA') }, earnedBadges);
}

function calculateScore(correct, total, timeLeft, isExtra) {
  let score = correct * 10;
  if (correct === total) score += 50;
  score += Math.floor(timeLeft / 5);
  if (isExtra) score = Math.round(score * 1.5);
  return score;
}

function calculateBadges(correct, total, timeLeft, set) {
  const earned = [];
  const allBadges = badgesData.badges;
  const find = (id) => allBadges.find(b => b.id === id);
  const history = getHistory();
  if (history.length === 1) earned.push(find('first'));
  if (correct === total) earned.push(find('sniper'));
  if (timeLeft >= set.timeLimit / 2) earned.push(find('lightning'));
  if (correct === total && timeLeft >= set.timeLimit / 2) earned.push(find('perfect'));
  const setHistory = history.filter(a => a.set_label === set.label);
  if (setHistory.length >= 2 && setHistory.slice(-2).every(a => a.correct === a.total) && correct === total) {
      earned.push(find('streak'));
  }
  if (set.extra && correct === total) earned.push(find('master'));
  return earned.filter(Boolean);
}

function showResult(results, attempt, badges) {
  document.getElementById('result-score').innerHTML = `
    <div class="score-big">${attempt.score} очок</div>
    <div class="score-detail">
      ✅ ${attempt.correct} / ${attempt.total} правильно &nbsp;|&nbsp; ⏱ ${formatTime(attempt.timeSpent)}
    </div>
  `;

  const badgesEl = document.getElementById('result-badges');
  if (badges.length > 0) {
    badgesEl.innerHTML = '<h3>Твої нагороди (тисни на них!):</h3>' +
      badges.map(b => `
        <div class="badge-item" onclick="alert('${b.label}: ${b.description}')" title="${b.description}">
          <span class="badge-emoji">${b.emoji}</span>
          <span class="badge-label">${b.label}</span>
        </div>
      `).join('');
  } else {
    badgesEl.innerHTML = '';
  }

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

const STORAGE_KEY = 'math_trainer_v6';
function initUser() {
  let id = localStorage.getItem('math_user_id');
  if (!id) { id = self.crypto.randomUUID(); localStorage.setItem('math_user_id', id); }
  state.userId = id;
}
function saveAttemptLocal(a) {
  const h = getHistory();
  h.push({ ...a, date: new Date().toLocaleDateString('uk-UA') });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(h.slice(-50)));
}
function getHistory() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function savePlayerName(n) { localStorage.setItem('math_name', n.substring(0, 20)); }
function loadPlayerName() {
  const n = localStorage.getItem('math_name');
  if (n) document.getElementById('player-name').value = n;
}

async function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '<tr><td colspan="8">Завантаження...</td></tr>';
  let data = [];
  if (sb) {
    const { data: cloud, error } = await sb.from('leaderboard').select('*').order('score', { ascending: false }).limit(50);
    if (!error) data = cloud;
  }
  tbody.innerHTML = '';
  data.forEach((a, i) => {
    const tr = document.createElement('tr');
    if (a.user_id === state.userId) tr.style.background = 'rgba(233, 69, 96, 0.2)';
    const badgeEmojis = (a.badges || []).map(id => {
        const b = badgesData.badges.find(badge => badge.id === id);
        return b ? b.emoji : '';
    }).join(' ');
    tr.innerHTML = `<td>${i+1}</td><td>${a.player_name}</td><td>${a.set_label}</td><td>${a.score}</td><td>${formatTime(a.time_spent)}</td><td>${a.correct}/${a.total}</td><td>${badgeEmojis}</td><td>${new Date(a.created_at).toLocaleDateString()}</td>`;
    tbody.appendChild(tr);
  });
}

function bindEvents() {
  document.getElementById('btn-check').addEventListener('click', checkAnswers);
  document.getElementById('btn-retry').addEventListener('click', () => startGame(state.currentSet));
  document.getElementById('btn-home').addEventListener('click', () => showScreen('home'));
  document.getElementById('btn-leaderboard').addEventListener('click', () => { renderLeaderboard(); showScreen('leaderboard'); });
  document.getElementById('btn-leaderboard-home').addEventListener('click', () => showScreen('home'));
}
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
