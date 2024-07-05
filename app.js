const tg = window.Telegram.WebApp
let user_name = ''

try {
    user_name = tg.initDataUnsafe.user.username
    console.log(user_name)
} catch (e) {
    // console.log(e)
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
        document.querySelector('.btn-back').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('first_menu').style.display = 'block'
        })
        // отправка данных в бэк
        let url_for_post_element = document.getElementById('url-for-post');
        let url_for_post = url_for_post_element.getAttribute('data-url-for-post');
        try {
            let chat_id = tg.initDataUnsafe.user.id;
            console.log(chat_id)
        } catch (e) {
            document.getElementById('body').innerHTML = ''
        }

        let name = tg.initDataUnsafe.user.first_name;
        console.log(name)
        let data = {
            chat_id: chat_id,
            name: name
        };
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


