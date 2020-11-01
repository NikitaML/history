$(document).ready(function () {

	$(document).on('scroll', function () {
		change_data();
		fadein_text();
		choose_year();
	});

	$(".currentYear").on("click", ".year-item", function () {
		choose_year();
	});

	// Изменение даты при скролле
	change_data();
	// Появление блоков при прокрутке
	fadein_text();
	// ПЛАВНЫЙ СКРОЛ ДО ЯКОРНОЙ ССЫЛКИ
	smooth_scroll();
	// ПРОКРУТКА ГОДОВ В ТЕКУЩЕМ
	scroll_years();
	// Скрытие даты при клике вне области 
	hide_data();

})


var windowHeight = $(window).height()

//--------------изменение текущей даты------------------ 
function change_data() {

	$('.lastYear__data').each(function () {
		var year = $(this);
		//---задаем коэф.перекрытия года текущим
		if ($(window).width() >= 767) {
			//значение для десктопа
			value = 1.07;
		} else {
			//значение для мобильных устройств и планшетов
			value = 1.08;
		}

		height = year.offset().top / value;

		if ($(document).scrollTop() >= height) {
			$('.currentYear__data').html($(year).attr('data-year'));
			$('.currentYear__data').attr('data-current', $(year).attr('data-year'));
		}
	});

}

//----------------появление блока с текстом в области видимости--------------------
function fadein_text() {

	$('.historyYearArticle').each(function () {
		var data = $(this);
		// ----задаем коэф.появления блоков при прокрутке
		if ($(window).width() >= 767) {
			//значение для десктопа
			overlap = 1;
		} else {
			//значение для мобильных устройств и планшетов
			overlap = 1.2;
		}

		height = data.offset().top / overlap + data.height() / overlap - windowHeight;

		if ($(document).scrollTop() >= height) {
			$(this).find('.historyYearArticle__year, .historyYearArticle__text, .historyYearArticle__title, .historyYearArticle__descr, .historyYearArticle__ref').addClass('fade');
		}
	});
}

//вставка всех годов по возрастанию

function past_year() {

	var yearsNext = [];
	var yearsPrev = [];
	var current = $('.currentYear__data').attr("data-current")

	if ($('.historyContent__current').hasClass('active')) {
		choose_year();
	}
	// заполняем массив данными меньше текущего года
	$($('.lastYear__data').get().reverse()).each(function () {

		var data = $(this).attr('data-year');

		if (data < current) {
			yearsPrev.push(data);
		}
	});

	// заполняем массив данными больше текущего года

	$($('.lastYear__data').get().reverse()).each(function () {

		var data = $(this).attr('data-year');

		if (data > current) {
			yearsNext.push(data);
		}
	});





	// вставляем следующие года
	$.each(yearsNext, function (index, value) {
		var templeate = `<a class="year-item" href="#${yearsNext[index]}" >${yearsNext[index]}</a>`;
		$('.next-year').append(templeate);
	});

	$.each(yearsPrev, function (index, value) {
		var templeate = `<a class="year-item" href="#${yearsPrev[index]}" >${yearsPrev[index]}</a>`;
		$('.prev-year').append(templeate);
	});

	$('.historyContent__current').addClass('active');

	// получаем ширину блока со следующими годами 
	var scrollClick = $('.prev-year').outerWidth();
	// При прокручиваем на расстояние следующих годов, чтобы текущий год всегда был по центру   
	$('.currentYear').scrollLeft(scrollClick);
}



function choose_year() {
	$('.historyContent__current').removeClass('active');
	$('.year-item').remove();
}

function scroll_years() {
	$('.currentYear').on("mousewheel", function (e) {

		var deltaY = event.deltaY;

		$(this).scrollLeft($(this).scrollLeft() - deltaY / 2);
		e.preventDefault();
	});
}

// ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРНОЙ ССЫЛКЕ
function smooth_scroll() {
	$(".currentYear").on("click", ".year-item", function (e) {
		var anchor = $(this);
		// высота якорного блока
		var heightYear = $('.lastYear').outerHeight();
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - heightYear
		}, 1000);
		e.preventDefault();
		return false;
	});
}

// клик вне даты
function hide_data() {
	$(document).click(function (event) {
		if ($(event.target).closest(".historyContent__current").length) return;
		choose_year();
		event.stopPropagation();
	});
}








