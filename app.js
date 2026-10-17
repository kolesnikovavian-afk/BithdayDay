/* ============================================
   Зелёный Биом — приложение (v4.3)
   ============================================ */

// ============================================================
//  МУЗЫКА (ссылки на Яндекс.Музыку)
// ============================================================
const MUSIC = {
  wardrobe: 'https://music.yandex.ru/album/39791459/track/146310605', // C418 — Subwoofer Lullaby
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
  // 0 изумрудов найдено
  `📜 <b>Задание 1</b><br><br>
   Где рубашки спят в тишине,<br>
   где мой свитер дышит в темноте,<br>
   на моей стороне —<br>
   там тебя ждёт первый камень.<br><br>
   <span class="muted small">Найди конверт. Сканируй QR.</span>`,
  // 1 изумруд
  `📜 <b>Задание 2</b><br><br>
   Пока играет песня — иди туда, где кафель холоднее утренних мыслей.<br><br>
   На комоде тебя ждёт конверт. Прочитай его.<br><br>
   <span class="muted small">Потом найди таз и сканируй QR на дне.</span>`,
  // 2 изумруда
  `📜 <b>Задание 3</b><br><br>
   Иди в деревню. Там пахнет едой и травами.<br><br>
   QR на двери включит музыку. На столе — конверт с заданием.<br><br>
   <span class="muted small">Сканируй QR в конверте, когда найдёшь.</span>`,
  // 3 изумруда
  `📜 <b>Задание 4</b><br><br>
   Иди в комнату, где стоит компьютер. QR на двери включит былину.<br><br>
   На столе — конверт с загадкой. Реши её — найдёшь последний изумруд.<br><br>
   <span class="muted small">Внутри домика тебя ждёт конверт.</span>`,
  // 4 изумруда
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

  // -------- ЭТАП 2 · ВАННАЯ --------
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
          <p style="margin-top:16px;"><b>С днём рождения, Д
