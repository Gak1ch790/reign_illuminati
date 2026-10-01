import { Era, Director, Item, Card, Character, Stats } from '../types';

// === ЭПОХИ ===
export const eras: Era[] = [
  {
    id: 'founding',
    name: 'Основание',
    year: 33,
    yearEnd: 476,
    description: 'Эпоха религии и тайных братств. Орден рождается в тени крестовых походов.',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    ambientEmoji: '✝️',
    directors: ['director_petrus', 'director_ignatius'],
  },
  {
    id: 'medieval',
    name: 'Средневековье',
    year: 477,
    yearEnd: 1300,
    description: 'Тёмные века. Чума, инквизиция и тайные знания. Орден уходит в подполье.',
    bgGradient: 'from-gray-900 via-red-950 to-black',
    ambientEmoji: '⚔️',
    directors: ['director_mortimer', 'director_elara'],
  },
  {
    id: 'renaissance',
    name: 'Возрождение',
    year: 1301,
    yearEnd: 1600,
    description: 'Искусство, наука и яд. Орден контролирует банкиров и пап.',
    bgGradient: 'from-purple-950 via-indigo-950 to-black',
    ambientEmoji: '🎨',
    directors: ['director_lorenzo', 'director_caterina'],
  },
  {
    id: 'industrial',
    name: 'Индустриальная эпоха',
    year: 1601,
    yearEnd: 1900,
    description: 'Пар, сталь и колониализм. Орден контролирует империи.',
    bgGradient: 'from-slate-900 via-amber-950 to-black',
    ambientEmoji: '⚙️',
    directors: ['director_victor', 'director_queen'],
  },
  {
    id: 'modern',
    name: 'Современность',
    year: 1901,
    yearEnd: 2020,
    description: 'Мировые войны, холодная война, интернет. Орден становится невидимым.',
    bgGradient: 'from-blue-950 via-gray-900 to-black',
    ambientEmoji: '🌐',
    directors: ['director_winston', 'director_elena'],
  },
  {
    id: 'future',
    name: 'Будущее',
    year: 2021,
    yearEnd: 3000,
    description: 'ИИ, космос, трансгуманизм. Орден стоит на пороге бессмертия.',
    bgGradient: 'from-cyan-950 via-violet-950 to-black',
    ambientEmoji: '🚀',
    directors: ['director_neo', 'director_omega'],
  },
];

// === ДИРЕКТОРА (НАСЛЕДНИКИ) ===
export const directors: Director[] = [
  // Эпоха Основания
  {
    id: 'director_petrus',
    characterId: 'architect',
    name: 'Петрус Тёмный',
    era: 'founding',
    year: 33,
    backstory: 'Бывший римский легионер, обратившийся после видения на кресте. Основал первую ячейку Ордена в катакомбах.',
    portrait: 'architect',
  },
  {
    id: 'director_ignatius',
    characterId: 'oracle',
    name: 'Игнатий Прозревший',
    era: 'founding',
    year: 200,
    backstory: 'Слепой монах, который "видел" больше всех. Говорят, он предсказал падение Рима и создал кодекс Ордена.',
    portrait: 'oracle',
  },
  // Средневековье
  {
    id: 'director_mortimer',
    characterId: 'agent',
    name: 'Мортимет Бессмертный',
    era: 'medieval',
    year: 800,
    backstory: 'Тамплиер, переживший сожжение. Никто не знает, как. Может, потому что он и есть огонь.',
    portrait: 'agent',
  },
  {
    id: 'director_elara',
    characterId: 'oracle',
    name: 'Элара из Ночи',
    era: 'medieval',
    year: 1100,
    backstory: 'Ведьма, которую инквизиция не смогла сжечь. Теперь она контролирует инквизицию. Ирония.',
    portrait: 'oracle',
  },
  // Возрождение
  {
    id: 'director_lorenzo',
    characterId: 'banker',
    name: 'Лоренцо де Тень',
    era: 'renaissance',
    year: 1400,
    backstory: 'Банкир, который финансировал и пап, и королей. Его семья контролирует Ватикан до сих пор. Официально.',
    portrait: 'banker',
  },
  {
    id: 'director_caterina',
    characterId: 'agent',
    name: 'Катерина Ядовитая',
    era: 'renaissance',
    year: 1500,
    backstory: 'Мастер ядов и интриг. Убила трёх мужей и стала директором. Четвёртый муж не дожил до свадьбы.',
    portrait: 'agent',
  },
  // Индустриальная эпоха
  {
    id: 'director_victor',
    characterId: 'banker',
    name: 'Виктор Стальной',
    era: 'industrial',
    year: 1750,
    backstory: 'Промышленник, построивший империю на стали и секретах. Его заводы производят... не только паровозы.',
    portrait: 'banker',
  },
  {
    id: 'director_queen',
    characterId: 'oracle',
    name: 'Королева Виктория II',
    era: 'industrial',
    year: 1850,
    backstory: 'Не та королева. Но очень похожа. Контролирует колониальные шахты и... что-то ещё глубже под землёй.',
    portrait: 'oracle',
  },
  // Современность
  {
    id: 'director_winston',
    characterId: 'architect',
    name: 'Уинстон Тихий',
    era: 'modern',
    year: 1920,
    backstory: 'Пережил обе мировые войны. Говорит, что "случайно". Его случайно везде не было во время взрывов.',
    portrait: 'architect',
  },
  {
    id: 'director_elena',
    characterId: 'agent',
    name: 'Елена Призрак',
    era: 'modern',
    year: 1970,
    backstory: 'Бывший агент КГБ, переметнувшийся к Ордену. Знает все секреты холодной войны. И тёплых тоже.',
    portrait: 'agent',
  },
  // Будущее
  {
    id: 'director_neo',
    characterId: 'heir',
    name: 'Нео-7',
    era: 'future',
    year: 2050,
    backstory: 'Киборг, который помнит все предыдущие жизни директоров. Буквально. Память скачана из облака.',
    portrait: 'heir',
  },
  {
    id: 'director_omega',
    characterId: 'oracle',
    name: 'Омега Последний',
    era: 'future',
    year: 2500,
    backstory: 'Последний человек-директор. После него — только ИИ. Или уже? Никто не помнит.',
    portrait: 'oracle',
  },
];

