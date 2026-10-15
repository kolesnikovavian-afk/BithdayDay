/* ============================================
   Зелёный Биом — приложение (v2, Яндекс.Музыка)
   ============================================ */

// ============================================================
//  НАСТРОЙКА МУЗЫКИ
//  Вставь обычные ссылки из Яндекс.Музыки — приложение само
//  превратит их в iframe-embed.
//
//  Как получить ссылку:
//  1. Открой трек в Яндекс.Музыке
//  2. Три точки → Поделиться → Скопировать ссылку
//  3. Вставь сюда
//
//  Форматы, которые понимает приложение:
//   • https://music.yandex.ru/album/1234567/track/8901234
//   • https://music.yandex.ru/track/8901234
//   • https://music.yandex.ru/album/1234567
//   • https://music.yandex.ru/users/user/playlists/1234
// ============================================================

const MUSIC = {
  // Sqwoz Bab — BAZA
  baza: 'https://music.yandex.ru/album/36104524/track/137904480?utm_source=web&utm_medium=copy_link',

  // C418 — Sweden
  sweden: 'https://music.yandex.ru/album/39791459/track/146310631?utm_source=web&utm_medium=copy_link',

  // Нейромонах Феофан — Пляс
  ariaMath: 'https://music.yandex.ru/album/3347333/track/28038563?utm_source=web&utm_medium=copy_link',

  // C418 — Subwoofer Lullaby
  subwooferLullaby: 'https://music.yandex.ru/album/39791459/track/146310605?utm_source=web&utm_medium=copy_link'
};

// ---------- ПРЕОБРАЗОВАНИЕ ССЫЛОК ЯНДЕКС.МУЗЫКИ ----------
function toYandexIframe(url) {
  if (!url || url.startsWith('REPLACE_')) {
    return null;
  }

  // Уже iframe — вернуть как есть
  if (url.includes('/iframe/')) return url;

  // album/{albumId}/track/{trackId}
  let m = url.match(/album\/(\d+)\/track\/(\d+)/);
  if (m) return `https://music.yandex.ru/iframe/#track/${m[2]}/${m[1]}`;

  // track/{trackId}
  m = url.match(/\/track\/(\d+)/);
  if (m) return `https://music.yandex.ru/iframe/#track/${m[1]}`;

  // users/{user}/playlists/{kind}
  m = url.match(/users\/([^/]+)\/playlists\/(\d+)/);
  if (m) return `https://music.yandex.ru/iframe/#playlist/${m[1]}/${m[2]}`;

  // album/{albumId}
  m = url.match(/\/album\/(\d+)/);
  if (m) return `https://music.yandex.ru/iframe/#album/${m[1]}`;

  // Не распознали — вернуть как есть (может сработать)
  return url;
}

function normalizeYandexLink(url) {
  // Убираем ?si=... и прочие хвосты
  if (!url) return url;
  return url.split('?')[0].split('&')[0];
}

function renderMusicPlayer(link, title) {
  const clean = normalizeYandexLink(link);
  const embed = toYandexIframe(clean);

  if (!embed) {
    return `
      <div class="card">
        <h2>🎵 Музыка не настроена</h2>
        <p class="muted small">Открой app.js и вставь ссылку на Яндекс.Музыку вместо <code>REPLACE_...</code></p>
      </div>
    `;
  }

  return `
    <div class="card">
      <h2>🎵 ${title || 'Слушай'}</h2>
      <iframe
        class="ym-player"
        src="${embed}"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style="width:100%; height:180px; border-radius:12px; background:#000; display:block;">
      </iframe>
      <p class="muted small" style="margin-top:10px;">
        Если плеер не виден — открой
        <a href="${clean}" target="_blank" rel="noopener" style="color:var(--emerald);">трек в Яндекс.Музыке</a>.
      </p>
    </div>
  `;
}

// ============================================================
//  ИЗУМРУДЫ
// ============================================================
const EMERALDS = [
  { id: 1, stage: 'Спальня', digit: '2', letter: 'П' },
  { id: 2, stage: 'Ванная',  digit: '5', letter: 'О' },
  { id: 3, stage: 'Кухня',   digit: '1', letter: 'Р' },
  { id: 4, stage: 'Офис',    digit: '0', letter: 'А' }
];

