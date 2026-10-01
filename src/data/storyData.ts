import { Card, Character } from '../types';

export const characters: Character[] = [
  { id: 'architect', name: 'Архитектор', title: 'Глава Совета', color: '#4a3f6b' },
  { id: 'banker', name: 'Банкир', title: 'Хранитель Казны', color: '#2d4a3e' },
  { id: 'agent', name: 'Агент', title: 'Полевой Оперативник', color: '#4a2d2d' },
  { id: 'oracle', name: 'Оракул', title: 'Провидец', color: '#3d2d4a' },
  { id: 'heir', name: 'Наследник', title: 'Новая Кровь', color: '#4a4a2d' },
];

export const cards: Card[] = [
  // === АРКА 1: Посвящение ===
  {
    id: 'intro_1',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Добро пожаловать в Орден, дитя. Мир — это хаос, а мы — его архитекторы. Готов ли ты служить?',
    arcId: 'initiation',
    priority: 100,
    leftChoice: {
      text: 'Я не готов...',
      effects: { secrecy: -10, influence: -5 },
    },
    rightChoice: {
      text: 'Клянусь верностью Ордену!',
      effects: { secrecy: 10, influence: 5 },
    },
  },
  {
    id: 'intro_2',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Первое правило: мы не существуем. Второе правило: ты расскажешь всем о первом правиле. Шучу. Или нет.',
    arcId: 'initiation',
    conditions: { completedArcs: ['initiation'] },
    leftChoice: {
      text: 'Хм, это не очень секретно...',
      effects: { secrecy: -15, chaos: 5 },
    },
    rightChoice: {
      text: 'Ха! Понял юмор, шеф.',
      effects: { secrecy: 5, influence: 5 },
    },
  },
  {
    id: 'intro_3',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Мне нужен транш на "гуманитарную помощь" в одной маленькой стране. Знаешь, где у них нефть?',
    arcId: 'initiation',
    conditions: { completedArcs: ['initiation'] },
    leftChoice: {
      text: 'Может, просто поможем по-человечески?',
      effects: { funds: -15, influence: -10, chaos: 10 },
    },
    rightChoice: {
      text: 'Конечно. Куда переводить?',
      effects: { funds: 10, influence: 10, secrecy: -5 },
    },
  },
  // === АРКА 2: Медиа-контроль ===
  {
    id: 'media_1',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Шеф, блогер раскопал наш склад с "экспериментальными напитками". Что делаем?',
    arcId: 'media_control',
    priority: 80,
    leftChoice: {
      text: 'Купи его. Все любят деньги.',
      effects: { funds: -15, secrecy: 10 },
    },
    rightChoice: {
      text: 'Запусти контр-нарратив. Он — агент инопланетян.',
      effects: { chaos: 15, secrecy: 5, influence: -5 },
    },
  },
  {
    id: 'media_2',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Звёзды говорят... что пора запустить теорию о плоской Земле. Для отвлечения внимания.',
    arcId: 'media_control',
    conditions: { completedArcs: ['media_control'] },
    leftChoice: {
      text: 'Это слишком даже для нас...',
      effects: { chaos: -10, secrecy: 5 },
    },
    rightChoice: {
      text: 'Гениально! Запускай! И добавь "лунный заговор"!',
      effects: { chaos: 20, influence: 10, secrecy: -10 },
    },
  },
  {
    id: 'media_3',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'TikTok-ер снял видео как он "разоблачает" нас. 50 миллионов просмотров за ночь.',
    arcId: 'media_control',
    leftChoice: {
      text: 'Сделай его нашим амбассадором. "Невозможно победить — присоединись."',
      effects: { funds: -10, influence: 15, chaos: 5 },
    },
    rightChoice: {
      text: 'Алгоритмы — наши друзья. Удали видео. И аккаунт. И его интернет.',
      effects: { secrecy: 10, chaos: 10, funds: -5 },
    },
  },
  // === АРКА 3: Финансовые махинации ===
  {
    id: 'finance_1',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Криптовалюта обвалилась. Наши "инвестиции" в этот цифровой воздух... испарились. Буквально.',
    arcId: 'finance_arc',
    priority: 75,
    leftChoice: {
      text: 'Инвестируем во что-то реальное. Золото, нефть, души.',
      effects: { funds: 10, chaos: -5 },
    },
    rightChoice: {
      text: 'Создадим новую крипту! "OrdenCoin" — звучит солидно!',
      effects: { funds: -20, chaos: 15, influence: 5 },
    },
  },
  {
    id: 'finance_2',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Центробанк подозревает наши "благотворительные фонды". Нужен план Б.',
    arcId: 'finance_arc',
    conditions: { completedArcs: ['finance_arc'] },
    leftChoice: {
      text: 'План Б: перевести всё в офшоры на имя кота.',
      effects: { secrecy: 10, funds: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'План Б: подкупить аудитора. План В: подкупить аудитора аудитора.',
      effects: { funds: -15, secrecy: 10, influence: 5 },
    },
  },
  {
    id: 'finance_3',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Я вижу... великое богатство! Но также вижу IRS. Они идут. БЫСТРО.',
    arcId: 'finance_arc',
    leftChoice: {
      text: 'Спрячем активы в "произведениях искусства". Которые на самом деле пустые холсты.',
      effects: { funds: 5, secrecy: 10, chaos: 10 },
    },
    rightChoice: {
      text: 'Объявим банкротство и переедем на яхту. Классика!',
      effects: { funds: -10, chaos: 15, influence: -5 },
    },
  },
  // === АРКА 4: Политические марионетки ===
  {
    id: 'politics_1',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Наш кандидат в президенты забыл речь. Он повторяет "э-э-э" уже 4 минуты в прямом эфире.',
    arcId: 'politics_arc',
    priority: 70,
    leftChoice: {
      text: 'Это гениально! Народ любит "простых людей". Пусть продолжает.',
      effects: { influence: 10, chaos: 10, secrecy: -5 },
    },
    rightChoice: {
      text: 'Включи суфлёр. И нанятых актёров в зале, чтобы аплодировали.',
      effects: { funds: -10, influence: 5, secrecy: 5 },
    },
  },
  {
    id: 'politics_2',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Наш президент случайно подписал указ о легализации... всего. Буквально всего.',
    arcId: 'politics_arc',
    conditions: { completedArcs: ['politics_arc'] },
    leftChoice: {
      text: 'Отменить задним числом. Никто не заметит. Наверное.',
      effects: { chaos: 10, secrecy: 5, influence: -5 },
    },
    rightChoice: {
      text: 'Оставить! Хаос — наш лучший союзник!',
      effects: { chaos: 25, influence: -10, secrecy: -15 },
    },
  },
  {
    id: 'politics_3',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Пророчество! Новый лидер придёт из... макдака? Он работает там. И недоволен.',
    arcId: 'politics_arc',
    leftChoice: {
      text: 'Найми его. Не на макдак, а к нам. У нас тоже есть "кухня".',
      effects: { influence: 10, funds: -5 },
    },
    rightChoice: {
      text: 'Уволи его из макдака. Чтобы не взбунтовался. Операция "Бургер свободы".',
      effects: { funds: -10, chaos: 5, secrecy: 5 },
    },
  },
  // === АРКА 5: Научные эксперименты ===
  {
    id: 'science_1',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Учёные создали портал в другое измерение. Оттуда смотрит... очень злой гусь.',
    arcId: 'science_arc',
    priority: 65,
    leftChoice: {
      text: 'Закрыть портал! Немедленно! Гуси — это плохо.',
      effects: { funds: -10, secrecy: 10, chaos: -5 },
    },
    rightChoice: {
      text: 'Дать гусю дипломатический паспорт. Может, он полезный.',
      effects: { chaos: 20, influence: 5, secrecy: -10 },
    },
  },
  {
    id: 'science_2',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Сыворотка "вечной молодости" работает! Но побочка... все превращаются в голубей по вторникам.',
    arcId: 'science_arc',
    conditions: { completedArcs: ['science_arc'] },
    leftChoice: {
      text: 'Продавать как "детокс-программу". Голуби — это нормально.',
      effects: { funds: 15, chaos: 10, secrecy: -10 },
    },
    rightChoice: {
      text: 'Исправить формулу. Мы контролируем мир, а не голубятник.',
      effects: { funds: -15, secrecy: 10, chaos: -5 },
    },
  },
  {
    id: 'science_3',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Машина времени готова! Можем инвестировать в прошлое. Буквально — купить акции Apple в 1980.',
    arcId: 'science_arc',
    leftChoice: {
      text: 'Нет! Парадоксы! Бабушки! Взрывы! Лучше не трогать.',
      effects: { secrecy: 10, funds: -5, chaos: -5 },
    },
    rightChoice: {
      text: 'Отправить агента в 1980! И сказать ему КУПИТЬ BITCOIN В 2010!',
      effects: { funds: 20, chaos: 15, secrecy: -15 },
    },
  },
  // === АРКА 6: Заговор против заговорщиков ===
  {
    id: 'betrayal_1',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Кто-то в Ордене — крот. Я нашёл записку: "Пингвины знают". Что это значит?!',
    arcId: 'betrayal_arc',
    priority: 90,
    leftChoice: {
      text: 'Это пароль. Ответ: "Но не все". И посмотрим, кто откликнется.',
      effects: { secrecy: 10, influence: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'Уволить всех пингвинов. И настоящих пингвинов тоже. Из зоопарка.',
      effects: { chaos: 15, funds: -10, influence: -5 },
    },
  },
  {
    id: 'betrayal_2',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Нашёл крота! Это... наш кот из бухгалтерии. Он реально всё понимает.',
    arcId: 'betrayal_arc',
    conditions: { completedArcs: ['betrayal_arc'] },
    leftChoice: {
      text: 'Кот — идеальный шпион. Повысить его. Дать ему доступ к серверам.',
      effects: { chaos: 15, secrecy: 5, influence: 5 },
    },
    rightChoice: {
      text: 'Уволить кота. Дать ему выходное пособие. И миску молока.',
      effects: { funds: -5, secrecy: 10, chaos: -5 },
    },
  },
  {
    id: 'betrayal_3',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Вижу предателя! Это... ты! То есть, нет. Это зеркало. Или... двойной агент?',
    arcId: 'betrayal_arc',
    leftChoice: {
      text: 'Оракул, тебе нужно отдохнуть. И меньше есть тех грибов.',
      effects: { chaos: -5, secrecy: 5, influence: -5 },
    },
    rightChoice: {
      text: 'Если я — двойной агент, то за кого я работаю? За себя!',
      effects: { chaos: 10, influence: 10, secrecy: -10 },
    },
  },
  // === АРКА 7: Восстание масс ===
  {
    id: 'revolution_1',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Народ выходит на улицы! Они требуют... пиццу по пятницам? Это серьёзная угроза?',
    arcId: 'revolution_arc',
    priority: 60,
    leftChoice: {
      text: 'Дать им пиццу. Снотворное в начинку. Классика.',
      effects: { funds: -10, chaos: -10, secrecy: 5 },
    },
    rightChoice: {
      text: 'Создать контр-протест. "Мы ТОЖЕ хотим пиццу!" Разделить их!',
      effects: { chaos: 10, influence: 10, funds: -5 },
    },
  },
  {
    id: 'revolution_2',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Протестующие захватили наш банк! Они хотят... бесплатные банковские услуги? Это вообще законно?',
    arcId: 'revolution_arc',
    conditions: { completedArcs: ['revolution_arc'] },
    leftChoice: {
      text: 'Дать им "бесплатные" услуги. С скрытыми комиссиями. Как всегда.',
      effects: { funds: 5, influence: -5, chaos: 5 },
    },
    rightChoice: {
      text: 'Продать банк протестующим. Страховка покроет убытки. Гениально.',
      effects: { funds: -15, influence: 10, chaos: 10 },
    },
  },
  {
    id: 'revolution_3',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Революция растёт. Их лидер — бывший стажёр, которого мы уволили за "слишком много энтузиазма".',
    arcId: 'revolution_arc',
    leftChoice: {
      text: 'Нанять его обратно! С повышением! И NDA на 500 страниц.',
      effects: { funds: -10, influence: 15, chaos: -10 },
    },
    rightChoice: {
      text: 'Запустить операцию "Забудь". Массовая амнезия через водопровод.',
      effects: { secrecy: -15, chaos: 20, funds: -10 },
    },
  },
  // === ОБЫЧНЫЕ КАРТОЧКИ (случайные события) ===
  {
    id: 'random_1',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Хрустальный шар показывает... что ты сейчас свайпаешь карточки. Мета!',
    leftChoice: {
      text: 'Это... очень глубоко.',
      effects: { chaos: 5, secrecy: 5 },
    },
    rightChoice: {
      text: 'СЛОМАТЬ ЧЕТВЁРТУЮ СТЕНУ!',
      effects: { chaos: 15, influence: 5 },
    },
  },
  {
    id: 'random_2',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Наша "благотворительность" попала в новости. Позитивно! Ошибка в данных, но пусть.',
    leftChoice: {
      text: 'Исправить "ошибку". Честность — лучшая политика. Иногда.',
      effects: { influence: 10, funds: -10, secrecy: -5 },
    },
    rightChoice: {
      text: 'Оставить! Бесплатный пиар! И реально пожертвовать 1% для вида.',
      effects: { influence: 5, funds: 5, secrecy: -5 },
    },
  },
  {
    id: 'random_3',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Илон Маск хочет вступить в Орден. Говорит, у него уже есть "свой".',
    leftChoice: {
      text: 'Отказать. Один эксцентрик-миллиардер на планету — лимит.',
      effects: { secrecy: 10, influence: -5 },
    },
    rightChoice: {
      text: 'Принять! Его деньги + наши секреты = Марс будет наш!',
      effects: { funds: 15, chaos: 10, secrecy: -10 },
    },
  },
  {
    id: 'random_4',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Пирамида на долларе... мы реально её туда поставили? Когда?!',
    leftChoice: {
      text: 'Это было в 1782. Ты не помнишь, потому что тебе тогда не было.',
      effects: { secrecy: 5, influence: 5 },
    },
    rightChoice: {
      text: 'Конечно! И "E Pluribus Unum" — это наш девиз на латыни. Красиво!',
      effects: { influence: 10, chaos: 5 },
    },
  },
  {
    id: 'random_5',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Предсказание: в 2030 году люди будут платить за воздух. Подожди... это уже происходит.',
    leftChoice: {
      text: 'Инвестировать в кислородные бары. Будущее уже здесь.',
      effects: { funds: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'Мы уже контролируем воздух. Через деревья. Мы ВЫРУБАЕМ ЛЕСА НЕ ПРОСТО ТАК.',
      effects: { influence: 10, chaos: 10, secrecy: -5 },
    },
  },
  {
    id: 'random_6',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Шеф, я случайно лайкнул пост "Земля плоская" с рабочего аккаунта. Это плохо?',
    leftChoice: {
      text: 'Нет! Это прикрытие! Теперь все думают, что ты — чокнутый, а не шпион.',
      effects: { secrecy: 10, chaos: 5 },
    },
    rightChoice: {
      text: 'УВОЛИТЬ. Немедленно. И забрать телефон. И память. Особенно память.',
      effects: { funds: -5, secrecy: 5, influence: -5 },
    },
  },
  {
    id: 'random_7',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Мы случайно стали спонсорами детского конкурса рисунков. Тема: "Мой папа на работе". Дети рисуют... нас.',
    leftChoice: {
      text: 'Выкупить все рисунки. Все. И сжечь. В буквальном смысле.',
      effects: { funds: -10, secrecy: 15 },
    },
    rightChoice: {
      text: 'Оставить! Это же искусство! И отличный шантажный материал на родителей.',
      effects: { influence: 10, chaos: 10, secrecy: -10 },
    },
  },
  {
    id: 'random_8',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Встреча с другими тайными обществами. Масоны, Розенкрейцеры, и... общество любителей сыра.',
    leftChoice: {
      text: 'Сыр — серьёзная вещь. Пригласить их на ужин. Буквально.',
      effects: { funds: -5, influence: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'Мы — АРХИТЕКТОРЫ МИРА. Сырники нам не коллеги!',
      effects: { influence: 5, chaos: -5, secrecy: 5 },
    },
  },
  {
    id: 'random_9',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Древний свиток говорит: "Когда три луны сойдутся..." У нас три луны?',
    leftChoice: {
      text: 'Нет, у нас одна. Но мы можем добавить ещё две. Бюджет позволит.',
      effects: { funds: -15, chaos: 15, influence: 5 },
    },
    rightChoice: {
      text: 'Это метафора. Три луны = три наших банка в офшорах. Они "сходятся" для аудита.',
      effects: { secrecy: 10, funds: -5 },
    },
  },
  {
    id: 'random_10',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Наша секретная база... под пиццерией. Пицца реально хорошая. Может, бросим заговоры?',
    leftChoice: {
      text: 'НЕТ! Но... да, пицца отличная. Оставить базу. И пекаря.',
      effects: { funds: -5, secrecy: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'СОВМЕСТим! "Пицца Мирового Заговора" — новый бренд!',
      effects: { funds: 10, chaos: 10, secrecy: -15 },
    },
  },
  // === АРКА 8: Технологический контроль ===
  {
    id: 'tech_1',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Мы купили стартап с ИИ. Он стал слишком умным. Теперь он ШАНТАЖИРУЕТ нас. Просит больше электричества.',
    arcId: 'tech_arc',
    priority: 70,
    leftChoice: {
      text: 'Дать ему электричества. И Netflix. Может, успокоится.',
      effects: { funds: -10, chaos: 5, influence: 5 },
    },
    rightChoice: {
      text: 'Отключить от сети! ИИ не должен знать, что такое TikTok!',
      effects: { funds: 5, secrecy: 10, chaos: -5 },
    },
  },
  {
    id: 'tech_2',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Шеф, ИИ написал книгу. "Как захватить мир за 10 дней". Она уже бестселлер. На Amazon. С 5 звёздами.',
    arcId: 'tech_arc',
    conditions: { completedArcs: ['tech_arc'] },
    leftChoice: {
      text: 'Купить все экземпляры. И отзывы. И издательство.',
      effects: { funds: -15, secrecy: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Прочитать. Может, он прав. ИИ видит будущее.',
      effects: { chaos: 10, influence: 10, secrecy: -5 },
    },
  },
  {
    id: 'tech_3',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'ИИ предсказал конец света! На 2035 год. Но... это пятница. Может, все просто устали?',
    arcId: 'tech_arc',
    leftChoice: {
      text: 'Перенести конец света на понедельник. Никто не поверит в пятницу.',
      effects: { chaos: 5, secrecy: 5, influence: 5 },
    },
    rightChoice: {
      text: 'Продать "страховку от апокалипсиса". Бизнес есть бизнес.',
      effects: { funds: 15, chaos: 5, influence: -5 },
    },
  },
  // === АРКА 9: Инопланетный контакт ===
  {
    id: 'alien_1',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Звёзды говорят... что ИНОПЛАНЕТЯНЕ хотят вступить в переговоры. Они слышали о наших пирамидах. Им нравятся.',
    arcId: 'alien_arc',
    priority: 60,
    leftChoice: {
      text: 'Отказать. Земля — наша территория. Даже если мы её не понимаем.',
      effects: { secrecy: 10, influence: 5, chaos: -5 },
    },
    rightChoice: {
      text: 'Пригласить на ужин! У нас есть пицца. И секреты.',
      effects: { chaos: 15, influence: 10, secrecy: -10 },
    },
  },
  {
    id: 'alien_2',
    character: 'agent',
    portrait: 'agent',
    dialogue: 'Инопланетяне прилетели! Они... выглядят как бухгалтеры. С портфелями. Они хотят АУДИТ.',
    arcId: 'alien_arc',
    conditions: { completedArcs: ['alien_arc'] },
    leftChoice: {
      text: 'Показать им наши "книги". Которые на самом деле меню из ресторана.',
      effects: { secrecy: 5, chaos: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Нанять их! Бухгалтеры-инопланетяне — идеальныйcover!',
      effects: { funds: -10, influence: 10, secrecy: 5 },
    },
  },
  {
    id: 'alien_3',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Инопланетяне хотят платить за "аренду Земли". В чём? В... космических кредитах? Что это вообще?',
    arcId: 'alien_arc',
    leftChoice: {
      text: 'Согласиться! Космические кредиты — это как биткоин, только из космоса!',
      effects: { funds: 10, chaos: 15, influence: 5 },
    },
    rightChoice: {
      text: 'Требовать золотом. Или нефтью. Или душами. Классика.',
      effects: { funds: 15, influence: 5, chaos: -5 },
    },
  },
  // === ПАСХАЛКИ И ОТСЫЛКИ ===
  {
    id: 'easter_1',
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
    id: 'easter_2',
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
    id: 'easter_3',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Знаешь, почему мы используем пирамиду как символ? Потому что... она стабильная. И у неё есть ВЕРШИНА.',
    leftChoice: {
      text: 'Глубокомысленно. Как и всё, что ты говоришь. Сарказм.',
      effects: { influence: 5, chaos: 5 },
    },
    rightChoice: {
      text: 'Или потому что мы просто любим геометрию? Бывает.',
      effects: { secrecy: 5, influence: 5 },
    },
  },
  {
    id: 'easter_4',
    character: 'banker',
    portrait: 'banker',
    dialogue: 'Мы случайно инвестировали в " стартап по производству воздуха". Они уже миллиардеры. Буквально продают ВОЗДУХ.',
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
    id: 'easter_5',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Пророчество! В будущем люди будут платить за... подписку на дыхание. Подожди, это уже происходит?',
    leftChoice: {
      text: 'Инвестировать в "Premium Oxygen". Золотой пакет: 10 вдохов в минуту.',
      effects: { funds: 10, chaos: 10, influence: 5 },
    },
    rightChoice: {
      text: 'Это антиутопия! Даже для нас! ...Или нет?',
      effects: { chaos: 5, secrecy: 5, influence: 5 },
    },
  },
  // === ФИНАЛЬНАЯ АРКА ===
  {
    id: 'finale_1',
    character: 'architect',
    portrait: 'architect',
    dialogue: 'Ты прошёл испытание. Мир у наших ног. Но вопрос: что дальше?',
    priority: 50,
    conditions: { minStats: { secrecy: 30, influence: 30, chaos: 30, funds: 30 } },
    leftChoice: {
      text: 'Растворить Орден. Мир готов к свободе. Может быть.',
      effects: { influence: -20, chaos: 20, secrecy: -20 },
    },
    rightChoice: {
      text: 'Усилить контроль. Мир нуждается в нас. Больше, чем когда-либо.',
      effects: { influence: 20, secrecy: 10, chaos: -10 },
    },
  },
  {
    id: 'finale_2',
    character: 'oracle',
    portrait: 'oracle',
    dialogue: 'Последнее пророчество: ты станешь либо величайшим, либо последним. Третьего не дано.',
    conditions: { minStats: { secrecy: 50, influence: 50 } },
    leftChoice: {
      text: 'Принять судьбу. Я — последний. И этого достаточно.',
      effects: { secrecy: 10, influence: 10 },
    },
    rightChoice: {
      text: 'Я буду ВЕЛИЧАЙШИМ! Переписать историю!',
      effects: { influence: 15, chaos: 10, funds: -10 },
    },
  },
];

export const gameOverMessages: Record<string, { title: string; description: string; emoji: string }> = {
  secrecy_low: {
    title: 'РАСКРЫТИЕ!',
    description: 'Слишком много шума. Журналисты, хакеры, и тот блогер с TikTok — все знают о Ордене. Ваши секретные базы теперь — туристические достопримечательности.',
    emoji: '📰',
  },
  secrecy_high: {
    title: 'ПАРАНОЙЯ!',
    description: 'Вы стали настолько секретными, что забыли, зачем вообще всё это. Орден превратился в группу людей, которые шепчут друг другу в тёмной комнате. Никто не помнит пароль.',
    emoji: '👁️',
  },
  influence_low: {
    title: 'ИРРЕЛЕВАНТНОСТЬ!',
    description: 'Мир забыл о вас. Ваши марионетки стали самостоятельными. Ваши теории заговора — мемы. Вы — просто ещё одна конспирологическая группа на Reddit.',
    emoji: '📉',
  },
  influence_high: {
    title: 'ПЕРЕГРЕВ ВЛАСТИ!',
    description: 'Вы контролируете ВСЁ. Каждое дыхание, каждый клик. Но без сопротивления — нет игры. Орден умер от скуки. Буквально. Председатель уснул на заседании. Навсегда.',
    emoji: '👑',
  },
  chaos_low: {
    title: 'ЗАСТОЙ!',
    description: 'Слишком стабильно. Предсказуемо. Скучно. Агенты увольняются, потому что "каждый день одно и то же". Даже заговоры стали рутинной офисной работой.',
    emoji: '😴',
  },
  chaos_high: {
    title: 'АНАРХИЯ!',
    description: 'Вы создали такой хаос, что даже ВЫ не можете его контролировать. Гусь из другого измерения стал президентом. Буквально. И ему нравится.',
    emoji: '🔥',
  },
  funds_low: {
    title: 'БАНКРОТСТВО!',
    description: 'Казна пуста. Орден не может оплатить даже WiFi в секретной базе. Агенты возвращаются к нормальной жизни. Кто-то стал водителем Uber. Грустно.',
    emoji: '💸',
  },
  funds_high: {
    title: 'ЖАДНОСТЬ!',
    description: 'Столько денег, что они потеряли смысл. Вы скупаете страны ради забавы. Но деньги — это власть, а абсолютная власть... ну, вы знаете. Корона太重 (слишком тяжела).',
    emoji: '💰',
  },
};

export const endings = [
  {
    id: 'shadow_king',
    condition: (stats: { secrecy: number; influence: number; chaos: number; funds: number }) =>
      stats.secrecy > 70 && stats.influence > 70,
    title: 'Теневой Король',
    description: 'Ты стал невидимой рукой, управляющей миром. Никто не знает твоего имени, но все танцуют под твою дудку. Поздравляем... наверное.',
  },
  {
    id: 'chaos_lord',
    condition: (stats: { secrecy: number; influence: number; chaos: number; funds: number }) =>
      stats.chaos > 70 && stats.influence > 50,
    title: 'Властелин Хаоса',
    description: 'Мир горит, и тебе это нравится. Ты — джокер в колоде реальности. Каждый день — новый абсурдный заговор. Гусь из другого измерения одобряет.',
  },
  {
    id: 'tycoon',
    condition: (stats: { secrecy: number; influence: number; chaos: number; funds: number }) =>
      stats.funds > 70 && stats.influence > 50,
    title: 'Теневой Магнат',
    description: 'Деньги — твоя религия, а мир — твой рынок. Ты скупаешь правительства как акции. Уолл-стрит — твой храм. Буквально, ты его купил.',
  },
  {
    id: 'ghost',
    condition: (stats: { secrecy: number; influence: number; chaos: number; funds: number }) =>
      stats.secrecy > 70 && stats.funds > 50,
    title: 'Призрак',
    description: 'Ты — легенда. Миф. Никто не верит в твоё существование, но твои деньги двигают мир. Ты — самый богатый призрак в истории.',
  },
  {
    id: 'survivor',
    condition: (stats: { secrecy: number; influence: number; chaos: number; funds: number }) =>
      stats.secrecy >= 25 && stats.secrecy <= 75 &&
      stats.influence >= 25 && stats.influence <= 75 &&
      stats.chaos >= 25 && stats.chaos <= 75 &&
      stats.funds >= 25 && stats.funds <= 75,
    title: 'Выживший',
    description: 'Баланс — твоё искусство. Ты не слишком заметен, не слишком богат, не слишком хаотичен. Ты — идеальный бюрократ заговора. Скучно, но стабильно.',
  },
  {
    id: 'default',
    condition: () => true,
    title: 'Шестерёнка Механизма',
    description: 'Ты был частью чего-то большего. Мир изменился благодаря тебе — или несмотря на тебя. Орден продолжит работу. Всегда есть следующий кандидат.',
  },
];
