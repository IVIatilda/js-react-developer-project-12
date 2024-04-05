const ru = {
    translation: {
        placeholders: {
            username: "Имя пользователя",
            nickname: "Ваш ник",
            password: "Пароль",
            repeatPassword: "Подтвердите пароль",
            body: "Сообщение",
            enterMessage: "Введите сообщение...",
            newMessage: "Новое сообщение",
        },
        headers: {
            login: "Войти",
            register: "Регистрация",
        },
        buttons: {
            login: "Войти",
            logout: "Выйти",
            register: "Зарегистрироваться",
            cancel: "Отменить",
            send: "Отправить",
            delete: "Удалить",
            rename: "Переименовать",
        },
        errors: {
            required: "Обязательное поле",
            username: "От 3 до 20 символов",
            password: "Не менее 6 символов",
            repeatPassword: "Пароли должны совпадать",
            userIsset: "Такой пользователь уже существует",
            serverError: "Произошла ошибка на сервере",
            wrongUsernameOrPassword: "Неверные имя пользователя или пароль",
            channelNameLength: "От 3 до 20 символов",
            channelNameUnique: "Должно быть уникальным",
        },
        texts: {
            noAccount: "Нет аккаунта?",
            sure: "Уверены?",
            message: {
                count_one: "{{count}} сообщение",
                count_few: "{{count}} сообщения",
                count_many: "{{count}} сообщений",
            },
        },
        channels: {
            channels: "Каналы",
            channelName: "Имя канала",
            addChannel: "Добавить канал",
            renameChannel: "Переименовать канал",
            deleteChannel: "Удалить канал",
            created: "Канал создан",
            edited: "Канал переименован",
            deleted: "Канал удалён",
            settings: "Управление каналом",
        },
    },
};

export default ru;
