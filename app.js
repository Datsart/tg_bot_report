document.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById('second_menu').style.display = 'none'
    let buttons_first_menu = document.querySelectorAll('#first_menu .btn')
    buttons_first_menu.forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'block'
            document.getElementById('first_menu').style.display = 'none'


        })
    })
    // получаем id пользователя - это и есть chat_id
    let tg = window.Telegram.WebApp
    document.getElementById('info').innerText = tg.initDataUnsafe.user.id

    // отправка данных в бэк
    let url_for_post_element = document.getElementById('url-for-post');
    let url_for_post = url_for_post_element.getAttribute('data-url-for-post');
    console.log(url_for_post)
    let data = tg.initDataUnsafe.user.id
    document.querySelector('body').addEventListener('click', function () {
        fetch(url_for_post, {
        "method": "POST",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(data),
    })
        .then(response => {
            return response.json();
        });
    })

})
