document.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById('second_menu').style.display = 'none'
    let buttons_first_menu = document.querySelectorAll('#first_menu .btn')
    buttons_first_menu.forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('second_menu').style.display = 'block'
            document.getElementById('first_menu').style.display = 'none'


        })
    })

})
let tg = window.Telegram.WebApp
console.log(tg)