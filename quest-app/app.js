/* ============================================
   Зелёный Биом — приложение
   ============================================ */

// ---------- КОНФИГ (заполни своими YouTube ID) ----------
const MUSIC = {
  baza:             '=wPRO-pPOQ1U&list=RDwPRO-pPOQ1U&start_radio=1',
  sweden:           '=aBkTkxKDduc&list=RDaBkTkxKDduc&start_radio=1',
  ariaMath:         '=atgjKEgSqSU&list=RDatgjKEgSqSU&start_radio=1',
  subwooferLullaby: '=Gpd85y_iTxY&list=RDGpd85y_iTxY&start_radio=1'
};

// ---------- ИЗУМРУДЫ ----------
const EMERALDS = [
  { id: 1, stage: 'Спальня', digit: '2', letter: 'П' },
  { id: 2, stage: 'Ванная',  digit: '5', letter: 'О' },
  { id: 3, stage: 'Кухня',   digit: '1', letter: 'Р' },
  { id: 4, stage: 'Офис',    digit: '0', letter: 'А' }
];

// ---------- ДЕЙСТВИЯ ПО QR ----------
const QR_ACTIONS = {

  // ЭТАП 2 · ВАННАЯ
  'BATH_MUSIC': {
    stage: 'water',
    badge: '🔵 БИОМ ВОДЫ',
    title: 'Послушай песню',
    subtitle: 'Ответ спрятан в тексте',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <div class="yt-wrap">
            <iframe src="https://www.youtube.com/embed/${MUSIC.baza}?autoplay=1&mute=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          <p class="muted small">Если видео не играет — нажми ▶ на плеере или открой в YouTube.</p>
          <hr style="border:none;border-top:1px solid var(--border);margin:16px 0;">
          <p><b>Что делают мужики в этой песне?</b></p>
          <p>Найди это в ванной. И посмотри внимательно — где-то рядом спрятан конверт.</p>
          <button class="hint-link" onclick="toggleHint('hint-bath')">нужна подсказка?</button>
          <div class="hidden-hint" id="hint-bath">Sqwoz Bab поёт: «мужики танцуют тазом». Ищи таз.</div>
        </div>
      `;
    }
  },

  'BATH_DANCE': {
    stage: 'water',
    badge: '🔵 БИОМ ВОДЫ',
    title: 'Танцуй тазом',
    subtitle: '10 секунд',
    emerald: { id: 2 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <p>Танцуй тазом. Ровно 10 секунд. Не смейся — это часть квеста. 😄</p>
          <div class="timer-display idle" id="timer">10</div>
          <button class="btn primary big" id="dance-btn">НАЧАТЬ ТАНЕЦ</button>
        </div>
        <div id="dance-result" style="display:none;">
          <div class="card">
            <h2 style="color:var(--emerald);">🎉 МОЛОДЕЦ!</h2>
            <p>Теперь расшифруй числа. Каждое = буква алфавита (А=1, Б=2, … Я=33).</p>
            <div class="cipher-block">
              <div class="cipher-numbers">12 21 23 15 33</div>
              <div class="cipher-hint">Куда идёшь дальше?</div>
            </div>
            <button class="hint-link" onclick="toggleHint('hint-cipher')">нужна подсказка?</button>
            <div class="hidden-hint" id="hint-cipher">12 = К · 21 = У · 23 = Х · 15 = Н · 33 = Я</div>
          </div>
        </div>
      `;
      document.getElementById('dance-btn').addEventListener('click', startDance);
    }
  },

  // ЭТАП 3 · КУХНЯ
  'KITCHEN_MUSIC': {
    stage: 'sand',
    badge: '🟡 ДЕРЕВНЯ',
    title: 'Подкрепиться',
    subtitle: 'Фоновая музыка',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <div class="yt-wrap">
            <iframe src="https://www.youtube.com/embed/${MUSIC.sweden}?autoplay=1&mute=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
        <div class="card">
          <h2>⚔️ Задание викинга</h2>
          <p>Найди на столе рецепт медовухи. Отсканируй QR на рецепте — там инструкция.</p>
          <p class="muted small">Или сразу смотри рецепт, если он рядом.</p>
        </div>
      `;
    }
  },

  'KITCHEN_RECIPE': {
    stage: 'sand',
    badge: '🟡 ДЕРЕВНЯ',
    title: 'Рецепт медовухи',
    subtitle: 'За викингов!',
    emerald: { id: 3 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <h2>🍯 Медовуха по-нашему</h2>
          <div class="recipe-item"><span class="icon">🍯</span><span>Мёд — 1 ч.л.</span></div>
          <div class="recipe-item"><span class="icon">🍋</span><span>Лимон — ломтик</span></div>
          <div class="recipe-item"><span class="icon">🌿</span><span>Мята — пара листиков</span></div>
          <div class="recipe-item"><span class="icon">☕</span><span>Горячая вода — кружка</span></div>
          <p style="margin-top:14px;">Смешай всё. Выпей глоток. За викингов. ⚔️</p>
        </div>
        <div class="card">
          <h2>💎 Где изумруд?</h2>
          <p>Он там, <b>где ты прячешь сладкое от самой себя</b>.</p>
        </div>
        <div class="card">
          <h2>📝 Задание дальше</h2>
          <p>Слово из пяти букв:</p>
          <div class="cipher-block">
            <div class="cipher-numbers">С О Ф И Т</div>
            <div class="cipher-hint">Одна буква лишняя. Убери её — получишь комнату.</div>
          </div>
          <button class="hint-link" onclick="toggleHint('hint-anagram')">нужна подсказка?</button>
          <div class="hidden-hint" id="hint-anagram">Убери Т. Осталось СОФИ. Переставь → ОФИС.</div>
        </div>
      `;
    }
  },

  // ЭТАП 4 · ОФИС
  'OFFICE_MUSIC': {
    stage: 'cosmic',
    badge: '🟣 КОСМОС',
    title: 'Холодная пустота',
    subtitle: 'Aria Math',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <div class="yt-wrap">
            <iframe src="https://www.youtube.com/embed/${MUSIC.ariaMath}?autoplay=1&mute=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
        <div class="card">
          <h2>🐈 Кот Марс</h2>
          <p>Здесь живёт единственное живое существо на орбите — <b>кот Марс</b>.</p>
          <p>Найди конверт на столе. Там куда идти дальше.</p>
        </div>
      `;
    }
  },

  'OFFICE_HINT': {
    stage: 'cosmic',
    badge: '🟣 КОСМОС',
    title: 'Домик Марса',
    subtitle: 'Забери своё',
    emerald: { id: 4 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <h2>🐈 Послание от Марса</h2>
          <p>Мяу. Ты нашла мой домик. Здесь лежит твой последний изумруд.</p>
          <p>И конверт. Прочитай его — там куда идти дальше.</p>
        </div>
        <div class="card">
          <h2>📖 Следующая подсказка</h2>
          <p>Иди в зал. На полке — твоя <b>первая книга</b>. Та, что ты читала раньше всех.</p>
          <p><b>«Властелин колец»</b>. Внутри — конверт.</p>
        </div>
      `;
    }
  },

  // ФИНАЛ
  'FINAL': {
    stage: 'green',
    badge: '🟢 ФИНАЛ',
    title: 'Пора',
    subtitle: 'Ты прошла все биомы',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        <div class="card" style="text-align:center;">
          <div style="font-size:64px; line-height:1;">💎</div>
          <h2 style="color:var(--emerald); font-size:22px; letter-spacing:2px;">ПОРА</h2>
          <p style="margin-top:12px;">Ты собрала все изумруды. Ты станцевала тазом. Ты сварила медовуху.</p>
          <p>Ты расшифровала все шифры.</p>
          <p style="margin-top:16px;"><b>Иди в зал. Найди свою первую книгу.</b></p>
          <p class="muted small">«Властелин колец». Внутри — конверт.</p>
        </div>
      `;
    }
  },

  // СТАРТ
  'START': {
    stage: 'green',
    badge: '🟢 СТАРТ',
    title: 'Добро пожаловать',
    subtitle: 'Ты в новом мире',
    emerald: { id: 1 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <p><b>Ты заспавнилась в новом мире.</b></p>
          <p>Правила: 4 биома, 4 изумруда, один подарок.</p>
          <p>Первый изумруд — в шкафу, на моей стороне, среди моих вещей. Ищи его. 🎁</p>
        </div>
      `;
    }
  }
};

