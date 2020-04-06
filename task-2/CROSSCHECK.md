## Критерии оценки заданий

### Task 2. Express REST service

Проверку тестов следует проводить в [Node.js последней LTS версии](https://nodejs.org/en/).
При выставлении оценок используйте [рекомендации RSSchool](https://docs.rs.school/#/cross-check-flow?id=%d0%9f%d1%80%d0%b8%d0%bd%d1%86%d0%b8%d0%bf-%d0%be%d1%86%d0%b5%d0%bd%d0%ba%d0%b8-%d1%80%d0%b0%d0%b1%d0%be%d1%82%d1%8b-%d0%bf%d1%80%d0%b8-cross-check-%d0%bf%d1%80%d0%be%d0%b2%d0%b5%d1%80%d0%ba%d0%b5).
Минимальная оценка за таску не может быть меньше 0.
Максимально возможная оценка: 170 баллов - 1 пункт, 10 баллов - 3 пункт, 10 баллов - 4 пункт, 20 баллов - 5 пункт.

1. каждый успешный тест при выполнении скрипта `npm run test` +10 баллов.
2. в тестах не должно быть исправлений, за исключением обновлений из [репозитория RS School](https://github.com/rolling-scopes-school/nodejs-course-template/tree/master). Если есть другие изменения в файлах с тестами, за каждый исправленный тест минус 10 баллов.

  >  **Как обновиться из [репозитория RS School](https://github.com/rolling-scopes-school/nodejs-course-template/tree/master)**
  >  1. Установить VSCode как дефолтный GIT редактор (не обязательный пункт)
  >    ```bash
  >      git config --global core.editor "code --wait"
  >    ```
  >  2. Закомитать текущие изменения
  >  3. Добавить в качестве дополнительного удаленного репозитория темплейт
  >    ```bash
  >      git remote add template https://github.com/rolling-scopes-school/nodejs-course-template.git
  >    ```
  >  4. Применить изменения из темплейта
  >    ```bash
  >      git pull template master --allow-unrelated-histories
  >    ```
  >  5. Применить все свои изменения
  >    ```bash
  >      git checkout --ours ':!node_modules'
  >    ```
  >  6. Применить все изменения для папки `test`
  >    ```bash
  >      git checkout --theirs ./test
  >    ```
  >  7. Сохранить изменения
  >    ```bash
  >      git add .
  >    ```
  >  8. Продолжить мердж
  >    ```bash
  >      git commit
  >    ```
  >  9. Закрыть вкладку VSCode с описанием коммита. Если дефолтный редактор не меняли - выйти из VIM  `:qa`

3. должна быть создана отдельная папка `boards`, с файловой структурой, аналогичной `users` темплейта + 10 баллов.
4. должна быть создана отдельная папка `tasks`, с файловой структурой, аналогичной `users` темплейта + 10 баллов.
5. код приложения разделен по модулям в соответствии с его назначением (работа с запросом и ответом в *.router.js, бизнес-логика в *.service.js, работа с хранилищем данных в *.repository.js и т.п.) + 20 баллов.
