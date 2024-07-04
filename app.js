const tg = window.Telegram.WebApp
let user_name = ''

try {
    user_name = tg.initDataUnsafe.user.username
} catch (e) {
    console.log(e)
}


let list_users_element = document.getElementById('list-users');
let list_users = list_users_element.getAttribute('data-list-users');

if (list_users.includes(user_name)) {
    document.addEventListener('DOMContentLoaded', function (event) {

        document.getElementById('second_menu').style.display = 'none'
        let buttons_first_menu = document.querySelectorAll('#first_menu .btn')
        buttons_first_menu.forEach(function (button) {
            button.addEventListener('click', function () {
                document.getElementById('second_menu').style.display = 'block'
                document.getElementById('first_menu').style.display = 'none'
            })
        })
        document.getElementById('btn8').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('first_menu').style.display = 'block'
        })
        // получаем id пользователя - это и есть chat_id
        // const tg = window.Telegram.WebApp
        // let a = tg.initDataUnsafe.user.username
        // document.getElementById('info').innerText = a

        // document.getElementById('info2').innerText = tg.initDataUnsafe.user.name
        // console.log(a)
        // отправка данных в бэк
        let url_for_post_element = document.getElementById('url-for-post');
        let url_for_post = url_for_post_element.getAttribute('data-url-for-post');
        console.log(url_for_post)
        let data = tg.initDataUnsafe.user.id
        fetch(url_for_post, {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data),
        })
            .then(response => {
                return response.json();
            });


    })

} else {
    document.getElementById('body').innerHTML = ''
}