// ---------- ПРИЯТНЫЕ ПОЖЕЛАНИЯ ----------
const WISHES = [
  'Ты — мой самый любимый биом. Даже если бы вокруг были только пустоши.',
  'Я бы прошёл с тобой и Вальхейм, и Майнкрафт, и любую другую игру. Лишь бы с тобой.',
  'Ты как C418 — с тобой любой момент становится саундтреком.',
  'Спасибо, что ты есть. Даже когда сгораешь от крапера — ты моя любимая.',
  'Ты — изумруд в моей инвентарной сетке. Редкая, ценная, моя.',
  'Если бы жизнь была игрой, я бы выбрал тебя напарником на все квесты.',
  'Ты делаешь обычные дни похожими на закат в Майнкрафте. Тихими и красивыми.',
  'Ты умеешь строить миры там, где другие видят просто пустоту. Я это люблю в тебе.',
  'Ты не просто девушка. Ты — целый биом. С лесами, реками и странными грибами.',
  'Я люблю тебя больше, чем C418 любит Швецию. А он её очень любит.',
  'С тобой даже поход к холодильнику становится приключением.',
  'Ты — мой спавн-поинт. Куда бы я ни ушёл, я хочу вернуться к тебе.',
  'Пусть у тебя будет много ресурсов, мало криперов и бесконечный инвентарь.',
  'Ты смеёшься как Subwoofer Lullaby звучит — тихо и по-домашнему. Я это обожаю.',
  'Спасибо, что ты рядом. Это лучшее, что случилось в моём мире.',
  'Ты — причина, по которой я вообще захотел строить что-то серьёзное.',
  'Люблю тебя за то, как ты злишься на мелочи. И за то, как потом смеёшься.',
  'Ты мой самый уютный биом. Заходишь в него — и не хочется выходить.',
  'Ты — та девушка, ради которой я готов пройти квест без подсказок.',
  'Люблю тебя больше, чем любой винил. И это, знаешь, много.'
];

