## Русский язык

# Кинопоиск - Бэкенд часть
Репозиторий содержит код бэкенд части веб-приложения разработанного для любителей кино и позволяющее находить информацию о различных фильмах, сохранять их себе на аккаунт, а также смотреть трейлеры.

# Описание
Этот репозиторий содержит код бэкенда для веб-сайта, построенного с использованием Node.js, MongoDB и Express.js. Бэкенд предоставляет необходимые API и функциональность для взаимодействия с базой данных и обработки различных операций, необходимых для работы сайта. Он реализует такие функции, как регистрация, вход, редактирование профиля и управление сохраненными фильмами.

## Демонстрация
Ознакомьтесь с [демонстрационной версией](https://kinomovies.nomoreparties.sbs) проекта, чтобы увидеть его в действии.

## Фронтенд
Ознакомьтесь с [frontend of this project](https://github.com/RomanKrasinskiy/movies-explorer-frontend.git) созданным с использованием **React.js**.

## Особенности
* Безопасные HTTP-only Cookies: Бэкенд использует безопасные HTTP-only cookies с поддержкой только HTTP для управления сеансами и аутентификации, обеспечивая безопасное хранение и передачу пользовательских данных.
* Обработка ошибок: Код включает надежные механизмы обработки ошибок для управления различными типами ошибок, которые могут возникнуть во время выполнения приложения.
* Winston: Бэкенд использует Winston, универсальную библиотеку журналирования для Node.js, для записи журналов. Это помогает отслеживать и устранять проблемы в работе приложения.
* Joi: Проверка данных выполняется с использованием Joi, мощного языка описания схемы и проверки данных для JavaScript. Он гарантирует, что данные, получаемые бэкендом, соответствуют указанным правилам.
* Аутентификация и авторизация пользователей: Реализована система аутентификации с использованием JSON Web Tokens (JWT). Это позволяет пользователям безопасно регистрироваться, входить в систему и получать доступ к защищенным ресурсам в зависимости от их ролей и прав.
* Шифрование паролей: Обеспечена дополнительная безопасность путем шифрования паролей пользователей с использованием хэш-алгоритма, такого как bcrypt. Это гарантирует, что чувствительная информация о пользователе не хранится в открытом виде и помогает защитить от несанкционированного доступа.
* Ограничение частоты запросов: Бэкенд защищен от злоупотреблений или вредоносной активности путем внедрения механизмов ограничения частоты запросов. Это помогает предотвратить чрезмерные запросы от одного клиента или IP-адреса, обеспечивая справедливое использование и защиту ресурсов сервера.

## Установка
Клонируйте репозиторий: 

```
git clone https://github.com/RomanKrasinskiy/movies-explorer-api.git
```
Установите зависимости: 
```
npm install
```
Запустите проект:
```
npm start
```
Сервер должен быть запущен на http://localhost:3000 и готов обработке с API-запросами.


## English

# Movies Explorer - Backend
This repository contains the backend code for the project Movies Explorer. The project is a web application developed using React.

# Description
This repository contains the backend code for a website built using Node.js, MongoDB, and Express.js. The backend provides the necessary APIs and functionality to interact with the database and handle various operations required by the website. It implements features such as registration, login, profile editing, and managing saved movies.

## Live Demo
Check out the [live demo](https://api.kinomovies.nomoredomains.monster/) of the project to see it in action.

## Frontend
Check out the [frontend of this project](https://github.com/RomanKrasinskiy/movies-explorer-frontend.git) made with **React.js**.

## Features
* Secure HTTP-only Cookies: The backend uses secure HTTP-only cookies for session management and authentication, ensuring that user data is securely stored and transmitted.
* Error Handling: The code includes robust error handling mechanisms to handle and manage various types of errors that may occur during the execution of the application.
* Winston: The backend utilizes Winston, a versatile logging library for Node.js, to write logs. This helps in monitoring and troubleshooting the application's behavior.
* Joi: Data validation is performed using Joi, a powerful schema description language and data validator for JavaScript. It ensures that the data received by the backend conforms to the specified rules.
* User Authentication and Authorization: Implemented an authentication system using JSON Web Tokens (JWT). This allows users to securely register, log in, and access protected resources based on their roles and permissions.
* Password Encryption: Enhanced security by encrypting user passwords using a hashing algorithm like bcrypt. This ensures that sensitive user information is not stored in plain text and helps protect against unauthorized access.
* Rate Limiting: The backend is protected from abuse or malicious activities by implementing rate limiting mechanisms. These help prevent excessive requests from a single client or IP address, ensuring fair usage and protecting server resources.

## Installation
Clone the repository: 

```
git clone https://github.com/RomanKrasinskiy/movies-explorer-api.git
```
Install dependencies: 
```
npm install
```
Run the project: 
```
npm start
```
The server should now be running on http://localhost:3000, ready to handle API requests.