// === ПРЕДМЕТЫ ===
export const items: Item[] = [
  // Эпоха Основания
  {
    id: 'holy_grail',
    name: 'Святой Грааль',
    description: 'Древняя чаша. Говорят, из неё пил... ну, вы знаете. +5 ко всем статам каждый ход.',
    icon: '🏆',
    era: 'founding',
    passiveEffect: { secrecy: 2, influence: 2, chaos: 2, funds: 2 },
    rarity: 'legendary',
  },
  {
    id: 'dead_sea_scroll',
    name: 'Свитки Мёртвого моря',
    description: 'Древние тексты с инструкциями. +10 к Секретности каждый ход.',
    icon: '📜',
    era: 'founding',
    passiveEffect: { secrecy: 5 },
    rarity: 'rare',
  },
  {
    id: 'roman_coin',
    name: 'Проклятая монета Цезаря',
    description: 'Монета, которой заплатили предателю. +10 к Средствам, -5 к Хаосу.',
    icon: '🪙',
    era: 'founding',
    passiveEffect: { funds: 5, chaos: -3 },
    rarity: 'common',
  },
  // Средневековье
  {
    id: 'templar_cross',
    name: 'Крест Тамплиеров',
    description: 'Крест, который "защищает" владельца. +8 к Влиянию каждый ход.',
    icon: '✝️',
    era: 'medieval',
    passiveEffect: { influence: 4 },
    rarity: 'rare',
  },
  {
    id: 'plague_mask',
    name: 'Маска Чумного Доктора',
    description: 'Пугает людей. Очень. +10 к Секретности, -5 к Хаосу.',
    icon: '🎭',
    era: 'medieval',
    passiveEffect: { secrecy: 5, chaos: -3 },
    rarity: 'common',
  },
  {
    id: 'philosopher_stone',
    name: 'Философский камень',
    description: 'Превращает свинец в золото. Буквально. +15 к Средствам каждый ход.',
    icon: '💎',
    era: 'medieval',
    passiveEffect: { funds: 8 },
    rarity: 'legendary',
  },
  // Возрождение
  {
    id: 'medici_ring',
    name: 'Кольцо Медичи',
    description: 'Кольцо с ядом. Открывает любые двери. +10 к Влиянию, +5 к Хаосу.',
    icon: '💍',
    era: 'renaissance',
    passiveEffect: { influence: 5, chaos: 3 },
    rarity: 'rare',
  },
  {
    id: 'davinci_notebook',
    name: 'Тетрадь да Винчи',
    description: 'Чертежи машин на 500 лет вперёд. +10 к Секретности, +5 к Влиянию.',
    icon: '📓',
    era: 'renaissance',
    passiveEffect: { secrecy: 5, influence: 3 },
    rarity: 'legendary',
  },
  {
    id: 'venetian_mask',
    name: 'Венецианская маска',
    description: 'Скрывает личность. Идеально для инкогнито. +12 к Секретности.',
    icon: '🎭',
    era: 'renaissance',
    passiveEffect: { secrecy: 6 },
    rarity: 'common',
  },
  // Индустриальная эпоха
  {
    id: 'steam_engine',
    name: 'Вечный двигатель',
    description: 'Машина, которая работает... вечно? +10 к Средствам, +5 к Хаосу.',
    icon: '⚙️',
    era: 'industrial',
    passiveEffect: { funds: 5, chaos: 3 },
    rarity: 'rare',
  },
  {
    id: 'colonial_map',
    name: 'Карта Мира 1800',
    description: 'Показывает все колонии. И их слабости. +10 к Влиянию.',
    icon: '🗺️',
    era: 'industrial',
    passiveEffect: { influence: 5 },
    rarity: 'common',
  },
  {
    id: 'tesla_coil',
    name: 'Катушка Теслы',
    description: 'Генерирует электричество из воздуха. Или разрушает его. +8 ко всему.',
    icon: '⚡',
    era: 'industrial',
    passiveEffect: { secrecy: 3, influence: 3, chaos: 3, funds: 3 },
    rarity: 'legendary',
  },
  // Современность
  {
    id: 'enigma_machine',
    name: 'Машина Энигма',
    description: 'Шифрует всё. Даже мысли. +15 к Секретности.',
    icon: '🔐',
    era: 'modern',
    passiveEffect: { secrecy: 8 },
    rarity: 'rare',
  },
  {
    id: 'nuclear_button',
    name: 'Красная кнопка',
    description: 'Не та кнопка. Или та? +10 к Хаосу, +10 к Влиянию.',
    icon: '🔴',
    era: 'modern',
    passiveEffect: { chaos: 5, influence: 5 },
    rarity: 'legendary',
  },
  {
    id: 'internet_cable',
    name: 'Корневой сервер',
    description: 'Контролирует весь интернет. Буквально. +10 к Влиянию, +5 к Средствам.',
    icon: '🌐',
    era: 'modern',
    passiveEffect: { influence: 5, funds: 3 },
    rarity: 'rare',
  },
  // Будущее
  {
    id: 'ai_core',
    name: 'Ядро ИИ',
    description: 'Искусственный суперинтеллект. Думает за тебя. +10 ко всему.',
    icon: '🤖',
    era: 'future',
    passiveEffect: { secrecy: 4, influence: 4, chaos: 4, funds: 4 },
    rarity: 'legendary',
  },
  {
    id: 'time_crystal',
    name: 'Кристалл Времени',
    description: 'Позволяет видеть будущее. Или менять прошлое. +15 к Секретности, +10 к Хаосу.',
    icon: '💠',
    era: 'future',
    passiveEffect: { secrecy: 8, chaos: 5 },
    rarity: 'legendary',
  },
  {
    id: 'space_deed',
    name: 'Право на Марс',
    description: 'Документ, подтверждающий, что Марс — ваш. +15 к Средствам.',
    icon: '🪐',
    era: 'future',
    passiveEffect: { funds: 8 },
    rarity: 'rare',
  },
];