// ---------- СОСТОЯНИЕ ----------
const state = {
  found: loadFound(),
  currentAction: null,
  scanner: null,
  danceInterval: null
};

function loadFound() {
  try {
    return JSON.parse(localStorage.getItem('biome_found') || '{}');
  } catch (e) { return {}; }
}

function saveFound() {
  try {
    localStorage.setItem('biome_found', JSON.stringify(state.found));
  } catch (e) {}
}

// ---------- НАВИГАЦИЯ ----------
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- ИЗУМРУДЫ ----------
function renderEmeralds() {
  const grid = document.getElementById('emerald-grid');
  if (!grid) return;
  grid.innerHTML = EMERALDS.map(e => {
    const filled = !!state.found[e.id];
    return `
      <div class="emerald-slot ${filled ? 'filled' : ''}" onclick="toggleEmerald(${e.id})">
        <div class="stage-name">${e.stage}</div>
        <div class="gem"></div>
        <div class="value">${filled ? e.digit + e.letter : '· ·'}</div>
      </div>
    `;
  }).join('');

  const count = Object.values(state.found).filter(Boolean).length;
  document.getElementById('found-count').textContent = count;

  const hints = [
    'Сканируй QR-коды или отмечай изумруды вручную.',
    'Один найден. Ищи следующий.',
    'Два есть. Продолжай.',
    'Три. Ещё один — и финал.',
    'Все собраны! Сканируй FINAL или открой финал.'
  ];
  const el = document.getElementById('progress-hint');
  if (el) el.textContent = hints[count];
}

function toggleEmerald(id) {
  if (state.found[id]) {
    toast('Уже найден ✨');
    return;
  }
  state.found[id] = true;
  saveFound();
  renderEmeralds();
  const e = EMERALDS.find(x => x.id === id);
  toast(`Изумруд ${e.digit}${e.letter} найден!`);
}

function markEmerald(id) {
  if (!state.found[id]) {
    state.found[id] = true;
    saveFound();
    renderEmeralds();
  }
}

// ---------- SCANNER ----------
function openScanner() {
  showView('view-scanner');
  document.getElementById('scan-error').textContent = '';

  if (typeof Html5Qrcode === 'undefined') {
    document.getElementById('scan-error').textContent = 'Библиотека сканера не загружена. Проверь интернет.';
    return;
  }

  const scanner = new Html5Qrcode('reader');
  state.scanner = scanner;

  scanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => {
      closeScanner();
      handleQRContent(decodedText.trim());
    },
    (err) => { /* ignore */ }
  ).catch(err => {
    console.error(err);
    document.getElementById('scan-error').textContent =
      'Не удалось открыть камеру. Разреши доступ к камере в браузере.';
  });
}

