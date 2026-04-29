// 1. Initialization and State
const state = {
    playerName: '',
    userId: null,         // Unique ID for device identification
    currentSet: null,
    tasks: [],
    timeLimit: 180,
    timeLeft: 180,
    timerInterval: null,
    startTime: null,
    isFinished: false,
};

// --- SUPABASE CONFIGURATION ---
const SUPABASE_URL = 'https://mxcstpknilisaetqiepe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14Y3N0cGtuaWxpc2FldHFpZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTI4NjcsImV4cCI6MjA5Mjk2ODg2N30.hONBOBbedAXBmkgAisT2pYhxGhwLEjXP9MQGHOFQJSQ';

// Initialize Supabase client
const sb = (SUPABASE_URL && SUPABASE_KEY) ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Loading on start
document.addEventListener('DOMContentLoaded', async () => {
    console.log('App started. Supabase client:', sb ? 'Initialized' : 'Not initialized');
    initUser();
    loadPlayerName();
    try {
        await loadData();
        renderHomeSets();
    } catch (err) {
        console.error('Data loading error:', err);
        const container = document.getElementById('sets-list');
        if (container) {
            container.innerHTML = `<p style="color: var(--wrong); grid-column: 1/-1; padding: 20px; background: rgba(231,76,60,0.1); border-radius: 12px;">
        ⚠️ <b>Помилка завантаження даних.</b> Переконайтеся, що використовуєте локальний сервер.
      </p>`;
        }
    }
    bindEvents();
});

// 2. Load JSON Data
let tasksData = null;
let badgesData = null;

async function loadData() {
    if (window.location.protocol === 'file:') {
        throw new Error('Local file protocol detected');
    }

    const [t, b] = await Promise.all([
        fetch('data/tasks.json').then(r => r.json()),
        fetch('data/badges.json').then(r => r.json()),
    ]);
    tasksData = t;
    badgesData = b;
}

// 3. Screen Navigation
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + id);
    if (target) target.classList.add('active');
}

// 4. Render Home Sets
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

// 5. Start Game
function startGame(set) {
    const name = document.getElementById('player-name').value.trim();
    if (!name) {
        alert('Введіть своє ім\'я!');
        return;
    }

    state.playerName = name;
    savePlayerName(name);
    state.currentSet = set;
    state.tasks = generateDynamicTasks(set);
    state.timeLimit = set.timeLimit || DEFAULT_TIME_LIMIT;
    state.timeLeft = state.timeLimit;
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
        for (let a = 2; a <= 5; a++) {
            for (let b = 1; b <= 9; b++) tasks.push({a, b, op: '*'});
        }
    } else if (set.id === 'multiply-6-9') {
        for (let a = 6; a <= 9; a++) {
            for (let b = 1; b <= 9; b++) tasks.push({a, b, op: '*'});
        }
    } else if (set.id === 'divide-extra') {
        for (let b = 2; b <= 9; b++) {
            for (let res = 2; res <= 9; res++) {
                tasks.push({a: b * res, b, op: '/'});
            }
        }
        shuffleArray(tasks);
        return tasks.slice(0, 36);
    } else {
        tasks = [...set.tasks];
    }
    return shuffleArray(tasks);
}

// 6. Render Tasks Grid
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

