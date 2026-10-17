/* ============================================
   Зелёный Биом — приложение (v4.5)
   ============================================ */

// ============================================================
//  МУЗЫКА (ссылки на Яндекс.Музыку)
// ============================================================
const MUSIC = {
  wardrobe: 'https://music.yandex.ru/album/39791459/track/146310605', // C418 — Subwoofer Lullaby
  baza:     'https://music.yandex.ru/album/36104524/track/137904480', // Sqwoz Bab — BAZA (для ванной)
  kitchen:  'https://music.yandex.ru/album/6543454/track/48037874',   // ВуншПунш
  office:   'https://music.yandex.ru/album/3347333/track/28038563',   // Нейромонах Феофан — Пляс
  book:     'https://music.yandex.ru/album/22515176/track/597351'     // Чиж & Co — О любви
};

// ============================================================
//  ИЗУМРУДЫ (4 шт, дата 25.10, буквы ПОРА)
// ============================================================
const EMERALDS = [
  { id: 1, stage: 'Шкаф',    digit: '2', letter: 'П' },
  { id: 2, stage: 'Ванная',  digit: '5', letter: 'О' },
  { id: 3, stage: 'Кухня',   digit: '1', letter: 'Р' },
  { id: 4, stage: 'Домик',   digit: '0', letter: 'А' }
];

// ============================================================
//  ЗАДАНИЯ ПО ЭТАПАМ
// ============================================================
const TASKS = [
  `📜 <b>Задание 1</b><br><br>
   Где рубашки спят в тишине,<br>
   где мой свитер дышит в темноте,<br>
   на моей стороне —<br>
   там тебя ждёт первый камень.<br><br>
   <span class="muted small">Найди конверт. Сканируй QR.</span>`,
  `📜 <b>Задание 2</b><br><br>
   Пока играет песня — иди туда, где кафель холоднее утренних мыслей.<br><br>
   На комоде тебя ждёт конверт. Прочитай его.<br><br>
   <span class="muted small">Потом найди таз и сканируй QR на дне.</span>`,
  `📜 <b>Задание 3</b><br><br>
   Иди в деревню. Там пахнет едой и травами.<br><br>
   QR на двери включит музыку. На столе — конверт с заданием.<br><br>
   <span class="muted small">Сканируй QR в конверте, когда найдёшь.</span>`,
  `📜 <b>Задание 4</b><br><br>
   Иди в комнату, где стоит компьютер. QR на двери включит былину.<br><br>
   На столе — конверт с загадкой. Реши её — найдёшь последний изумруд.<br><br>
   <span class="muted small">Внутри домика тебя ждёт конверт.</span>`,
  `📜 <b>Финал</b><br><br>
   Все изумруды собраны!<br>
   В последнем конверте — шифр и путь к подарку.<br><br>
   <span class="muted small">Если не помнишь, где конверт — вернись в комнату с компьютером.</span>`
];

