# Fit-friends Shop

Учебный проект студента HTML Academy [Дмитрий Лагутин](https://up.htmlacademy.ru/nodejs-2/6/user/2256781). **Акселератор: 1 проект (итерация)**.

## Архитектура
Монолит

**Backend**:
1. Node.js LTS

2. Express.js

3. Nest.js

4. TypeScript

5. PostgreSQL

6. ООП

**Frontend**:
1. React 18

2. TypeScript

3. Любые необходимые пакеты.

## Команды приложения
**вводите команды попорядку сверху/вниз, чтобы инициализировать приложение. Находится в терминале нужно в папке `project` ☝️. Команды указаны с тех расчетом, что у Вас установлен nx-пакет глобально.**

## Backend

Все скрипты прописаны в файле `project.json` директория `project/apps/backend/` . Там же лежат файлы другие важные файлы:
- docker-compose.dev.yml - настройка контейнер-инфраструктура
- .env - переменные окружения
- backend.http - для тестирование путей

### Docker-compose

Первым делом нужно создать контейнеры. Для этого нужно запустить команду
```
nx run backend:docker:compose
```

### База данных

**инициализировать базу данных PostgreSQL и её таблицы**
```
nx run backend:db:migrate
```
**инициализировать Prisma Client**
```
nx run backend:db:generate
```
если не получится, то можно пройти в терминале по пути `/project/libs/common/src/model` и выполнить команду `npx prisma generate`

**засеять базу данных тестовыми данными**
```
nx run backend:db:seed
```

**очистить базу данных**
```
nx run backend:db:reset
```

## Техническое задание

FitFriends — это онлайн площадка для поиска тренировок. Сайт предлагает широкий выбор фитнес-тренировок для людей любого уровня подготовки, разных направлений. На сайте доступен личный кабинет пользователя, возможность индивидуального подбора тренировок, возможность покупки тренировок и отслеживания прогресса.

### Задача проекта

Разработать веб-приложения, необходимо реализовать бэкенд, фронтенд указанных страниц и подготовить часть к деплою.
Вёрстка проекта предоставляется готовой в сборке Vite.
Для разработки применяются технологии, перечисленные в разделе «Технические требования».
Применение дополнительных инструментов, не указанных в списке, допускается.

### Первая итерация
На первой итерации предстоит работа над страницами проекта:

- Регистрация
- Опросник пользователя
- Вход
- Главная
- Личный кабинет пользователь
- Мои покупки (список купленных тренировки)
- Каталог тренировок (все доступные пользователю тренировки)
- Карточка тренировки (отдельная страница с материалами тренировки)

Попап:

- отзывы по тренировке
- покупка тренировки

### Дополнительные задания итерации

Если вы не реализуете дополнительные задания итерации, соответствующие элементы интерфейса должны быть скрыты

-Работа с микросервисной архитектурой
-Опросник для рекомендаций пользователю

## Технические требования

### Общие

Вёрстка готова. Внесение правок допускается. Сборка фронтенда реализована на основе Vite.
Разработка проектов производится в монорепозитории. Бэкенд и Фронтенд вместе.
Применять дополнительные пакеты разрешено.

### Бэкенд

- Node.js LTS;
- TypeScript;
- Express / Nest;
- MongoDB / PostgreSQL. Выбор базы или применение нескольких баз остаётся на ваше усмотрение;
- RabbitMQ (опционально);
- Архитектура: монолит / микросервисы. Мы рекомендуем использовать монолит.

### Фронтенд

- React 18+;
- React Router 6+;
- TypeScript;
- Redux Toolkit (опционально).

### Подготовка к деплою
- Jest, React Testing Library;
- Github Container Registry (опционально);
- Docker.

### Сервис API
**Результатом вашей работы должны быть:**

Подготовлена общая инфраструктура проекта: docker-compose для разворачивания СУБД, начальное заполнение базы данных, настроены сценарии запуска и так далее.

Реализованы все сценарии раздела Пользователи. Реализована полная поддержка JWT.

Сервис конфигурируются через переменные окружения (всё что необходимо для работы запрашиваемых сценариев).

Реализованы все сценарии раздела Личный кабинет пользователя:
- список купленных тренировок,
- баланс пользователя

Реализованы сценарии раздела Отзывы

Реализованы сценарии раздела Каталог тренировок

Реализовать сценарии раздела Тренировка

Реализовать сценарии раздела Покупка (заказ)

Реализованы сценарии дополнительного задания

## Предметная область

Для начального наполнения базы данных предусмотрена отдельная функциональная возможность. Реализация остаётся на усмотрение разработчика. Генерации 5-10 сущностей каждого вида обязательна.

### Пользователь
**Пользователь представлен набором информации:**

Имя. Имя пользователя. Например: Иван. Ограничения: обязательно для заполнения; минимальная длина 1 символ; максимальная длина 15 символов; только буквы русского/английского алфавита.

Электронная почта. Адрес электронной почты, используется в качестве имени пользователя (логин).
Ограничения: обязательно для заполнения; валидный адрес электронной почты; уникальность — в системе не может быть двух пользователей с одинаковым email.

Аватар пользователя. Ограничения: изображение в формате .jpg или .png; максимальный размер изображения 1 мегабайт.

Пароль. Ограничения: обязательно для заполнения; минимальная длина 6 символов; максимальная длина 12 символов.

Пол. Ограничения: обязательно для заполнения. Одно из трёх значений: женский, мужской и неважно.

Дата рождения. Ограничения: дата рождения включает день, месяц и год; необязательно для заполнения.
Описание. Текст с общей информацией. Минимальная длина 10 символ. Максимальная длина: 140 символов.

Локация. Станция метро. Ограничения: обязательно для заполнения; одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная».

Изображение для страницы. Фоновая картинка для карточки пользователя. Ограничения: обязательно для загрузки; изображение в формате jpg/png. Список фоновых изображений предопределён (берутся из вёрстки). Опционально — для данного функционала можно переиспользовать изображение аватара.

Дата создания. Дата создания пользователя в системе. Заполняется автоматически.

### Дополнительное задание

#### Пользователь. Дополнительная информация (опросник) — сущность результат Опроса:

Уровень подготовки. Уровень физической подготовки пользователя. Ограничения: обязательно для заполнения; допустимые значения: новичок, любитель, профессионал.

Тип тренировок. Ограничения: обязательно для заполнения; допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес; одновременно может быть выбрано не больше трёх значений.

Время на тренировку. Время на тренировку указывается в предопределённых интервалах. Ограничения: обязательно для заполнения; один из вариантов: 10-30 мин, ``30-50 мин, 50-80 мин, 80-100 мин`.

Количество калорий для сброса. Ограничения: обязательно для заполнения; минимальное значение 1000, максимально значение 5000; только целые числа.

Количество калорий для траты в день. Ограничения: обязательно для заполнения; минимальное значение 1000; максимальное значение: 5000; только целые числа.

Готовность к тренировке. Флаг готовности пользователя к приглашениям на тренировку.

#### Баланс пользователя
Хранит информацию о купленных тренировках пользователя.

Набор информации для хранения:

Тренировка;

Количество доступных тренировок;

#### Отзыв

Отзыв представлен набором информации:

Автор отзыва. Информация об авторе отзыва. Ограничения: существующий пользователь в системе;

Тренировка. Ограничения: существующая тренировка в системе;

Оценка. Оценка от 1 до 5 (включительно). Ограничения: только целые числа; числа в диапазоне от 1 до 5 (включительно).

Текст отзыва. Ограничения: обязательно для заполнения; минимум 100 символов; максимум 1024 символа.

Дата создания отзыва. Ограничения: обязательно для заполнения.

#### Тренировка

Тренировка представлена набором информации:

Название тренировки. Ограничения: обязательно для заполнения; минимальная длина 1 символ, максимальная длина 15 символов.

Фоновое изображение. Фоновая картинка для карточки тренировки. Ограничения: обязательно для загрузки; изображение в формате jpg/png. Список фоновых изображений предопределён (берутся из макета).

Уровень. Уровень пользователя, на которого рассчитана тренировка. Ограничения: обязательное для заполнения; значения для заполнения: новичок, любитель, профессионал; только одно значение из перечисленных.

Тип тренировки. Ограничения: обязательно для заполнения; одно значение из списка: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес.

Длительность тренировки. Продолжительность тренировки в минутах. Ограничения: обязательно для заполнения; один из предопределённых вариантов: 10-30 мин, 30-50 мин, 50-80 мин, 80-100 мин.

Цена. Стоимость тренировки в рублях. Ограничения: целые числа; число больше или равно 0. Значение 0 подразумевает бесплатную тренировку.

Количество калорий. Ограничения: обязательно для заполнения; минимальное значение 1000, максимально значение 5000; только целые числа.

Описание. Описание тренировки. Ограничения: обязательно для заполнения; минимальная длина 10 символов; максимальная длина 140 символов.

Пол. Пол пользователя для которого предназначена тренировка. Ограничения: обязательно для заполнения. Одно из трёх значений: для женщин, для мужчин и для всех.

Видео тренировки. Видео файл с демонстрацией тренировки. Ограничения: обязательно для заполнения; только одно видео; формат видео mov/avi/mp4.

Рейтинг тренировки. Рейтинг тренировки. Рассчитывается автоматически на основании пользователей. По умолчанию значение 0.

Тренер. Тренер, создатель тренировки. Например: Иван. Ограничения: обязательно для заполнения; минимальная длина 1 символ; максимальная длина 15 символов; только буквы русского/английского алфавита.

Признак специального предложения. Флаг определяет участие тренировки (участвует, не участвует) в качестве специального предложения.

#### Заказ (покупка)

Заказ тренировки представлен набором информации:

Вид покупки. Ограничения: обязательно для заполнения; абонемент.

Услуга. Тренировка. Ограничения: обязательно для заполнения; существующая в системе тренировка. Указать id.

Цена тренировки. Стоимость приобретённой тренировки на момент покупки.

Количество. Количество приобретаемых тренировок. Ограничения: целое число; обязательно для заполнения; минимальное значение 1, максимальное 50.

Сумма заказа. Стоимость заказа. Рассчитывается по формуле: количество * цена тренировки.

Способ оплаты. Вариант оплаты заказа. Ограничения: обязательно для заполнения; один из вариантов: visa, mir, umoney.

Дата создания заказа. Дата и время создания заказа.

Начальное наполнение базы

### Сценарии

#### Общие требования к сценариям
1. **Общие требования**

1.1. Данные, полученные от клиента, всегда проверяются перед использованием (валидируются).

1.2. В случае обнаружения ошибок, клиенту отправляется соответствующий код ответа (400) и список ошибок валидации.

1.3. Изображения, а также файлы, полученные от клиента могут храниться как в файловой системе, так и в базе данных.

1.4. Не допускается хранение пароля пользователя в открытом виде. В базе данных хранится хэш пароля. Для получения хэш-пароля применяется пакет bcrypt.

1.5. Сервис никогда не возвращает конфиденциальных данных. Например, пароли.

1.6. Для описания контрактов применяются DTO/RDO объекты.

1.7. Для передачи данных, необходимых для работы приложения используются переменные окружения. Значения из переменных окружения проходят обязательную валидацию.

Некорректные данные или нехватка обязательных данных приводят к остановке приложения и выводу информации об ошибках.

1.8. В коде приложения не должно быть «зашито» конфиденциальных данных (пароли, секреты и так далее).

1.9. Для каждого ресурса предусмотрен файл [service_name].http (хранится в директории со всеми файлами ресурса). В нём приведены заготовки запросов для проверки работоспособности ресурса.

1.10. Специфичные уникальные идентификаторы, которые передаёт клиент (например, идентификатор документа MongoDB) проходят предварительную валидацию. Нужно убедиться, что идентификатор предоставлен корректным значением.

1.11. Ресурсы, возвращающие коллекции (списки), по умолчанию ограничивают возвращаемые данные. Ресурс не возвращает больше 50 элементов коллекции. Клиент может уменьшить это количество, передав дополнительный параметр. Увеличить нельзя.

1.12. Ресурсы, возвращающие коллекции (списки) поддерживают параметры и логику, позволяющие организовать постраничную навигацию (пагинация). Кейс: получить очередные 50 записей.

1.13. Ресурсы, возвращающие коллекции (списки) поддерживают сортировку. По умолчанию используется сортировка по убыванию (дата создания элемента). Клиент может изменить направление сортировки.

1.14. Фильтрация и сортировка происходит на стороне сервера.

1. ** Реализованы сценарии раздела Пользователь **

Регистрация пользователя

- Регистрация доступна только анонимным клиентам.
- Авторизованный пользователь при попытке пройти регистрацию получает соответствующий код ответа.
- Для регистрации клиент передаёт набор информации, перечисленный в разделе «Предметная область» -> «Пользователь». Для полей, данные для которых рассчитываются автоматически, клиент информацию не передаёт (дата).
- В случае успешной регистрации нового пользователя, сервис возвращает соответствующий код ответа и объект с созданным пользователем.

Вход в систему

- Для ограничение доступа пользователей используются JWT (JSON WebTokens).
- Войти в систему могут только анонимные клиенты. Если авторизованный клиент входит в систему, сервер возвращает соответствующий код и текущий токен. Новая пара токенов не создаётся.
- Для процедуры аутентификации и авторизации клиент передаёт электронную почту и пароль.
- В сервисе реализована поддержка Access Token и Refresh Token.
- Время жизни Access Token — 15 минут. Время жизни Refresh Token: 7 дней. Время жизни токенов может быть переназначено через переменные окружения.
- Для формирования Access Token и Refresh Token используются разные секреты. Секреты передаются через переменные окружения.
- Сервис предусматривает сценарий отзыва Refresh Token.
- После прохождения авторизации, клиент передаёт Access Token в заголовке Authorization. Используется Bearer.

2. ** Реализованы сценарии раздела Личный кабинет **

** Личный кабинет пользователя **

Баланс пользователя

- Баланс могут запрашивать только авторизованные «Пользователь»
- Сервис предоставляет отдельный ресурс для получения общего баланса: суммарное количество доступных тренировок.
- Сервис предоставляет ресурс для обновления баланса тренировок (поступление тренировок, списание тренировок).

Редактирование информации о пользователе

- Авторизованный клиент может обновить профиль своего пользователя в приложении.
- Авторизованный клиент может обновлять только профиль своего пользователя. Редактирование информации произвольного пользователя не допускается.
- Клиент может обновить значения любых полей за исключением: электронная почта, пароль.
- Частичное обновление допускается. Например, чтобы обновить имя пользователя, авторизованный клиент может передать только имя, а не полную информацию о пользователе.

3. ** Реализованы сценарии раздела Отзывы **
** Отзывы **

Создание отзыва к тренировке

- Отзывы к тренировке могут создавать только авторизованные клиенты с ролью «Пользователь».
- Для создания нового отзыва клиент передаёт набор информации, перечисленный в разделе «Предметная область» -> «Отзыв». Дата проставляется автоматически.

Тренировка указывается по её id

В случае успешного создания отзыва, сервис возвращает объект созданного отзыва.

Редактирование и удаление отзывов не предусмотрено.

После добавления отзыва выполняется пересчёт рейтинга тренировки. Рейтинг тренировки рассчитывается по-среднему значению всех отзывов.

Список отзывов к тренировке

Сервис предоставляет ресурс для получения списка отзывов для определённой тренировки по id.

Запросить список отзывов к тренировкам может только авторизованный пользователь.

Каждый отзыв представлен набором информации, перечисленный в описании сущности «Отзыв».

4. ** Реализованы сценарии раздела Тренировка **

** Тренировка **

Создайте ресурс со списком тренировок в системе.

Тренировки отсортированы от более подходящих к менее подходящим для пользователя

В списке тренировок предусмотрена пагинация

Детальная информация о тренировке

Детальную информацию о тренировке могут запросить только авторизованные клиенты. Для получения детальной информации клиент передаёт уникальный идентификатор тренировки.

Детальная информация о тренировке содержит всю информацию, представленную в описании сущности «Тренировка».

5. ** Реализовать сценарии раздела покупка (заказ) **

** Покупка (заказ) **

Создайте ресурс для заказа (покупки) тренировки

Ресурс доступен только авторизованным пользователям. В ресурс передаются все поля сущности заказ, дата проставляется автоматически.

Создайте ресурс со списком всех покупок пользователя.

Создайте ресурс для получения текущего баланса тренировок.

Создайте ресурс для списания тренировок.

### Сценарии дополнительного задания

1. ** Условия начального опроса **

Опрос

Начальный опрос служит для настройки начальных предпочтений пользователя. Настройка предпочтений используется для заполнения данных в ЛК пользователя и подбора тренировок на главной странице приложения.

- Создайте ресурс для сохранения результата опроса при регистрации пользователя.
- Создайте ресурс для получения результатов опроса.

Если вы не релизуете опросник, то данные должны быть зафиксированы в таком виде:

- калории для женщин 2300,
- калории для мужчины 3300,
- специализации выбраны все по умолчанию,
- уровень средний для всех пользователей,
- указанные данные редактировать нельзя.

Можно редактировать только данные о себе, локацию, пол и аватар — те из данных, что пользователь указывает на момент регистрации без опросника.

### Документация

В ** description.md ** проекта указана вся необходимая информация для запуска проекта. Описано предназначение всех сценариев, которые используются для разработки/запуска проекта.

API задокументирован в формате `OpenAPI`. Это может быть отдельный файл specification.yml, расположенный в корневой директории проекта, либо отдельный маршрут по которому будет сформирована спецификация. При использовании второго варианта, маршрут для получения спецификации указывается в файле description.md.

Фронтенд
Общие требования:
Вёрстка для всех состояний страниц предоставляется.

Адреса страниц остаются на усмотрение разработчика.

На страницах, где пользователь вводит информацию предусмотрена проверка введённых данных на клиенте перед отправкой. Незаполненные поля или ввод некорректных данных сопровождается выводом ошибок в соответствующие элементы (рядом с полями ввода). В эти же элементы выводятся ошибки валидации бэкенда.

Дополнительные базовые проверки реализуются на клиенте с помощью API браузера (например, проверка валидного email и так далее).

Все внутренние страницы доступны только авторизованным пользователям. Неавторизованный пользователь отправляется на разводящую страницу.

Для реализации слайдера допускается использовать любую свободную библиотеку, например, swiper.js.

Для подключения карт используются любая библиотека с открытым API (Leaflet, Яндекс, допускается использование готовых react-компонентов

Во время длительных операций (например, отправка запроса на сервер) отображается прелоадер. Дизайн прелоадера остаётся на усмотрение разработчика.

Тестовое видео для проверки загрузки на отдельных страницах доступно в материалах задания.

В интерфейсе предусмотрены попапы. Любой попап можно закрыть с клавиатуры (Escape) и с помощью соответствующего элемента управления в самом попапе (крестик).

Описание работы отдельных страниц
Разводящая
На странице расположены два элемента: кнопка регистрация и ссылка вход. Клик по кнопке регистрация перенаправляет на страницу «Регистрация». Переход по ссылке вход перенаправляет пользователя на страницу «Вход».

Страница доступна только анонимным клиентам. Авторизованного пользоваетля перенаправляем на главную.

Вход
Страница доступна анонимным клиентам. Авторизованный пользователь: — с ролью «Пользователь» перенаправляется на «Главную страницу»;
Ошибки валидации отображаются возле поля ввода в соответствующих элементах. Например, если не заполнено обязательно поле отображается текст «Обязательное поле». Также отображаются ошибки, которые возвращает бэкенд. Например, «Пользователь с таким email не существует». Текст ошибок остаётся на усмотрение разработчика.
Клик по кнопке Продолжить отправляет введённые данные на сервер. В случае успешной аутентификации и авторизации пользователь: — с ролью «Пользователь» перенаправляется на «Главную страницу»;
Регистрация
Страница доступна анонимным клиентам.

Авторизованный пользователь:

«Пользователь» перенаправляется на «Главную страницу»;
Все поля обязательны для заполнения.
После заполнения данных пользователь нажимает кнопку Продолжить. В случае успешной регистрации пользователь перенаправляется на страницу «Опросник» в случае реализации доп задания, в другом случае пользователь попадает на главную страницу приложения.
Опросник «Пользователь»
Страница доступна только авторизованным пользователям.

Все поля обязательны для заполнения;

Введённые пользователем данные отправляются по нажатию на кнопку Продолжить. В случае успешного выполнения операции, пользователь перенаправляется на «Главную страницу».

Главная
Страница доступа только авторизованным пользователям.

Страница состоит из нескольких блоков: «Специально подобраны для вас», «Специальные предложения», «Популярные тренировки» и «Ищут компанию для тренировки».

Блок «Специально подобраны для вас» — слайдер с кнопками управления содержит карточки тренировок, подходящие по параметрам для конкретного пользователя (параметры пользователь задаёт в опроснике). Кнопка Подробнее ведёт на страницу «Карточки тренировки». Сортировка карточек в слайдере осуществляется на бэкенде. Элементы в слайдере отрисовываются от наиболее подходящих по параметрам к менее подходящим. Слайдер содержит не более 9 карточек.

Блок «Специальные предложения» — слайдер состоящий из 3 карточек тренировок на которые была сделана скидка. Скидка изменяет признак «Специальное предложение» для тренировки. Отбор тренировок со скидками производится на клиенте.

Блок «Популярные тренировки» — слайдер с кнопками управления состоит из карточек тренировок с наивысшим рейтингом. Кнопка Смотреть все ведёт на страницу «Каталога тренировок». Отбор тренировок с рейтингом происходит на клиенте.

В случае отсутствия контента для любого из блоков, отображается текст-заглушка: «Скоро здесь появится что-то полезное».

указать что специально для вас тренировка, а не группа по типу

Раздел специально для вас показывает информацию о тренировках. В том числе купленные рекоммендованные пользователю под его параметры.

В спец предложения и популярных могут отображаться тренировки даже не походящие под профиль пользователя.

Личный кабинет пользователя
Страница доступна только авторизованному пользователю.

В блоке «Обо мне» выводится информация, указанная при регистрации и заполнении опросника. Поля доступны для редактирования.

Клик на кнопку Редактировать активируют поля с информацией о себе (имя, описание, специализация, локация, пол, уровень). Кнопка Редактировать изменяет заголовок на Сохранить. Добавляются кнопки для удаления и загрузки фотографии аватара.

Статус готов к тренировкам можно переключать в зависимости от желания пользователя

Клик на кнопку Сохранить возвращает форму к первоначальному виду.

На страницы представлен блок для перехода на страницы «Мои покупки»

Блок «План по калориям». Для каждого пользователя отображается план по калориям в день (значение указано при регистрации) и на неделю — высчитывается автоматически. Расчёт происходит на основании значения «план на день», указанное при регистрации.

Мои покупки
Страница доступна авторизованному пользователю.

На страницы отображаются список приобретённых тренировок.

На странице доступен флаг-фильтр «Только активные». При выборе фильтра список карточек обновляется.

Активная тренировка. Приобретённая тренировка к которой пользователь ещё не приступил или если он купил несколько одинаковых тренировок, но ещё не израсходовал их все.

Попап для покупки тренировки
Попап решает задачу покупки тренировки.

Пользователь может приобрести любое количество тренировок.

Ввод количества тренировок приводит к пересчёту итоговой суммы. Пользователь может вводить с клавиатуры количество тренировок, либо использовать элементы управления +/-.

Покупка завершается нажатием на кнопку Купить. В случае успешного выполнения операции, информация о купленных тренировках зачисляется на баланс пользователя.

По умолчанию способ оплаты не выбран, пока пользователь не выберет способ оплаты, кнопка купить будет недоступна.

Каталог тренировок
На странице отображается каталог тренировок и блок фильтров.

По умолчанию карточки тренировок отсортированы по дате создания: сверху новые.

Клик по кнопке Подробнее перенаправляет на страницу карточки тренировки.

Кнопка Назад возвращает на «Главную страницу».

Блок «Фильтры»
В блоке Фильтры происходит и фильтрация (отбор карточек), и сортировка (изменения порядка карточек) данных.

Фильтрация происходит после выбора пользователем нужного параметра. При открытии страниц, фильтры по умолчанию не проставлены. Выбор любого из фильтров приводит к обновлению списка товаров с учётом выбранного фильтра.

Фильтрация по цене.

При загрузке страницы в плейсхолдеры проставляется минимальная и максимальная цена из полного списка тренировок, то есть при старте отображается только первая страница 6 карточек, но в фильтрах указан предел цены для всех данных приложения.

Вводить данные в плейсхолдер можно как с клавиатуры, так и с помощью ползунка. В поля от и до нельзя ввести значение меньше 0. В поле минимум нельзя ввести больше чем в поле максимум и в поле максимум нельзя ввести цену меньше чем в поле минимум.

Калории.

При загрузке страницы в плейсхолдеры проставляется минимальное и максимальное количество калорий из полного списка тренировок.

В поля от и до нельзя ввести значение меньше 0, так же нельзя ввести значение 0. Вводить данные в плейсхолдер можно как с клавиатуры так и используя ползунок.

Рейтинг.

Всегда целочисленные значения от 0 до 5 включительно, выбрать значения можно с помощью бегунков.

— При старте должны быть выбраны все чек-боксы. Должен быть выбран хотя бы один чек-бокс. Единственный оставшийся чек-бокс блокируется в выбранном состоянии.

— Кнопки дешевле, дороже — управляют сортировкой. При старте ни одна не выбрана.

— Кнопка бесплатно — фильтрует список.

— Если под фильтры не подходит ни одна тренировка, то необходимо показать карточку: здесь скоро появится что-то полезное.

Карточка тренировки
Страница доступна только авторизованным пользователям.

На странице отображаются блоки: «Информация о тренировке», «Видео», «Отзывы о тренировке».

Только авторизованный пользователь, который приобретал тренировку и завершил её может оставить отзыв. Для этого предусмотрена кнопка Оставить отзыв. Кнопка отображается только для авторизованного пользователя, купившего эту тренировку.

Нажатие на кнопку Оставить отзыв открывает попап «Оставить отзыв». В попапе пользователь выбирает оценку от 1 до 5 и пишет текст отзыва. По умолчанию оценка не проставлена.

После успешной отправки отзыва, отзыв пользователя добавляется в блок «Отзывы о тренировке» первым в списке.

Рейтинг тренировки. Рассчитывается автоматически на основании оценок пользователей. По умолчанию значение 0.

Если пользователь не купил тренировку, в блоке «Видео» запись тренировки недоступна для воспроизведения (неактивна кнопка для начала воспроизведения), кнопка Приступить неактивна.

Для приобретения тренировки пользователь нажимает кнопку Купить. Нажатие на кнопку приводит к появлению попапа для оформления покупки тренировки.

После покупки тренировки, кнопка Купить становится неактивной. В блоке «Видео» кнопка Приступить становится активной.

При клике на кнопку Приступить, активной в блоке видео становится кнопка Play, заголовок Приступить изменяется на Закончить. С баланса тренировок пользователя списывается тренировка.

После окончания тренировки (если на балансе пользователя нет купленных тренировок), заголовок кнопки Закончить изменяется на Приступить и она становится неактивной. Также не активной становится кнопка Play. Кнопка Купить становится вновь активной.

Если пользователь приобрёл несколько тренировок, он может повторить тренировку несколько раз. При каждом повторении, с баланса списывается тренировка. Под окончанием тренировки подразумевается нажатие на кнопку Завершить.

Если пользователь не завершил текущую тренировку, то при запуске новой, текущая завершается и списывается с баланса пользователя.

Общие элементы / виджеты
Шапка
Иконка «Дом». Клик на иконку возвращает пользователя на главную страницу.
Иконка «Личный кабинет». Клик по кнопке переводит пользователя на страницу «Личный кабинет».
Функции поиска реализовывать не нужно.
Кнопка «Показать ещё»
Для всех списков доступна кнопка показать ещё. Кнопка отображается если карточек в рамках списка больше, чем отображается в рамках одной страницы. По умолчанию отображается не больше 6 карточек (если иное не оговоренно в задании). Нажатие на кнопку приводит к загрузке очередных 6 карточек или оставшихся, если их меньше. При нажатии на кнопку отправляется запрос к серверу.

При загрузке последней карточки списка кнопка показать ещё меняет вид на кнопку вернуться в начало. При нажатии на кнопку вернуться в начало страница плавно прокручивается к первым карточкам.

Слайдеры
Движение в слайдере плавное, по одному объекту при каждом клике. Когда пользователь доходит до последнего элемента слайдера, кнопка вперёд становится недоступной, активна кнопка назад.

Попап
На время взаимодействия с элементами попапа, страница блокируется. Элементы страница не доступны для взаимодействия. Фокусы с клавиатуры на модальном окне должны быть зациклены на кликабельных элементах модального окна. Скролл страницы за модальным окном должен быть запрещён.

Подготовка docker-образа
Вам предстоит соединить бэкенд и фронтенд. Убедиться, что приложение работает в целом. Также вам потребуется подготовить автоматизированные тесты для фронтенда. Последний шаг: подготовить приложение к деплою и запуску на сервере. Для этого вам потребуется подготовить Docker-образ для вашего приложения и все необходимые compose-файлы. Подготовить файл *how-to-run.md* в корне проекта и написать инструкцию по запуску приложения.

Задача
Покрыть компоненты приложения (фронтенд) тестами;

Подготовить docker-compose для запуска приложения в Docker-контейнере;

Опционально. Готовый образ приложения можно загрузить в Github Container Registry;

Дополнительные задания
Если вы работали с архитектурой монолит и у вас осталось время до дедлайна сдачи, попробуйте провести рефакторинг вашего кода и перевести проект на микросервисы.
