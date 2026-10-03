// ===== ЭЛЕМЕНТЫ =====
const output = document.getElementById('output');
const cmd = document.getElementById('cmd');
const audioHint = document.getElementById('audioHint');
const bgMusic = document.getElementById('bg-music');
const musicIndicator = document.getElementById('musicIndicator');

// ===== КОМАНДЫ =====
const commands = {
    help: () => [
        'ДОСТУПНЫЕ КОМАНДЫ:',
        '  help    — список команд',
        '  ls      — файлы в архиве',
        '  cat     — прочитать файл (cat ИМЯ)',
        '  status  — статус системы',
        '  whoami  — кто вы?',
        '  clear   — очистить экран',
        '  exit    — выход'
    ],
    ls: () => [
        'log_07111998.txt',
        'photo_final.jpg',
        'audio_transmission.wav',
        '...ещё что-то шевелится'
    ],
    status: () => [
        'ЦЕЛОСТНОСТЬ АРХИВА: 47%',
        'ПОСЛЕДНЯЯ ЗАПИСЬ: 07.11.1998 23:47',
        'ОБНАРУЖЕНА АНОМАЛИЯ В СЕКТОРЕ 7'
    ],
    whoami: () => [
        'ВЫ — НЕ ТОТ, КЕМ СЕБЯ СЧИТАЕТЕ.',
        '...или уже нет.'
    ],
    'log_07111998.txt': () => [
        '23:42 — сигнал прерван',
        '23:43 — сотрудники покинули объект',
        '23:44 — дверь заблокирована изнутри',
        '23:45 — ...оно стучит',
        '23:46 — [ДАННЫЕ ПОВРЕЖДЕНЫ]',
        '23:47 — не открывайте'
    ],
    'photo_final.jpg': () => [
        '[ НЕВОЗМОЖНО ОТОБРАЗИТЬ ]',
        'ФАЙЛ СОДЕРЖИТ 2 ЛИЦА. НА СНИМКЕ БЫЛ 1 ЧЕЛОВЕК.'
    ],
    'audio_transmission.wav': () => [
        '[ ВОСПРОИЗВЕДЕНИЕ... ]',
        '...шшшшш... помогите... шшш... оно здесь... шшшш...',
        '[ ЗАПИСЬ ОБОРВАНА ]'
    ],
    clear: () => {
        output.innerHTML = '';
        return [];
    },
    exit: () => [
        'ВЫХОД НЕВОЗМОЖЕН.',
        'ВЫ УЖЕ ВНУТРИ.'
    ]
};

// ===== ПЕЧАТЬ ТЕКСТА =====
function printLine(text, className = '') {
    const p = document.createElement('p');
    p.className = 'line ' + className;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

// ===== ОБРАБОТКА КОМАНД =====
cmd.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const input = cmd.value.trim().toLowerCase();
    cmd.value = '';

    if (!input) return;

    printLine('> ' + input, 'warn');

    setTimeout(() => {
        if (commands[input]) {
            const result = commands[input]();
            result.forEach(line => printLine(line));
        } else {
            printLine('КОМАНДА НЕ РАСПОЗНАНА: ' + input);
            printLine('ВВЕДИТЕ "help" ДЛЯ СПИСКА КОМАНД.');
        }
        printLine('');
    }, 300);
});

// ===== ФОНОВАЯ МУЗЫКА =====
audioHint.addEventListener('click', () => {
    bgMusic.volume = 0.35;
    bgMusic.play()
        .then(() => {
            audioHint.style.display = 'none';
            if (musicIndicator) musicIndicator.classList.add('playing');
            console.log('♪ Музыка запущена и зациклена');
        })
        .catch(err => {
            console.error('Ошибка воспроизведения:', err);
            audioHint.textContent = '[ ОШИБКА: ПРОВЕРЬТЕ ФАЙЛ background.mp3 ]';
        });
});

// Дополнительная защита — если loop не сработает
bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
    bgMusic.play();
});