## Критерии оценки заданий

### Task 3. Logging & Error Handling

При выставлении оценок используйте [рекомендации RSSchool](https://docs.rs.school/#/cross-check-flow?id=%d0%9f%d1%80%d0%b8%d0%bd%d1%86%d0%b8%d0%bf-%d0%be%d1%86%d0%b5%d0%bd%d0%ba%d0%b8-%d1%80%d0%b0%d0%b1%d0%be%d1%82%d1%8b-%d0%bf%d1%80%d0%b8-cross-check-%d0%bf%d1%80%d0%be%d0%b2%d0%b5%d1%80%d0%ba%d0%b5).

Максимальная оценка - 100 баллов.

1. реализовано логирование (url, query parameters, body) для всех запросов к серверу с использованием middleware +20 баллов
2. добавлена централизованная обработка всех ошибок, которая включает отправку респонса с соответствующим кодом http статуса и их логирование с использованием middleware +20 баллов
3. добавлены обработка и логирование ошибок на событие `uncaughtException` +20 баллов
4. добавлены обработка и логирование ошибок на событие `unhandledRejection` +20 баллов
5. процесс логирования осуществляется единственным модулем +20 баллов
6. каждый коммит после дедлайна минус 10 баллов.

Все тесты `npm run test` должны проходить, если не проходят тесты минус 10 баллов.

**Подсказки:**

- _(3 пункт)_ Для проверки, пропишите `throw Error('Oops!')` ВНЕ инициализации express и ПОСЛЕ `process.on('uncaughtException', () => {})`. Например:

```
// Express initialization
const app = express().use(...);

// Exceptions catcher
process.on('uncaughtException'...);

// PUT IT HERE
throw Error('Oops!');

module.exports = app;
```

_Как результат_: вывод в консоли отловленной ошибки

- _(4 пункт)_ Для проверки, пропишите `Promise.reject(Error('Oops!'))` ВНЕ инициализации express и ПОСЛЕ `process.on('unhandledRejection', () => {})`:

```
// Express initialization
const app = express().use(...);

// Exceptions catcher
process.on('unhandledRejection'...);

// PUT IT HERE
Promise.reject(Error('Oops!'));

module.exports = app;
```

_Как результат_: вывод в консоли отловленной ошибки