// ============================================================
//  ДЕЙСТВИЯ ПО QR
// ============================================================
const QR_ACTIONS = {

  // ---------- СТАРТ ----------
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
  },

  // ---------- ЭТАП 2 · ВАННАЯ ----------
  'BATH_MUSIC': {
    stage: 'water',
    badge: '🔵 БИОМ ВОДЫ',
    title: 'Послушай песню',
    subtitle: 'Ответ спрятан в тексте',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.baza, 'Sqwoz Bab')}
        <div class="card">
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
      const btn = document.getElementById('dance-btn');
      if (btn) btn.addEventListener('click', startDance);
    }
  },

  // ---------- ЭТАП 3 · КУХНЯ ----------
  'KITCHEN_MUSIC': {
    stage: 'sand',
    badge: '🟡 ДЕРЕВНЯ',
    title: 'Подкрепиться',
    subtitle: 'Фоновая музыка',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.sweden, 'C418 — Sweden')}
        <div class="card">
          <h2>⚔️ Задание викинга</h2>
          <p>Найди на столе рецепт медовухи. Или открой следующее действие — там всё есть.</p>
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

  // ---------- ЭТАП 4 · ОФИС ----------
  'OFFICE_MUSIC': {
    stage: 'cosmic',
    badge: '🟣 КОСМОС',
    title: 'Холодная пустота',
    subtitle: 'Aria Math',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.ariaMath, 'C418 — Aria Math')}
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

  // ---------- ФИНАЛ ----------
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

  // Бонус: отдельный QR со стартовой песней
  'START_MUSIC': {
    stage: 'green',
    badge: '🟢 СТАРТ',
    title: 'Твой саундтрек',
    subtitle: 'Subwoofer Lullaby',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.subwooferLullaby, 'C418 — Subwoofer Lullaby')}
        <div class="card">
          <p>Первый изумруд — в шкафу, на моей стороне, среди моих вещей. Ищи его. 🎁</p>
        </div>
      `;
    }
  }
};

// ============================================================
//  ПРИЯТНЫЕ ПОЖЕЛАНИЯ
// ============================================================
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

// ============================================================
//  СОСТОЯНИЕ
// ============================================================
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
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
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
  const countEl = document.getElementById('found-count');
  if (countEl) countEl.textContent = count;

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
  const errEl = document.getElementById('scan-error');
  if (errEl) errEl.textContent = '';

  if (typeof Html5Qrcode === 'undefined') {
    if (errEl) errEl.textContent = 'Библиотека сканера не загружена. Проверь интернет.';
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
    () => {}
  ).catch(err => {
    console.error(err);
    if (errEl) errEl.textContent =
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
  const key = text.toUpperCase().trim();
  const action = QR_ACTIONS[key];

  if (!action) {
    toast(`Неизвестный QR: ${text.substring(0, 30)}`);
    return;
  }

  showAction(key, action);
}

// ---------- ACTION ----------
function showAction(key, action) {
  state.currentAction = { key, action };

  const titleEl = document.getElementById('action-title');
  const bodyEl = document.getElementById('action-body');

  if (titleEl) titleEl.textContent = action.title;

  if (bodyEl) {
    bodyEl.className = 'stage-' + action.stage;
    bodyEl.innerHTML = `
      <div class="action-hero">
        <span class="badge">${action.badge}</span>
        <h2>${action.title}</h2>
        <p>${action.subtitle}</p>
      </div>
      <div id="action-content"></div>
    `;

    const contentEl = document.getElementById('action-content');
    if (contentEl) action.render(contentEl);

    // Если у действия есть изумруд — отметить
    if (action.emerald && action.emerald.id) {
      const emerald = EMERALDS.find(e => e.id === action.emerald.id);
      if (emerald && contentEl) {
        const reward = document.createElement('div');
        reward.className = 'reward';
        reward.innerHTML = `
          <div class="gem-mini"></div>
          <div class="reward-text">Изумруд ${emerald.digit}${emerald.letter} отмечен</div>
        `;
        contentEl.appendChild(reward);
        markEmerald(action.emerald.id);
      }
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

  const el = document.getElementById('wish-text');
  if (el) el.textContent = WISHES[idx];
  showView('view-wish');
}

function closeWish() {
  showView('view-home');
}

// ---------- MANUAL ----------
function openManual() {
  const list = document.getElementById('manual-list');
  if (!list) return;
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
  if (!el) return;
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

// Отключаем случайный zoom на iOS
document.addEventListener('gesturestart', e => e.preventDefault());
