var xmlHttp = new XMLHttpRequest();

// Фунуция для получения eToken'a для отправки POST запросов
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// POST Запрос "контента" страницы с заданным "url"
function callPage(url, params){
    // Получаем eToken для POST запроса
    var csrftoken = getCookie('csrftoken');
    // Формируем тело запроса
    var body = params;
    // Открываем соединение с сервером
    xmlHttp.open("POST", url, true);
    // Формируем заголовок запроса
    xmlHttp.setRequestHeader('X-CSRFToken', csrftoken);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Установливаем функцию для сервера, которая выполнится после его ответа
    xmlHttp.onreadystatechange = updatePage;
    // Передаем запрос
    xmlHttp.send(body);
}

// Функция обработки ответа
function updatePage() {
    if (xmlHttp.readyState == 4){
        var response = xmlHttp.responseText;
		if ( response == 'Power On' || response == 'Restart' || response == 'Resume' ) {
			initActions(1);
		} else if ( response == 'Power Off' ) {
			initActions(5);
		} else if ( response == 'Suspend' ) {
			initActions(3);
		}
	}
	log_warning(response);
}