// 7. Timer
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
    el.classList.toggle('timer-danger', state.timeLeft <= 30);
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// 8. Check Answers and Scoring
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
        results.push({task, userAnswer, correctAnswer, isCorrect});
    });

    const total = state.tasks.length;
    const score = calculateScore(correct, total, timeLeft, state.currentSet.extra);
    const earnedBadges = calculateBadges(correct, total, timeLeft, state.currentSet);

    const attempt = {
        user_id: state.userId,
        player_name: state.playerName,
        set_label: state.currentSet.label,
        score,
        correct,
        total,
        time_spent: timeSpent,
        badges: earnedBadges.map(b => b.id),
    };

    saveAttemptLocal(attempt);

    if (sb) {
        console.log('Спроба синхронізації з Supabase:', attempt);
        try {
            const { data, error } = await sb.from('leaderboard').insert([attempt]);
            if (error) {
                console.error('Помилка Supabase при записі:', error.message, error.details);
            } else {
                console.log('Дані успішно збережено в Supabase');
            }
        } catch (e) {
            console.error('Помилка мережі при синхронізації:', e);
        }
    } else {
        console.warn('Supabase не ініціалізовано (перевірте URL/Key)');
    }

    showResult(results, {...attempt, timeSpent, date: new Date().toLocaleDateString('uk-UA')}, earnedBadges);
}

// 9. Score Calculation
function calculateScore(correct, total, timeLeft, isExtra) {
    let score = correct * 10;
    if (correct === total) score += 50;
    score += Math.floor(timeLeft / 5);
    if (isExtra) score = Math.round(score * 1.5);
    return score;
}

// 10. Badge Calculation
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

    const prevBest = Math.max(0, ...history.slice(0, -1).map(a => a.score));
    const currentScore = (history.length > 0) ? history[history.length - 1].score : 0;
    if (currentScore > prevBest && history.length > 1) earned.push(find('record'));

    return earned.filter(Boolean);
}

// 11. Result Screen
function showResult(results, attempt, badges) {
    document.getElementById('result-score').innerHTML = `
    <div class="score-big">${attempt.score} очок</div>
    <div class="score-detail">
      ✅ ${attempt.correct} / ${attempt.total} правильно &nbsp;|&nbsp; ⏱ ${formatTime(attempt.timeSpent || 0)}
    </div>
  `;

    const badgesEl = document.getElementById('result-badges');
    if (badges.length > 0) {
        badgesEl.innerHTML = '<h3>Ваші нагороди:</h3>' +
            badges.map(b => `
        <div class="badge-item" title="${b.description}">
          <span class="badge-emoji">${b.emoji}</span>
          <span class="badge-label">${b.label}</span>
        </div>
      `).join('');
    } else {
        badgesEl.innerHTML = '';
    }

    const grid = document.getElementById('result-grid');
    grid.innerHTML = '';
    results.forEach(({task, userAnswer, correctAnswer, isCorrect}) => {
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

// 12. LocalStorage and UserID
const STORAGE_KEY = 'math_trainer_history_v6';
const NAME_KEY = 'math_trainer_name';
const USER_ID_KEY = 'math_trainer_user_id';

function initUser() {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        if (self.crypto && self.crypto.randomUUID) {
            userId = self.crypto.randomUUID();
        } else {
            userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }
        localStorage.setItem(USER_ID_KEY, userId);
    }
    state.userId = userId;
    console.log('User ID:', state.userId);
}

function saveAttemptLocal(attempt) {
    const history = getHistory();
    history.push({...attempt, date: new Date().toLocaleDateString('uk-UA'), id: Date.now()});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-50)));
}

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function savePlayerName(name) {
    localStorage.setItem(NAME_KEY, name.substring(0, 20));
}

function loadPlayerName() {
    const name = localStorage.getItem(NAME_KEY);
    if (name) document.getElementById('player-name').value = name;
}

// 13. Leaderboard Table
let currentLeaderboardFilter = '';