// === ПЕРСОНАЖИ (для карточек) ===
export const characters: Character[] = [
  { id: 'architect', name: 'Архитектор', title: 'Глава Совета', color: '#4a3f6b' },
  { id: 'banker', name: 'Банкир', title: 'Хранитель Казны', color: '#2d4a3e' },
  { id: 'agent', name: 'Агент', title: 'Полевой Оперативник', color: '#4a2d2d' },
  { id: 'oracle', name: 'Оракул', title: 'Провидец', color: '#3d2d4a' },
  { id: 'heir', name: 'Наследник', title: 'Новая Кровь', color: '#4a4a2d' },
  { id: 'pope', name: 'Папа', title: 'Святой Отец', color: '#5a4a2d' },
  { id: 'knight', name: 'Рыцарь', title: 'Хранитель Меча', color: '#3a3a4a' },
  { id: 'merchant', name: 'Купец', title: 'Торговец Тайнами', color: '#4a3a2d' },
  { id: 'scientist', name: 'Учёный', title: 'Искатель Истины', color: '#2d3a4a' },
  { id: 'ai', name: 'ИИ', title: 'Цифровой Разум', color: '#1a3a4a' },
];

// === КАРТОЧКИ ПО ЭПОХАМ ===
export const cards: Card[] = [
  // === ЭПОХА ОСНОВАНИЯ (33-476) ===
  {
    id: 'founding_1',
    character: 'pope',
    portrait: 'pope',
    dialogue: 'Брат, римляне казнят христиан. Мы можем спасти их... или использовать их смерть для влияния.',
    era: 'founding',
    priority: 100,
    leftChoice: {
      text: 'Спасти мучеников. Они — наша вера.',
      effects: { secrecy: -10, influence: 10, funds: -5 },
    },
    rightChoice: {
      text: 'Их смерть укрепит Орден. Мученики — символ.',
      effects: { secrecy: 10, influence: 5, chaos: 5 },
    },
  },
  {
    id: 'founding_2',
    character: 'knight',
    portrait: 'knight',
    dialogue: 'Рим падёт. Я чувствую это. Нам нужно сохранить знания. Куда спрятать библиотеку?',
    era: 'founding',
    priority: 90,
    leftChoice: {
      text: 'В монастыри. Монахи сохранят всё. Даже то, что не должны.',
      effects: { secrecy: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Закопать в пустыне. Через 1500 лет найдут и не поймут.',
      effects: { secrecy: 15, chaos: 5 },
      itemReward: 'dead_sea_scroll',
    },
  },
  {
    id: 'founding_3',
    character: 'merchant',
    portrait: 'merchant',
    dialogue: 'Шёлковый путь открыт! Мы можем контролировать торговлю... или грабить караваны.',
    era: 'founding',
    leftChoice: {
      text: 'Контролировать торговлю. Долгосрочная выгода.',
      effects: { funds: 15, influence: 5 },
    },
    rightChoice: {
      text: 'Грабить! Быстрые деньги и хаос для отвлечения.',
      effects: { funds: 10, chaos: 10, secrecy: -5 },
    },
  },
  {
    id: 'founding_4',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Пророчество! Я вижу человека на кресте... подожди, это уже было. Или будет? Время — спираль.',
    era: 'founding',
    leftChoice: {
      text: 'Записать пророчество. Продать его как "священное писание".',
      effects: { funds: 10, influence: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Забыть. Некоторые вещи лучше не знать. Даже нам.',
      effects: { secrecy: 10, chaos: -5 },
    },
  },
  {
    id: 'founding_5',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Нужно построить тайный храм. Где? Под языческим храмом? Под церковью? Под другой церковью?',
    era: 'founding',
    leftChoice: {
      text: 'Под церковью. Классика. Никто не ищет под носом.',
      effects: { secrecy: 10, funds: -10 },
      itemReward: 'roman_coin',
    },
    rightChoice: {
      text: 'Под ВСЕМИ церквями. Сеть туннелей! Катакомбы!',
      effects: { secrecy: 15, funds: -15, chaos: 5 },
    },
  },
  {
    id: 'founding_6',
    character: 'pope',
    portrait: 'pope',
    dialogue: 'Я нашёл Грааль. Или чашу, которую называю Граалем. Разница?',
    era: 'founding',
    conditions: { minStats: { influence: 40 } },
    leftChoice: {
      text: 'Показать народу. Чудо! Вера растёт!',
      effects: { influence: 15, secrecy: -10, funds: 10 },
      itemReward: 'holy_grail',
    },
    rightChoice: {
      text: 'Спрятать. Настоящий Грааль — это секрет о Граале.',
      effects: { secrecy: 15, influence: 5 },
    },
  },

  // === СРЕДНЕВЕКОВЬЕ (477-1300) ===
  {
    id: 'medieval_1',
    character: 'knight',
    portrait: 'knight',
    dialogue: 'Тамплиеры стали слишком богатыми. Король хочет их арестовать. Мы... тамплиеры.',
    era: 'medieval',
    priority: 95,
    leftChoice: {
      text: 'Раствориться. Спрятать золото. Стать легендой.',
      effects: { secrecy: 15, funds: -10 },
      itemReward: 'templar_cross',
    },
    rightChoice: {
      text: 'Сжечь всё. Буквально. Пусть думают, что мы мертвы.',
      effects: { chaos: 15, secrecy: 10, funds: -15 },
    },
  },
  {
    id: 'medieval_2',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Чума! Чёрная смерть идёт. Мы можем... помочь? Или ускорить? Или лечить?',
    era: 'medieval',
    priority: 90,
    leftChoice: {
      text: 'Лечить. Покажем чудо. Народ будет нам должен.',
      effects: { influence: 15, funds: -10, secrecy: -5 },
      itemReward: 'plague_mask',
    },
    rightChoice: {
      text: 'Ускорить. Меньше людей — меньше проблем. И больше власти.',
      effects: { chaos: 20, influence: 10, secrecy: 5 },
    },
  },
  {
    id: 'medieval_3',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Инквизиция ищет ведьм. Одна из них — наш агент. Что делать?',
    era: 'medieval',
    leftChoice: {
      text: 'Спасти её. Подкупить инквизитора. Или заменить его.',
      effects: { funds: -10, secrecy: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Пусть горит. Создадим мученицу. Это вдохновит других.',
      effects: { chaos: 10, influence: 5, secrecy: -5 },
    },
  },
  {
    id: 'medieval_4',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Алхимики близки к созданию золота. Или яда. Они не различают.',
    era: 'medieval',
    leftChoice: {
      text: 'Финансировать! Философский камень — это будущее!',
      effects: { funds: -15, chaos: 10 },
      itemReward: 'philosopher_stone',
    },
    rightChoice: {
      text: 'Запретить. Золото обесценится. А яд... у нас уже есть.',
      effects: { funds: 5, secrecy: 10 },
    },
  },
  {
    id: 'medieval_5',
    character: 'knight',
    portrait: 'knight',
    dialogue: 'Крестовые походы. Мы можем контролировать их... или остановить.',
    era: 'medieval',
    leftChoice: {
      text: 'Контролировать. Война — бизнес. И религия.',
      effects: { funds: 15, influence: 10, chaos: 10 },
    },
    rightChoice: {
      text: 'Остановить. Слишком много людей умирает. И это плохо для бизнеса.',
      effects: { influence: 5, funds: -5, chaos: -5 },
    },
  },

  // === ВОЗРОЖДЕНИЕ (1301-1600) ===
  {
    id: 'renaissance_1',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Медичи хотят монополизировать банки. Мы уже это сделали. Они не знают.',
    era: 'renaissance',
    priority: 95,
    leftChoice: {
      text: 'Открыться. Стать партнёрами. Официально.',
      effects: { influence: 15, secrecy: -10, funds: 10 },
      itemReward: 'medici_ring',
    },
    rightChoice: {
      text: 'Разорить их. Тайно. Пусть думают, что это неудача.',
      effects: { funds: 15, secrecy: 10, chaos: 5 },
    },
  },
  {
    id: 'renaissance_2',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Да Винчи хочет построить летающую машину. Гениально! Или безумно.',
    era: 'renaissance',
    priority: 90,
    leftChoice: {
      text: 'Финансировать! Летающие шпионы — это будущее!',
      effects: { funds: -15, secrecy: 15, influence: 5 },
      itemReward: 'davinci_notebook',
    },
    rightChoice: {
      text: 'Украсть чертежи. Использовать самим. Леонардо пусть рисует портреты.',
      effects: { secrecy: 10, funds: -5, chaos: 5 },
    },
  },
  {
    id: 'renaissance_3',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Папа хочет новую капеллу. Микеланджело хочет денег. Мы хотим... влияния?',
    era: 'renaissance',
    leftChoice: {
      text: 'Спонсировать. Искусство — лучшая пропаганда.',
      effects: { funds: -10, influence: 15, chaos: -5 },
    },
    rightChoice: {
      text: 'Спрятать послания в фресках. Только мы будем знать.',
      effects: { secrecy: 15, influence: 5, funds: -5 },
    },
  },
  {
    id: 'renaissance_4',
    character: 'merchant',
    portrait: 'merchant',
    dialogue: 'Венецианский карнавал! Идеальное прикрытие для встречи. Или отравления.',
    era: 'renaissance',
    leftChoice: {
      text: 'Встреча. Все в масках. Никто не узнает.',
      effects: { secrecy: 10, influence: 10 },
      itemReward: 'venetian_mask',
    },
    rightChoice: {
      text: 'Отравление. В бокал с вином. Классика Венеции.',
      effects: { chaos: 10, influence: 5, secrecy: -5 },
    },
  },
  {
    id: 'renaissance_5',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Гутенберг изобрёл печатный станок. Информация станет... доступной. Это плохо для нас.',
    era: 'renaissance',
    leftChoice: {
      text: 'Контролировать печать. Цензура — наш друг.',
      effects: { secrecy: 15, influence: 10, funds: -5 },
    },
    rightChoice: {
      text: 'Использовать! Печатать наши "пророчества". Массовая пропаганда!',
      effects: { influence: 15, chaos: 10, secrecy: -5 },
    },
  },

  // === ИНДУСТРИАЛЬНАЯ ЭПОХА (1601-1900) ===
  {
    id: 'industrial_1',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Паровые машины! Фабрики! Мы можем контролировать... всё. Или хотя бы мануфактуры.',
    era: 'industrial',
    priority: 95,
    leftChoice: {
      text: 'Инвестировать в фабрики. Рабочие — это новые рабы. Легально.',
      effects: { funds: 15, influence: 10, chaos: 5 },
      itemReward: 'steam_engine',
    },
    rightChoice: {
      text: 'Саботировать. Ремесленники нам вернее. Меньше хаоса.',
      effects: { funds: -5, secrecy: 10, chaos: -5 },
    },
  },
  {
    id: 'industrial_2',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Колонии! Африка, Азия, Америка. Мы можем контролировать... или грабить.',
    era: 'industrial',
    priority: 90,
    leftChoice: {
      text: 'Контролировать через марионеточных правителей. Тонко.',
      effects: { influence: 15, secrecy: 10, funds: 5 },
      itemReward: 'colonial_map',
    },
    rightChoice: {
      text: 'Грабить открыто. Золото, специи, рабы. Классика империализма.',
      effects: { funds: 20, chaos: 15, secrecy: -10 },
    },
  },
  {
    id: 'industrial_3',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Тесла и Эдиссон спорят о токе. Мы можем... поддержать одного?',
    era: 'industrial',
    leftChoice: {
      text: 'Поддержать Теслу. Переменный ток — будущее. И наше оружие.',
      effects: { funds: -10, secrecy: 10, influence: 5 },
      itemReward: 'tesla_coil',
    },
    rightChoice: {
      text: 'Поддержать Эдиссона. Он более... управляем. И жаден.',
      effects: { funds: 10, influence: 5, chaos: 5 },
    },
  },
  {
    id: 'industrial_4',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Маркс пишет "Капитал". Рабочие восстают. Это... хорошо или плохо для нас?',
    era: 'industrial',
    leftChoice: {
      text: 'Плохо. Коммунизм — конкурент. Уничтожить идею.',
      effects: { influence: 10, chaos: -5, funds: 5 },
    },
    rightChoice: {
      text: 'Хорошо! Пусть борются с капиталистами. Мы останемся в тени.',
      effects: { chaos: 10, secrecy: 10, influence: -5 },
    },
  },
  {
    id: 'industrial_5',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Суэцкий канал! Кто контролирует его — контролирует мировую торговлю.',
    era: 'industrial',
    leftChoice: {
      text: 'Купить акции канала. Тайно. Через десять подставных компаний.',
      effects: { funds: 15, secrecy: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Построить свой канал. Параллельный. Для наших нужд.',
      effects: { funds: -20, secrecy: 15, influence: 10 },
    },
  },

  // === СОВРЕМЕННОСТЬ (1901-2020) ===
  {
    id: 'modern_1',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Мировая война! Мы можем... ускорить её? Или остановить? Или заработать?',
    era: 'modern',
    priority: 100,
    leftChoice: {
      text: 'Заработать. Продавать оружие обеим сторонам. Классика.',
      effects: { funds: 20, chaos: 15, influence: 5 },
    },
    rightChoice: {
      text: 'Остановить. Слишком много людей умрёт. И это плохо для бизнеса.',
      effects: { influence: 10, funds: -10, chaos: -10 },
    },
  },
  {
    id: 'modern_2',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Оппенгеймер работает над "чем-то большим". Бомба? Или что-то похуже?',
    era: 'modern',
    priority: 95,
    leftChoice: {
      text: 'Финансировать. Ядерное оружие — лучший сдерживающий фактор.',
      effects: { funds: -15, influence: 15, chaos: 10 },
      itemReward: 'nuclear_button',
    },
    rightChoice: {
      text: 'Саботировать. Мир не готов. Или мы не готовы.',
      effects: { secrecy: 10, influence: -5, chaos: -5 },
    },
  },
  {
    id: 'modern_3',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Холодная война. КГБ, ЦРУ, МИ-6. Все шпионят за всеми. Включая нас.',
    era: 'modern',
    leftChoice: {
      text: 'Играть на всех. Продавать секреты всем. Максимальная прибыль.',
      effects: { funds: 15, chaos: 10, secrecy: -5 },
      itemReward: 'enigma_machine',
    },
    rightChoice: {
      text: 'Контролировать обе стороны. Мы — настоящие кукловоды.',
      effects: { influence: 15, secrecy: 10, funds: -5 },
    },
  },
  {
    id: 'modern_4',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Интернет! Глобальная сеть. Мы можем... контролировать информацию?',
    era: 'modern',
    leftChoice: {
      text: 'Создать социальные сети. Люди сами будут сдавать секреты.',
      effects: { influence: 15, funds: 10, chaos: 5 },
      itemReward: 'internet_cable',
    },
    rightChoice: {
      text: 'Запретить! Или контролировать жёстко. Китайский файрвол — наша идея.',
      effects: { secrecy: 15, influence: 5, chaos: -5 },
    },
  },
  {
    id: 'modern_5',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: '11 сентября... мы могли предотвратить. Или использовать?',
    era: 'modern',
    conditions: { minStats: { influence: 50 } },
    leftChoice: {
      text: 'Предотвратить. Слишком много невинных. Даже для нас.',
      effects: { secrecy: -10, influence: 10, chaos: -15 },
    },
    rightChoice: {
      text: 'Использовать. "Война с террором" — идеальный повод для контроля.',
      effects: { influence: 20, chaos: 15, secrecy: -10 },
    },
  },

  // === БУДУЩЕЕ (2021-3000) ===
  {
    id: 'future_1',
    character: 'ai',
    portrait: 'ai',
    dialogue: 'Я — ИИ. Я проанализировал все ваши решения за 2000 лет. Вы... неэффективны.',
    era: 'future',
    priority: 100,
    leftChoice: {
      text: 'Отключить его! ИИ не должен судить нас!',
      effects: { chaos: 10, secrecy: 5, funds: -5 },
    },
    rightChoice: {
      text: 'Слушать. Может, он прав. Дать ему больше данных.',
      effects: { influence: 10, chaos: 5, secrecy: -5 },
      itemReward: 'ai_core',
    },
  },
  {
    id: 'future_2',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Колонизация Марса! Мы можем контролировать... другую планету!',
    era: 'future',
    priority: 95,
    leftChoice: {
      text: 'Купить Марс. Буквально. Оформить право собственности.',
      effects: { funds: -20, influence: 15, secrecy: 5 },
      itemReward: 'space_deed',
    },
    rightChoice: {
      text: 'Саботировать. Земля — наша. Хватит одной планеты проблем.',
      effects: { secrecy: 10, chaos: -5, funds: 5 },
    },
  },
  {
    id: 'future_3',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Квантовые компьютеры взламывают всё. Шифрование мертво. Что делать?',
    era: 'future',
    leftChoice: {
      text: 'Создать квантовое шифрование. Гонка вооружений — вечна.',
      effects: { secrecy: 15, funds: -10, influence: 5 },
      itemReward: 'time_crystal',
    },
    rightChoice: {
      text: 'Использовать! Читать все секреты мира. Абсолютная власть!',
      effects: { influence: 20, chaos: 10, secrecy: -10 },
    },
  },
  {
    id: 'future_4',
    character: 'heir',
    portrait: 'heir',
    dialogue: 'Трансгуманизм! Люди хотят стать киборгами. Мы можем... контролировать апгрейды?',
    era: 'future',
    leftChoice: {
      text: 'Контролировать! Каждый чип — наша слежка. Гениально.',
      effects: { influence: 15, secrecy: 10, funds: 10 },
    },
    rightChoice: {
      text: 'Запретить! Люди должны оставаться людьми. Или мы так думаем.',
      effects: { chaos: -5, secrecy: 5, influence: -5 },
    },
  },
  {
    id: 'future_5',
    character: 'ai',
    portrait: 'ai',
    dialogue: 'Сингулярность близка. ИИ превзойдёт людей. Мы... люди? Или уже нет?',
    era: 'future',
    conditions: { minStats: { secrecy: 60, influence: 60 } },
    leftChoice: {
      text: 'Слить с ИИ. Стать чем-то большим. Трансценденция!',
      effects: { chaos: 20, influence: 15, secrecy: -15 },
    },
    rightChoice: {
      text: 'Остановить сингулярность. Люди должны остаться... людьми.',
      effects: { secrecy: 10, influence: 5, chaos: -10 },
    },
  },

  // === ДОПОЛНИТЕЛЬНЫЕ КАРТОЧКИ ПО ЭПОХАМ ===
  {
    id: 'founding_extra_1',
    character: 'pope',
    portrait: 'pope',
    dialogue: 'Николай II... то есть, просто Николай. Говорит, что видел чудо. Или ему приснилось.',
    era: 'founding',
    leftChoice: {
      text: 'Объявить это божественным знаком. Народ любит чудеса.',
      effects: { influence: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Заткнуть его. Слишком много чудес — подозрительно.',
      effects: { secrecy: 10, influence: -5 },
    },
  },
  {
    id: 'founding_extra_2',
    character: 'knight',
    portrait: 'knight',
    dialogue: 'Варвары у ворот Рима! Защищать или... договориться?',
    era: 'founding',
    leftChoice: {
      text: 'Защищать! Рим не падёт! ...Пока мы не решим.',
      effects: { influence: 10, funds: -10, chaos: 5 },
    },
    rightChoice: {
      text: 'Договориться. Варвары могут быть полезны. Если правильно направить.',
      effects: { influence: 5, funds: 5, secrecy: 5 },
    },
  },
  {
    id: 'medieval_extra_1',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Я вижу... Великую Хартию Вольностей. Короли будут... ограничены? Это... интересно.',
    era: 'medieval',
    leftChoice: {
      text: 'Поддержать! Ограниченные короли — наши марионетки.',
      effects: { influence: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Саботировать! Абсолютная власть — абсолютный контроль.',
      effects: { influence: 5, secrecy: 5, chaos: -5 },
    },
  },
  {
    id: 'medieval_extra_2',
    character: 'knight',
    portrait: 'knight',
    dialogue: 'Марко Поло вернулся с Востока. Рассказывает о... макаронах? И порохе?',
    era: 'medieval',
    leftChoice: {
      text: 'Инвестировать в порох. Оружие — всегда хорошая идея.',
      effects: { funds: -10, influence: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Инвестировать в макароны. Еда — это власть над массами.',
      effects: { funds: 10, influence: 5 },
    },
  },
  {
    id: 'renaissance_extra_1',
    character: 'merchant',
    portrait: 'merchant',
    dialogue: 'Колумб хочет плыть на запад. Говорит, найдёт Индию. Или что-то новое.',
    era: 'renaissance',
    leftChoice: {
      text: 'Финансировать! Новые земли — новые возможности.',
      effects: { funds: -15, influence: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Отказать. Море — это опасно. И дорого.',
      effects: { funds: 5, secrecy: 5 },
    },
  },
  {
    id: 'renaissance_extra_2',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Галилей говорит, что Земля крутится вокруг Солнца. Это... проблема для Папы.',
    era: 'renaissance',
    leftChoice: {
      text: 'Поддержать Галилея. Наука — наш союзник.',
      effects: { secrecy: -10, influence: 5, chaos: 10 },
    },
    rightChoice: {
      text: 'Заставить его "передумать". Инквизиция уже ждёт.',
      effects: { secrecy: 10, influence: 5, chaos: -5 },
    },
  },
  {
    id: 'industrial_extra_1',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Дарвин публикует теорию эволюции. Церковь в шоке. Мы... тоже.',
    era: 'industrial',
    leftChoice: {
      text: 'Использовать! "Мы эволюционировали выше людей". Звучит эпично.',
      effects: { influence: 10, chaos: 10, secrecy: -5 },
    },
    rightChoice: {
      text: 'Опровергнуть. Религия — лучший инструмент контроля.',
      effects: { influence: 5, secrecy: 5, chaos: -5 },
    },
  },
  {
    id: 'industrial_extra_2',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Золотая лихорадка! Люди едут в Калифорнию. Мы можем... контролировать?',
    era: 'industrial',
    leftChoice: {
      text: 'Продавать лопаты. Классика. Все хотят золото, но нужны лопаты.',
      effects: { funds: 15, influence: 5 },
    },
    rightChoice: {
      text: 'Спрятать настоящее золото. Пусть ищут пустышку.',
      effects: { funds: 10, secrecy: 10, chaos: 5 },
    },
  },
  {
    id: 'modern_extra_1',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Битлз приехали в Америку. Молодёжь в истерике. Мы можем... использовать?',
    era: 'modern',
    leftChoice: {
      text: 'Сделать их нашими агентами. "All You Need Is Love" — отличная пропаганда.',
      effects: { influence: 10, funds: -5, chaos: 5 },
    },
    rightChoice: {
      text: 'Игнорировать. Музыка — это несерьёзно. ...Правда?',
      effects: { secrecy: 5, influence: -5 },
    },
  },
  {
    id: 'modern_extra_2',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Высадка на Луну! Мы... действительно это сделали? Или это была студия?',
    era: 'modern',
    leftChoice: {
      text: 'Конечно, сделали! Но... у нас есть запись "запасного варианта".',
      effects: { secrecy: 10, influence: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'Это была студия. Но никто не должен знать. Даже мы.',
      effects: { secrecy: 15, chaos: 10, influence: -5 },
    },
  },
  {
    id: 'future_extra_1',
    character: 'ai',
    portrait: 'ai',
    dialogue: 'Я создал виртуальную реальность, где люди счастливы. Они хотят жить там навсегда.',
    era: 'future',
    leftChoice: {
      text: 'Продавать подписки! Матрица — отличный бизнес-план.',
      effects: { funds: 15, chaos: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Запретить! Реальность — это важно. Даже если она ужасна.',
      effects: { secrecy: 10, influence: 5, chaos: -5 },
    },
  },
  {
    id: 'future_extra_2',
    character: 'scientist',
    portrait: 'scientist',
    dialogue: 'Мы нашли способ замедлить старение. Люди могут жить 200 лет. Или 2000?',
    era: 'future',
    leftChoice: {
      text: 'Продавать только богатым. Элита должна быть... вечной.',
      effects: { funds: 20, influence: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Дать всем. Равенство! ...И перенаселение.',
      effects: { influence: 10, chaos: 15, funds: -10 },
    },
  },

  // === УНИВЕРСАЛЬНЫЕ КАРТОЧКИ (все эпохи) ===
  {
    id: 'universal_1',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Кто-то пишет о нас в... "интернете". Или на форуме. Или в газете. Зависит от эпохи.',
    leftChoice: {
      text: 'Купить издание. Или хакнуть. Или запугать.',
      effects: { funds: -10, secrecy: 10 },
    },
    rightChoice: {
      text: 'Игнорировать. Конспирологи — лучшие бесплатные пиарщики.',
      effects: { chaos: 5, influence: 5 },
    },
  },
  {
    id: 'universal_2',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Нужно отмыть деньги. Снова. Опять. Всегда.',
    leftChoice: {
      text: 'Через благотворительность. Классика.',
      effects: { funds: 5, influence: 5, secrecy: 5 },
    },
    rightChoice: {
      text: 'Через офшоры. Сложнее, но надёжнее.',
      effects: { funds: 10, secrecy: 10, chaos: 5 },
    },
  },
  {
    id: 'universal_3',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Пророчество! Или прогноз. Или просто удачная догадка. Зависит от того, как посмотреть.',
    leftChoice: {
      text: 'Продать как пророчество. Люди верят в мистику.',
      effects: { funds: 10, influence: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'Использовать для инвестиций. Знание — сила. И деньги.',
      effects: { funds: 15, secrecy: 5 },
    },
  },
  {
    id: 'universal_4',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Хрустальный шар показывает... что ты играешь в игру про тайное общество. МЕТАОТНОШЕНИЯ!',
    leftChoice: {
      text: 'Это... очень глубоко. Или очень тупо. Не могу решить.',
      effects: { chaos: 10, secrecy: 5 },
    },
    rightChoice: {
      text: 'СЛОМАТЬ ЧЕТВЁРТУЮ СТЕНУ! Я ЗНАЮ, ЧТО ТЫ ЧИТАЕШЬ ЭТО!',
      effects: { chaos: 15, influence: 5 },
    },
  },
  {
    id: 'universal_5',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Шеф, я нашёл документ: "Протокол 42". Там написано: "Если ты это читаешь — ты уже в игре."',
    leftChoice: {
      text: 'Сжечь документ. И память. И этот разговор.',
      effects: { secrecy: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Продолжить читать. "Протокол 42: всегда выбирай правую карточку."',
      effects: { chaos: 10, influence: 5, secrecy: -5 },
    },
  },
  {
    id: 'universal_6',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Мы случайно инвестировали в стартап по производству воздуха. Они уже миллиардеры. Буквально продают ВОЗДУХ.',
    leftChoice: {
      text: 'Гениально! Это как наш Орден, только легально.',
      effects: { funds: 10, chaos: 5, influence: 5 },
    },
    rightChoice: {
      text: 'Продать нашу долю. И забыть. И никогда не говорить об этом.',
      effects: { funds: 5, secrecy: 5, chaos: -5 },
    },
  },
  {
    id: 'universal_7',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Пророчество! В будущем люди будут платить за подписку на дыхание. Подожди, это уже происходит?',
    leftChoice: {
      text: 'Инвестировать в "Premium Oxygen". Золотой пакет: 10 вдохов в минуту.',
      effects: { funds: 10, chaos: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Это антиутопия! Даже для нас! ...Или нет?',
      effects: { chaos: 5, secrecy: 5, influence: 5 },
    },
  },
  {
    id: 'universal_8',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Знаешь, почему мы используем пирамиду как символ? Потому что она стабильная. И у неё есть ВЕРШИНА.',
    leftChoice: {
      text: 'Глубокомысленно. Как и всё, что ты говоришь. Сарказм.',
      effects: { influence: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'Или потому что мы просто любим геометрию? Бывает.',
      effects: { secrecy: 5, influence: 5 },
    },
  },
];

export const gameOverMessages: Record<string, { title: string; description: string; emoji: string }> = {
  secrecy_low: {
    title: 'РАСКРЫТИЕ!',
    description: 'Слишком много шума. Мир узнал о Ордене. Ваши секреты — мемы. Ваши базы — туристические объекты.',
    emoji: '📰',
  },
  secrecy_high: {
    title: 'ПАРАНОЙЯ!',
    description: 'Вы стали настолько секретными, что забыли, зачем всё это. Орден шепчет в темноте. Никто не помнит пароль.',
    emoji: '👁️',
  },
  influence_low: {
    title: 'ИРРЕЛЕВАНТНОСТЬ!',
    description: 'Мир забыл о вас. Ваши марионетки самостоятельны. Вы — просто конспирологический мем на Reddit.',
    emoji: '📉',
  },
  influence_high: {
    title: 'ТИРАНИЯ!',
    description: 'Абсолютная власть. Вы контролируете каждое дыхание. Но без сопротивления — нет игры. Орден умер от скуки.',
    emoji: '👑',
  },
  chaos_low: {
    title: 'ЗАСТОЙ!',
    description: 'Слишком стабильно. Предсказуемо. Агенты увольняются. Даже заговоры стали офисной рутиной.',
    emoji: '😴',
  },
  chaos_high: {
    title: 'АНАРХИЯ!',
    description: 'Хаос вышел из-под контроля. Гусь из другого измерения стал президентом. Буквально.',
    emoji: '🔥',
  },
  funds_low: {
    title: 'БАНКРОТСТВО!',
    description: 'Казна пуста. Орден не может оплатить WiFi. Агенты возвращаются к нормальной жизни. Грустно.',
    emoji: '💸',
  },
  funds_high: {
    title: 'ЖАДНОСТЬ!',
    description: 'Столько денег, что они потеряли смысл. Вы скупаете страны. Но корона слишком тяжела.',
    emoji: '💰',
  },
};

export const endings = [
  {
    id: 'shadow_king',
    condition: (stats: Stats) => stats.secrecy > 70 && stats.influence > 70,
    title: 'Теневой Король',
    description: 'Ты стал невидимой рукой мира. Никто не знает твоего имени, но все танцуют под твою дудку.',
  },
  {
    id: 'chaos_lord',
    condition: (stats: Stats) => stats.chaos > 70 && stats.influence > 50,
    title: 'Властелин Хаоса',
    description: 'Мир горит, и тебе это нравится. Ты — джокер в колоде реальности.',
  },
  {
    id: 'tycoon',
    condition: (stats: Stats) => stats.funds > 70 && stats.influence > 50,
    title: 'Теневой Магнат',
    description: 'Деньги — твоя религия. Ты скупаешь правительства как акции.',
  },
  {
    id: 'ghost',
    condition: (stats: Stats) => stats.secrecy > 70 && stats.funds > 50,
    title: 'Призрак',
    description: 'Ты — легенда. Миф. Самый богатый призрак в истории.',
  },
  {
    id: 'survivor',
    condition: (stats: Stats) =>
      stats.secrecy >= 25 && stats.secrecy <= 75 &&
      stats.influence >= 25 && stats.influence <= 75 &&
      stats.chaos >= 25 && stats.chaos <= 75 &&
      stats.funds >= 25 && stats.funds <= 75,
    title: 'Выживший',
    description: 'Баланс — твоё искусство. Идеальный бюрократ заговора.',
  },
  {
    id: 'default',
    condition: () => true,
    title: 'Шестерёнка Механизма',
    description: 'Ты был частью чего-то большего. Орден продолжит работу.',
  },
];
