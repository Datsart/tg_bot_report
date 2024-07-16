const tg = window.Telegram.WebApp
let user_name = ''

// проверка на валидность юзера

try {
    user_name = tg.initDataUnsafe.user.username
    console.log(user_name)
} catch (e) {
    console.log(e)
}

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
        let projects_arr = []
        buttons_second_menu.forEach(function (button) {
            if (counter < 3) {

                button.addEventListener('click', function () {
                    button.style.backgroundColor = '#65bd53'
                    if (!projects_arr.includes(button.id)) {
                        projects_arr.push(button.id);
                    } else {
                        button.style.backgroundColor = '#FF008AFF'
                        let index = projects_arr.indexOf(button.id);
                        if (index !== -1) {
                            projects_arr.splice(index, 1);
                        }
                    }
                    all_data['projects'] = projects_arr
                    // console.log(all_data)
                })
                counter++;
            }
        });
        // обрабатываем нажать на ВЫБРАТЬ ВСЕ во 2ом меню
        document.getElementById('select_all_second').addEventListener('click', function () {
            let counter = 0;
            if (projects_arr.length === 3) {
                projects_arr = []
                let counter = 0
                buttons_second_menu.forEach(function (button) {
                    if (counter < 3) {
                        button.style.backgroundColor = '#FF008AFF'
                    }
                    counter++
                })
            } else {
                buttons_second_menu.forEach(function (button) {
                    if (counter < 3) {
                        if (!projects_arr.includes(button.id)) {
                            button.click()
                        }
                    }
                    counter++
                })
            }
            all_data['projects'] = projects_arr
            // console.log(all_data)
        })
        // обрабатываем кнопки 3го меню
        const buttons_third_menu = document.querySelectorAll('#third_menu .btn');
        let counter_2 = 0;
        let aparts_arr = []
        buttons_third_menu.forEach(function (button) {
            if (counter_2 < 4) {
                button.addEventListener('click', function () {
                    button.style.backgroundColor = '#65bd53'
                    if (!aparts_arr.includes(button.id)) {
                        aparts_arr.push(button.id);
                    } else {
                        button.style.backgroundColor = '#FF008AFF'
                        let index = aparts_arr.indexOf(button.id);
                        if (index !== -1) {
                            aparts_arr.splice(index, 1);
                        }
                    }
                    all_data['aparts'] = aparts_arr
                    // console.log(all_data)
                })
                counter_2++;
            }
        });
        // обрабатываем нажать на ВЫБРАТЬ ВСЕ в 3ем меню
        document.getElementById('select_all_third').addEventListener('click', function () {
            let counter_2 = 0;
            if (aparts_arr.length === 4) {
                aparts_arr = []
                let counter_2 = 0
                buttons_third_menu.forEach(function (button) {
                    if (counter_2 < 4) {
                        button.style.backgroundColor = '#FF008AFF'
                    }
                    counter_2++
                })
            } else {
                buttons_third_menu.forEach(function (button) {
                    if (counter_2 < 4) {
                        if (!aparts_arr.includes(button.id)) {
                            button.click()
                        }
                    }
                    counter_2++
                })
            }
            all_data['aparts'] = aparts_arr
            // console.log(all_data)
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
                if (button.id === 'all_statisctic') {
                    all_data['statistic'] = 'all_statisctic'
                } else {
                    all_data['statistic'] = 'liter_statistic'
                }
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
        // нажали на отправить отчет в 5ой меню и отправили словарь с данными в бэк на test
        document.getElementById('send_report').addEventListener('click', function () {
            all_data['start_date'] = document.getElementById('start_date').value
            all_data['end_date'] = document.getElementById('end_date').value
            let url_for_post_test_api_element = document.getElementById('url-for-post-test-api');
            let url_for_post_test_api = url_for_post_test_api_element.getAttribute('data-url-for-post-test-api');
            let chat_id = tg.initDataUnsafe.user.id;

            let headers = {
                'Content-Type': 'application/json'
            };

            let payload = {
                'data': all_data,
                'chat_id': chat_id
            };
            fetch(url_for_post_test_api, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            tg.close()
        })


        // отправка данных в бэк для отрисовки/запуска
        let url_for_post_element = document.getElementById('url-for-post');
        let url_for_post = url_for_post_element.getAttribute('data-url-for-post');
        let chat_id;
        try {
            chat_id = tg.initDataUnsafe.user.id;
            console.log(chat_id)
        } catch (e) {
            document.getElementById('body').innerHTML = ''
        }
        // отдаем имя юзера и чат айди
        let name = tg.initDataUnsafe.user.first_name;
        // console.log(name)
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