function closeScanner() {
  if (state.scanner) {
    state.scanner.stop().then(() => {
      state.scanner.clear();
      state.scanner = null;
    }).catch(() => {});
  }
  showView('view-home');
}

function handleQRContent(text) {
  const action = QR_ACTIONS[text.toUpperCase().trim()];

  if (!action) {
    toast(`Неизвестный QR: ${text.substring(0, 30)}`);
    return;
  }

  showAction(text.toUpperCase().trim(), action);
}

// ---------- ACTION ----------
function showAction(key, action) {
  state.currentAction = { key, action };

  const titleEl = document.getElementById('action-title');
  const bodyEl = document.getElementById('action-body');

  titleEl.textContent = action.title;

  bodyEl.className = 'stage-' + action.stage;
  bodyEl.innerHTML = `
    <div class="action-hero">
      <span class="badge">${action.badge}</span>
      <h2>${action.title}</h2>
      <p>${action.subtitle}</p>
    </div>
    <div id="action-content"></div>
  `;

  action.render(document.getElementById('action-content'));

  // Если у действия есть изумруд — отметить
  if (action.emerald && action.emerald.id) {
    const emerald = EMERALDS.find(e => e.id === action.emerald.id);
    if (emerald) {
      const reward = document.createElement('div');
      reward.className = 'reward';
      reward.innerHTML = `
        <div class="gem-mini"></div>
        <div class="reward-text">Изумруд ${emerald.digit}${emerald.letter} отмечен</div>
      `;
      document.getElementById('action-content').appendChild(reward);
      markEmerald(action.emerald.id);
    }
  }

  showView('view-action');
}

function closeAction() {
  showView('view-home');
}

// ---------- DANCE TIMER ----------
function startDance() {
  if (state.danceInterval) return;

  const display = document.getElementById('timer');
  const btn = document.getElementById('dance-btn');
  if (!display || !btn) return;

  let seconds = 10;
  display.classList.remove('idle', 'done');
  btn.disabled = true;
  btn.textContent = 'ТАНЦУЙ!';
  btn.style.opacity = '0.6';

  display.textContent = seconds;

  state.danceInterval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(state.danceInterval);
      state.danceInterval = null;
      display.textContent = '🎉';
      display.classList.add('done');
      btn.textContent = 'ГОТОВО';
      const result = document.getElementById('dance-result');
      if (result) {
        result.style.display = 'block';
        setTimeout(() => result.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    } else {
      display.textContent = seconds;
    }
  }, 1000);
}

// ---------- HINTS ----------
function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('show');
}

// ---------- WISH ----------
let lastWishIndex = -1;
function showWish() {
  let idx;
  do {
    idx = Math.floor(Math.random() * WISHES.length);
  } while (idx === lastWishIndex && WISHES.length > 1);
  lastWishIndex = idx;

  document.getElementById('wish-text').textContent = WISHES[idx];
  showView('view-wish');
}

function closeWish() {
  showView('view-home');
}

// ---------- MANUAL ----------
function openManual() {
  const list = document.getElementById('manual-list');
  list.innerHTML = Object.keys(QR_ACTIONS).map(key => {
    const a = QR_ACTIONS[key];
    return `
      <div class="manual-item" onclick="handleQRContent('${key}')">
        <div class="code">${key}</div>
        <div class="desc">${a.badge} · ${a.title}</div>
      </div>
    `;
  }).join('');
  showView('view-manual');
}

function closeManual() {
  showView('view-home');
}

// ---------- RESET ----------
function resetProgress() {
  if (!confirm('Сбросить прогресс? Все изумруды снова будут не найдены.')) return;
  state.found = {};
  saveFound();
  renderEmeralds();
  toast('Прогресс сброшен');
}

// ---------- TOAST ----------
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// ---------- INIT ----------
window.addEventListener('load', () => {
  renderEmeralds();
  showView('view-home');
});

// PWA: не даём скроллиться body, если что-то пошло не так
document.addEventListener('gesturestart', e => e.preventDefault());
