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

        const btn_projects_array = [];
        btn_projects_array.push(document.getElementById('project_a'));
        btn_projects_array.push(document.getElementById('project_b'));
        btn_projects_array.push(document.getElementById('project_c'));

        const selectAllButton = document.getElementById('select_all');

        // Функция для переключения класса "selected"
        const toggleSelection = (button) => {
            button.classList.toggle('selected');
        };

        // Добавляем обработчик события для каждой кнопки проекта
        btn_projects_array.forEach(button => {
            button.addEventListener('click', () => {
                toggleSelection(button);
            });
        });

        // Добавляем обработчик события для кнопки "Выбрать все"
        selectAllButton.addEventListener('click', () => {
            const allSelected = btn_projects_array.every(button => button.classList.contains('selected'));

            btn_projects_array.forEach(button => {
                if (allSelected) {
                    button.classList.remove('selected');
                } else {
                    button.classList.add('selected');
                }
            });
        });

        // отправка данных в бэк
        let url_for_post_element = document.getElementById('url-for-post');
        let url_for_post = url_for_post_element.getAttribute('data-url-for-post');
        let chat_id;
        try {
            chat_id = tg.initDataUnsafe.user.id;
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


