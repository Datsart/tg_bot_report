const tg = window.Telegram.WebApp
let user_name = ''

// проверка на валидность юзера

// try {
//     user_name = tg.initDataUnsafe.user.username
//     console.log(user_name)
// } catch (e) {
//     // console.log(e)
// }

// списки юзеров
let list_users_element = document.getElementById('list-users');
let list_users = list_users_element.getAttribute('data-list-users');
// если юзер в списке из бэка то пускаем дальше
if (list_users.includes(user_name)) {
    document.addEventListener('DOMContentLoaded', function (event) {
        // для хранения всех данных с фронта
        const all_data = {}
        // скрыты все менюхи кроме первой
        document.getElementById('second_menu').style.display = 'none'
        document.getElementById('third_menu').style.display = 'none'
        document.getElementById('four_menu').style.display = 'none'
        document.getElementById('five_menu').style.display = 'none'

        // при нажатии любой из кнопок первой меню идем во 2ую меню
        let buttons_first_menu = document.querySelectorAll('#first_menu .btn')
        buttons_first_menu.forEach(function (button) {
            button.addEventListener('click', function () {
                document.getElementById('second_menu').style.display = 'block'
                document.getElementById('first_menu').style.display = 'none'
                document.getElementById('third_menu').style.display = 'none'
                document.getElementById('four_menu').style.display = 'none'
                document.getElementById('five_menu').style.display = 'none'
                // что нажали то и добавилось
                if (button.id === 'dts') {
                    all_data['report'] = 'dts'
                } else {
                    all_data['report'] = 'grafic'
                }
            })
        })
        // обрабатываем кнопки 2го меню
        const buttons_second_menu = document.querySelectorAll('#second_menu .btn');
        let counter = 0;
        const projects_arr = []
        buttons_second_menu.forEach(function (button) {
            if (counter < 3) {

                button.addEventListener('click', function () {
                    if (!projects_arr.includes(button.id)) {
                        projects_arr.push(button.id);
                    } else {
                        let index = projects_arr.indexOf(button.id);
                        if (index !== -1) {
                            projects_arr.splice(index, 1);
                        }
                    }

                    all_data['projects'] = projects_arr
                    console.log(all_data)
                })
                counter++;
            }

        });
        // обрабатываем нажать на ВЫБРАТЬ ВСЕ во 2ом меню
        document.getElementById('select_all_second').addEventListener('click', function () {
            let counter = 0;
            buttons_second_menu.forEach(function (button) {
                if (counter < 3) {
                    if (!projects_arr.includes(button.id)) {
                        button.click()
                    }
                }
                counter++

            })
            all_data['projects'] = projects_arr
            console.log(all_data)
        })


        // при нажатии любой из кнопок 4ой меню идем в 5ую меню
        const buttons_four_menu_array = []
        buttons_four_menu_array.push(document.getElementById('all_statisctic'))
        buttons_four_menu_array.push(document.getElementById('liter_statistic'))
        buttons_four_menu_array.forEach(function (button) {
            button.addEventListener('click', function () {
                document.getElementById('second_menu').style.display = 'none'
                document.getElementById('first_menu').style.display = 'none'
                document.getElementById('third_menu').style.display = 'none'
                document.getElementById('four_menu').style.display = 'none'
                document.getElementById('five_menu').style.display = 'block'
            })
        })

        // при нажатии назад 2ой меню
        document.getElementById('back_second').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('third_menu').style.display = 'none'
            document.getElementById('first_menu').style.display = 'block'
            document.getElementById('four_menu').style.display = 'none'
            document.getElementById('five_menu').style.display = 'none'
        })
        // при нажатии вперед 2ой меню
        document.getElementById('next_second').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('third_menu').style.display = 'block'
            document.getElementById('first_menu').style.display = 'none'
            document.getElementById('four_menu').style.display = 'none'
            document.getElementById('five_menu').style.display = 'none'
        })
        // при нажатии назад 3ей меню
        document.getElementById('back_third').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'block'
            document.getElementById('third_menu').style.display = 'none'
            document.getElementById('first_menu').style.display = 'none'
            document.getElementById('four_menu').style.display = 'none'
            document.getElementById('five_menu').style.display = 'none'
        })
        // при нажатии вперед 3ей меню
        document.getElementById('next_third').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('third_menu').style.display = 'none'
            document.getElementById('first_menu').style.display = 'none'
            document.getElementById('four_menu').style.display = 'block'
            document.getElementById('five_menu').style.display = 'none'
        })
        // при нажатии назад 4ой меню
        document.getElementById('back_four').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('third_menu').style.display = 'block'
            document.getElementById('first_menu').style.display = 'none'
            document.getElementById('four_menu').style.display = 'none'
            document.getElementById('five_menu').style.display = 'none'
        })

        // при нажатии назад 5ой меню
        document.getElementById('back_five').addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'none'
            document.getElementById('third_menu').style.display = 'none'
            document.getElementById('first_menu').style.display = 'none'
            document.getElementById('four_menu').style.display = 'block'
            document.getElementById('five_menu').style.display = 'none'
        })

        // чекбокс проектов 2ой меню
        const btn_projects_array = [];
        btn_projects_array.push(document.getElementById('project_a'));
        btn_projects_array.push(document.getElementById('project_b'));
        btn_projects_array.push(document.getElementById('project_c'));

        const selectAllButton = document.getElementById('select_all_second');

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
        // чекбокс для 3ей меню
        const btn_aparts_array = [];
        btn_aparts_array.push(document.getElementById('studio'));
        btn_aparts_array.push(document.getElementById('1k_apart'));
        btn_aparts_array.push(document.getElementById('2k_apart'));
        btn_aparts_array.push(document.getElementById('3k_apart'));
        const selectAllButton_third = document.getElementById('select_all_third');

        // Функция для переключения класса "selected"

        // Добавляем обработчик события для каждой кнопки проекта
        btn_aparts_array.forEach(button => {
            button.addEventListener('click', () => {
                toggleSelection(button);
            });
        });

        // Добавляем обработчик события для кнопки "Выбрать все"
        selectAllButton_third.addEventListener('click', () => {
            const allSelected = btn_aparts_array.every(button => button.classList.contains('selected'));

            btn_aparts_array.forEach(button => {
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
        // try {
        //     chat_id = tg.initDataUnsafe.user.id;
        //     console.log(chat_id)
        // } catch (e) {
        //     document.getElementById('body').innerHTML = ''
        // }
        // отдаем имя юзера и чат айди
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