// ============================================================
//  ДЕЙСТВИЯ ПО QR
// ============================================================
const QR_ACTIONS = {

  // -------- ЭТАП 1 · ШКАФ --------
  'WARDROBE': {
    stage: 'green', badge: '🟢 БИОМ ЛЕСА', title: 'Первый изумруд', subtitle: 'Ты нашла его',
    emerald: { id: 1 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <p>Первый изумруд — твой. Пока играет песня, иди в комнату, где кафель холоднее утренних мыслей.</p>
          <p>На комоде тебя ждёт конверт. Прочитай его, а потом найди то, что стоит в углу и ждёт, когда в него что-то нальют.</p>
          <button class="hint-link" onclick="toggleHint('hint-wardrobe')">нужна подсказка?</button>
          <div class="hidden-hint" id="hint-wardrobe">Это ванная. Конверт на комоде, таз — где-то внизу.</div>
        </div>
      `;
    }
  },

  // -------- ЭТАП 2 · ВАННАЯ (Музыка) --------
  'BATH_MUSIC': {
    stage: 'water', badge: '🔵 БИОМ ВОДЫ', title: 'Пенная вечеринка', subtitle: 'Включи музыку',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.baza, 'Sqwoz Bab — BAZA')}
        <div class="card">
          <p><b>Этот предмет есть и в ванной, и в играющей песне.</b></p>
          <p>Найди его. Внутри — следующий шаг.</p>
        </div>
      `;
    }
  },

  // -------- ЭТАП 2 · ВАННАЯ (Танец) --------
  'BATH_DANCE': {
    stage: 'water', badge: '🔵 БИОМ ВОДЫ', title: 'Танцуй тазом', subtitle: '10 секунд',
    emerald: { id: 2 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <p>А теперь давай подвигаем тазом как в песне. Танцуй пока не истечет таймер! 😈</p>
          <div class="timer-display idle" id="timer">10</div>
          <button class="btn primary big" id="dance-btn">НАЧАТЬ ТАНЕЦ</button>
        </div>
        <div id="dance-result" style="display:none;">
          <div class="card">
            <h2 style="color:var(--emerald);">🎉 МОЛОДЕЦ!</h2>
            <p>Ты оттанцевала. Теперь — в деревню.</p>
            <p>Там пахнет едой и травами. QR на двери включит музыку. На столе — конверт с заданием. Внутри — что-то вкусное.</p>
          </div>
        </div>
      `;
      const btn = document.getElementById('dance-btn');
      if (btn) btn.addEventListener('click', startDance);
    }
  },

  // -------- ЭТАП 3 · КУХНЯ --------
  'KITCHEN_MUSIC': {
    stage: 'sand', badge: '🟡 ДЕРЕВНЯ', title: 'Подкрепиться', subtitle: 'Фоновая музыка',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.kitchen, 'ВуншПунш — Песня')}
        <div class="card">
          <h2>⚔️ Задание викинга</h2>
          <p>На столе лежит конверт. В нём — рецепт и QR.</p>
          <p>Сканируй его — увидишь, что нужно сделать.</p>
        </div>
      `;
    }
  },

  'KITCHEN_RECIPE': {
    stage: 'sand', badge: '🟡 ДЕРЕВНЯ', title: 'Напиток викинга', subtitle: 'Без сахара — но вкусно',
    emerald: { id: 3 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <h2>🫖 Настой викинга</h2>
          <p class="muted small">Сладкое нельзя — поэтому варим травяной настой.</p>
          <div class="recipe-item"><span class="icon">🍋</span><span>Лимон — ломтик</span></div>
          <div class="recipe-item"><span class="icon">🌿</span><span>Мята — несколько листиков</span></div>
          <div class="recipe-item"><span class="icon">🌰</span><span>Корица — палочка (даёт сладость без сахара)</span></div>
          <div class="recipe-item"><span class="icon">🫚</span><span>Имбирь — маленький кусочек (по желанию)</span></div>
          <div class="recipe-item"><span class="icon">☕</span><span>Горячая вода — кружка</span></div>
          <p style="margin-top:14px;">Смешай всё в кружке. Дай настояться 2–3 минуты. Выпей — за викингов. ⚔️</p>
        </div>
        <div class="card">
          <h2>💎 Где изумруд?</h2>
          <p>Там, <b>где ты прячешь сладкое от самой себя</b>. Хотя сегодня — сладкое нельзя. Но изумруд — можно.</p>
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
        <button class="btn hp-btn big" onclick="toggleHint('hint-hp')">
          💚 ПОВЫСИТЬ ХП
        </button>
        <div class="hidden-hint" id="hint-hp" style="margin-top:14px; font-size:14px;">
          Следующий конверт ждёт тебя в комнате, где вход в убежище стережёт <b>вонючее чудовище</b>, которое <b>кусается словно тысяча собак</b>. Иди туда и найди конверт на столе.
        </div>
      `;
    }
  },

  // -------- ЭТАП 4 · ОФИС --------
  'OFFICE_MUSIC': {
    stage: 'rus', badge: '🪵 ДРЕВНЯЯ РУСЬ', title: 'Былина', subtitle: 'Фоновая музыка',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.office, 'Нейромонах Феофан — Пляс')}
        <div class="card">
          <h2>📜 Задание</h2>
          <p>На столе лежит конверт. Внутри — загадка. Реши её — найдёшь последний изумруд.</p>
          <p class="muted small">И не буди чудовище зря. Оно кусается.</p>
        </div>
      `;
    }
  },

  'CAT_HOUSE': {
    stage: 'rus', badge: '🪵 ДРЕВНЯЯ РУСЬ', title: 'Логово чудовища', subtitle: 'Ты справилась',
    emerald: { id: 4 },
    render: (el) => {
      el.innerHTML = `
        <div class="card">
          <h2>🐈 Послание от Марса</h2>
          <p>Мяу. Ты пробралась в логово. Чудовище спит — не буди.</p>
          <p>Здесь лежит твой последний изумруд. А рядом — конверт. Прочитай его: там куда идти дальше.</p>
        </div>
        <div class="card">
          <h2>📖 Следующая подсказка</h2>
          <p><b>«Где око видит, что вы начали вместе быстро, но до сих пор не закончили.»</b></p>
          <p>Там — конверт с QR. Сканируй.</p>
          <button class="hint-link" onclick="toggleHint('hint-book')">подсказка?</button>
          <div class="hidden-hint" id="hint-book">Это книга. Та, которую вы начали читать вместе. На полке.</div>
        </div>
      `;
    }
  },

  // -------- ЭТАП 5 · КНИГА --------
  'BOOK_SONG': {
    stage: 'green', badge: '🟢 ФИНАЛ', title: 'Последний шифр', subtitle: 'Играет песня',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        ${renderMusicPlayer(MUSIC.book, 'Чиж & Co — О любви')}
        <div class="card">
          <h2>🔐 Шифр</h2>
          <p>В конверте — инструкция. В приложении — шифр. Соедини их.</p>
          <p style="margin-top:14px;"><b>Что делать:</b></p>
          <p>1. Выложи изумруды в порядке <b>даты</b>.</p>
          <p>2. Отними от каждой буквы её цифру (А=1, Б=2, … Я=33).</p>
          <p>3. Получишь слово. Оно — там, где твой подарок.</p>
          <div class="cipher-block">
            <div class="cipher-numbers">2 5 1 0</div>
            <div class="cipher-hint">Порядок изумрудов = дата</div>
          </div>
          <button class="hint-link" onclick="toggleHint('hint-final')">подсказка?</button>
          <div class="hidden-hint" id="hint-final">
            П−2=Н? Нет. Считай: П=17, 17−2=15 → <b>Н</b>. Р=18, 18−5=13 → <b>Л</b>. А=1, 1−1=0 → <b>?</b>. О=16, 16−0=16 → <b>О</b>. Пересчитай сам, если не сходится. А может, я тебя путаю 😉
          </div>
        </div>
      `;
    }
  },

  'FINAL': {
    stage: 'green', badge: '🟢 ФИНАЛ', title: 'Ты дошла', subtitle: 'Я люблю тебя',
    emerald: null,
    render: (el) => {
      el.innerHTML = `
        <div class="card" style="text-align:center;">
          <div style="font-size:64px; line-height:1;">💚</div>
          <h2 style="color:var(--emerald); font-size:22px; letter-spacing:2px;">Я ЛЮБЛЮ ТЕБЯ</h2>
          <p style="margin-top:16px;"><b>С днём рождения, Дракончик!</b></p>
          <p>Ты прошла все биомы. Ты станцевала тазом. Ты сварила настой. Ты разгадала все шифры.</p>
          <p>Ты — моё лучшее приключение.</p>
          <p class="muted small" style="margin-top:16px;">Рядом с подарком — последний конверт. Открой его.</p>
        </div>
      `;
    }
  }
};

// ============================================================
//  ПЛЕЕР
// ============================================================
function renderMusicPlayer(url, title) {
  if (!url) return '';
  const clean = url.split('?')[0];
  return `
    <div class="card music-card">
      <div class="music-icon">🎵</div>
      <h2 style="text-align:center;">${title}</h2>
      <p class="muted small" style="text-align:center; margin-bottom:18px;">
        Нажми — трек откроется в Яндекс.Музыке
      </p>
      <a href="${clean}" target="_blank" rel="noopener" class="btn primary big music-btn">
        <span class="btn-icon">▶</span>
        Слушать
      </a>
    </div>
  `;
}

// ============================================================
//  РАНДОМАЙЗЕР ПОЖЕЛАНИЙ
// ============================================================
const WISHES = [
  'Ты моя любимая ящерка. С тобой даже в пустошах Майнкрафта тепло.',
  'Дракончик, ты как Фенрис — снаружи колючая, а внутри самая преданная.',
  'ChamomileRin — красивое имя для самой красивой девушки в моём мире.',
  'Если бы мы поехали в туризм по Скайриму — ты была бы лучшим напарником.',
  'Ты играешь на гитаре как C418 на пианино — тихо и прекрасно.',
  'Моя любимая, ты моё лучшее приключение.',
  'Дракончик, ты светишься ярче любого изумруда в моём инвентаре.',
  'Я бы прошёл с тобой и Valheim, и Dragon Age, и любую игру. Лишь бы с тобой, ящерка.',
  'ChamomileRin, спасибо, что ты есть. Даже когда сгораешь от крипера — ты моя любимая.',
  'Ты как Фенрис — редко открываешься, но когда это делаешь, мир становится лучше.',
  'Мой дракончик, ты моя самая любимая спавн-точка. Куда бы я ни ушёл, я возвращаюсь к тебе.',
  'Туризм по Скайриму был бы скучным без тебя, ящерка. Ты — моё приключение.',
  'Ты держишь гитару так, будто весь мир — твоя сцена. Я обожаю это.',
  'Любимая, ты — изумруд в моей инвентарной сетке. Редкая, ценная, моя.',
  'ChamomileRin звучит как что-то тёплое и уютное. Как ты.',
  'Дракончик, ты как Швеция в C418 — тихая, красивая, я к тебе привязан навсегда.',
  'Я люблю тебя больше, чем C418 любит Швецию. А он её очень любит.',
  'Ты и ящерка, и дракончик, и любимая — всё сразу, в одном человеке.',
  'Фенрис был бы счастлив иметь такую пару, как ты. Я точно счастлив.',
  'ChamomileRin, пусть у тебя будет много ресурсов, мало крипов и бесконечный инвентарь.',
  'Моя любимая гитаристка, мой дракончик, моя ящерка — ты лучшее, что случилось.',
  'Ты — та девушка, ради которой я готов пройти квест без подсказок.',
  'С тобой даже поход к холодильнику становится приключением.',
  'Люблю тебя больше, чем любой винил. И это, знаешь, много.'
];

// ============================================================
//  СОСТОЯНИЕ
// ============================================================
const state = {
  found: loadFound(),
  started: loadStarted(),
  currentAction: null,
  scanner: null,
  danceTimeout: null
};

function loadFound() {
  try { return JSON.parse(localStorage.getItem('biome_found') || '{}'); }
  catch (e) { return {}; }
}
function saveFound() {
  try { localStorage.setItem('biome_found', JSON.stringify(state.found)); } catch (e) {}
}
function loadStarted() {
  try { return localStorage.getItem('biome_started') === 'true'; }
  catch (e) { return false; }
}
function saveStarted() {
  try { localStorage.setItem('biome_started', 'true'); } catch (e) {}
}

// ============================================================
//  НАВИГАЦИЯ
// ============================================================
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuestWithMusic() {
  if (MUSIC.wardrobe) {
    window.open(MUSIC.wardrobe.split('?')[0], '_blank');
  }
  startQuest();
}

function startQuest() {
  state.started = true;
  saveStarted();
  renderEmeralds();
  showView('view-home');
}

// ============================================================
//  ИЗУМРУДЫ
// ============================================================
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

  const taskEl = document.getElementById('current-task');
  if (taskEl) taskEl.innerHTML = TASKS[count] || TASKS[TASKS.length - 1];

  const hints = [
    'Найди конверт. Сканируй QR внутри.',
    'Иди в ванную. Конверт на комоде.',
    'Иди на кухню. QR на двери + конверт на столе.',
    'Иди в офис. QR на двери + конверт на столе.',
    'Всё собрано! Ищи книгу и финальный конверт.'
  ];
  const hintEl = document.getElementById('progress-hint');
  if (hintEl) hintEl.textContent = hints[count];
}

function toggleEmerald(id) {
  if (state.found[id]) { toast('Уже найден ✨'); return; }
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

// ============================================================
//  СКАНЕР
// ============================================================
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
    (decodedText) => { closeScanner(); handleQRContent(decodedText.trim()); },
    () => {}
  ).catch(err => {
    console.error(err);
    if (errEl) errEl.textContent = 'Не удалось открыть камеру. Разреши доступ.';
  });
}

function closeScanner() {
  if (state.scanner) {
    state.scanner.stop().then(() => { state.scanner.clear(); state.scanner = null; }).catch(() => {});
  }
  showView('view-home');
}

function handleQRContent(text) {
  const key = text.toUpperCase().trim();
  const action = QR_ACTIONS[key];
  if (!action) { toast(`Неизвестный QR: ${text.substring(0, 30)}`); return; }
  showAction(key, action);
}

// ============================================================
//  ACTION
// ============================================================
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

function closeAction() { showView('view-home'); }

// ============================================================
//  ТАЙМЕР ТАНЦА (ИСПРАВЛЕННЫЙ)
// ============================================================
function startDance() {
  if (state.danceTimeout) return;
  const display = document.getElementById('timer');
  const btn = document.getElementById('dance-btn');
  if (!display || !btn) return;

  // Сначала 10,9,8, потом рандомные 46,47,48, банан, потом 3,2,1, потом дробные
  const sequence = [10, 9, 8, 46, 47, 48, 'банан', 3, 2, 1];
  for (let i = 94; i >= 1; i--) {
    sequence.push((i / 100).toFixed(2));
  }
  sequence.push(0);

  let idx = 0;
  
  display.classList.remove('idle', 'done');
  btn.disabled = true;
  btn.textContent = 'ТАНЦУЙ!';
  btn.style.opacity = '0.6';

  function tick() {
    if (idx >= sequence.length) {
      display.textContent = '🎉';
      display.classList.add('done');
      btn.textContent = 'ГОТОВО';
      const result = document.getElementById('dance-result');
      if (result) { result.style.display = 'block'; setTimeout(() => result.scrollIntoView({ behavior: 'smooth' }), 300); }
      return;
    }

    display.textContent = sequence[idx];
    idx++;

    // Задержка 1 секунда для первых чисел, и ускорение для дробей (50 мс)
    let delay = 1000;
    if (idx > 10) {
      delay = 50; 
    }

    state.danceTimeout = setTimeout(tick, delay);
  }

  tick();
}

// ============================================================
//  HINTS
// ============================================================
function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('show');
}

// ============================================================
//  WISH
// ============================================================
let lastWishIndex = -1;
function showWish() {
  let idx;
  do { idx = Math.floor(Math.random() * WISHES.length); } while (idx === lastWishIndex && WISHES.length > 1);
  lastWishIndex = idx;
  const el = document.getElementById('wish-text');
  if (el) el.textContent = WISHES[idx];
  showView('view-wish');
}
function closeWish() { showView('view-home'); }

// ============================================================
//  MANUAL
// ============================================================
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
function closeManual() { showView('view-home'); }

// ============================================================
//  RESET
// ============================================================
function resetProgress() {
  if (!confirm('Сбросить ВЕСЬ прогресс и вернуться на стартовый экран?')) return;
  localStorage.removeItem('biome_found');
  localStorage.removeItem('biome_started');
  state.found = {};
  state.started = false;
  renderEmeralds();
  showView('view-welcome');
  toast('Полный сброс выполнен');
}

// ============================================================
//  TOAST
// ============================================================
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// ============================================================
//  INIT
// ============================================================
window.addEventListener('load', () => {
  if (state.started) {
    renderEmeralds();
    showView('view-home');
  } else {
    showView('view-welcome');
  }
});
document.addEventListener('gesturestart', e => e.preventDefault());