async function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    const filtersEl = document.getElementById('leaderboard-filters');
    if (!tbody || !filtersEl) return;

    // Initialize filter if empty
    if (!currentLeaderboardFilter && tasksData && tasksData.sets.length > 0) {
        currentLeaderboardFilter = tasksData.sets[0].label;
    }

    // Render filters
    filtersEl.innerHTML = '';
    
    // Original sets filters
    tasksData.sets.forEach(set => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (currentLeaderboardFilter === set.label ? ' active' : '');
        btn.textContent = set.label;
        btn.onclick = () => {
            currentLeaderboardFilter = set.label;
            renderLeaderboard();
        };
        filtersEl.appendChild(btn);
    });

    // Add "My Results" filter
    const myBtn = document.createElement('button');
    myBtn.className = 'filter-btn' + (currentLeaderboardFilter === 'my' ? ' active' : '');
    myBtn.innerHTML = '👤 Мої результати';
    myBtn.onclick = () => {
        currentLeaderboardFilter = 'my';
        renderLeaderboard();
    };
    filtersEl.appendChild(myBtn);

    tbody.innerHTML = '<tr><td colspan="8">Завантаження...</td></tr>';

    let data = [];
    const isMyFilter = currentLeaderboardFilter === 'my';

    if (sb) {
        try {
            let query = sb.from('leaderboard').select('*');
            
            if (isMyFilter) {
                query = query.eq('user_id', state.userId).order('created_at', {ascending: false});
            } else {
                query = query.eq('set_label', currentLeaderboardFilter).order('score', {ascending: false});
            }

            const {data: cloudData, error} = await query.limit(isMyFilter ? 100 : 200);
            if (error) throw error;
            data = cloudData;
        } catch (e) {
            console.error('Помилка завантаження з хмари:', e);
            data = getHistory();
            if (isMyFilter) {
                data = data.filter(a => a.user_id === state.userId).sort((a, b) => b.id - a.id);
            } else {
                data = data.filter(a => a.set_label === currentLeaderboardFilter).sort((a, b) => b.score - a.score);
            }
        }
    } else {
        data = getHistory();
        if (isMyFilter) {
            data = data.filter(a => a.user_id === state.userId).sort((a, b) => b.id - a.id);
        } else {
            data = data.filter(a => a.set_label === currentLeaderboardFilter).sort((a, b) => b.score - a.score);
        }
    }

    let displayData = [];
    if (isMyFilter) {
        // Show everything for user
        displayData = data;
    } else {
        // Keep only best result for each user for global sets
        const seenUsers = new Set();
        for (const attempt of data) {
            if (!seenUsers.has(attempt.user_id)) {
                displayData.push(attempt);
                seenUsers.add(attempt.user_id);
            }
            if (displayData.length >= 50) break;
        }
    }

    tbody.innerHTML = '';
    displayData.forEach((attempt, i) => {
        const badgeIcons = (attempt.badges || [])
            .map(id => {
                const b = badgesData.badges.find(badge => badge.id === id);
                return b ? `<span class="leaderboard-badge" title="${b.label}: ${b.description}">${b.emoji}</span>` : '';
            })
            .join(' ');

        const dateStr = attempt.created_at
            ? new Date(attempt.created_at).toLocaleDateString('uk-UA')
            : attempt.date || '';

        const tr = document.createElement('tr');
        if (attempt.user_id === state.userId) tr.style.background = 'rgba(233, 69, 96, 0.2)';

        tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${attempt.player_name || 'Анонім'}</td>
      <td>${attempt.set_label}</td>
      <td><strong>${attempt.score}</strong></td>
      <td>${formatTime(attempt.time_spent || 0)}</td>
      <td>${attempt.correct}/${attempt.total}</td>
      <td style="font-size: 1.2rem">${badgeIcons}</td>
      <td>${dateStr}</td>
    `;
        tbody.appendChild(tr);
    });

    if (displayData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Немає результатів для цього набору</td></tr>';
    }
}

// 14. Event Binding
function bindEvents() {
    document.getElementById('btn-check').addEventListener('click', checkAnswers);
    document.getElementById('btn-retry').addEventListener('click', () => startGame(state.currentSet));
    document.getElementById('btn-home').addEventListener('click', () => showScreen('home'));
    document.getElementById('btn-leaderboard').addEventListener('click', () => {
        renderLeaderboard();
        showScreen('leaderboard');
    });
    document.getElementById('btn-leaderboard-home').addEventListener('click', () => showScreen('home'));
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
