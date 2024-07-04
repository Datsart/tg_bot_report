document.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById('second_menu').style.display = 'none';
    let buttons_first_menu = document.querySelectorAll('#first_menu .btn');
    buttons_first_menu.forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'block';
            document.getElementById('first_menu').style.display = 'none';
        });
    });

    // Получаем id пользователя - это и есть chat_id
    let tg = window.Telegram.WebApp;
    let userId = tg.initDataUnsafe.user.id;
    document.getElementById('info').innerText = userId;

    // Проверка значений в консоли
    console.log("User ID: ", userId);

    // Отправка данных в бэк при клике на тело документа
    let url_for_post = "http://random-subdomain.ngrok.io/post_response"; // Замените на ваш ngrok URL
    let data = { id: userId }; // Помещаем id в объект

    document.querySelector('body').addEventListener('click', function () {
        fetch(url_for_post, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
