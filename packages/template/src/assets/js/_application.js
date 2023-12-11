
$(document).ready(function () {

	$(document).on("keyup", ".input-block input", function (e) {
		$this = $(e.currentTarget);
		if ($this.val() != "")
			$this.parents(".input-block").addClass("active");
		else
			$this.parents(".input-block").removeClass("active");
	});

	$('.news-slider').slick({
		arrows: true,
		dots: false,
		nextArrow: '<button class="slick-arrow slick-next"><svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.327327 0.260067C-0.0813308 0.631574 -0.111447 1.26402 0.26006 1.67268L4.64854 6.50001L0.26006 11.3273C-0.111447 11.736 -0.0813308 12.3684 0.327327 12.7399C0.735985 13.1115 1.36843 13.0813 1.73994 12.6727L6.73994 7.17268C7.08669 6.79126 7.08669 6.20876 6.73994 5.82733L1.73994 0.327334C1.36843 -0.0813234 0.735985 -0.11144 0.327327 0.260067Z" fill="#0E3685"/></svg></button>',
		prevArrow: '<button class="slick-arrow slick-prev"><svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.67267 0.260067C7.08133 0.631574 7.11145 1.26402 6.73994 1.67268L2.35146 6.50001L6.73994 11.3273C7.11145 11.736 7.08133 12.3684 6.67267 12.7399C6.26402 13.1115 5.63157 13.0813 5.26006 12.6727L0.26006 7.17268C-0.0866866 6.79126 -0.0866866 6.20876 0.26006 5.82733L5.26006 0.327334C5.63157 -0.0813234 6.26402 -0.11144 6.67267 0.260067Z" fill="#0E3685"/></svg></button>',
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 1000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					variableWidth: true,
				}
			}
		]
	});

	//header mob
	$('.header-bar').on('click', function () {
		$('.header').toggleClass('header-active');
	});

	$(document).on('click', function (e) {
		var block = $(".header");
		if (!block.is(e.target) && block.has(e.target).length === 0)
			$('.header').removeClass('header-active');
	});

	//modal
	var modalCont = $('.modal');

	$('.button-modal').on('click', function (e) {
		e.preventDefault();

		$(modalCont).removeClass('open');
		$('.modal-overlay').removeClass('open-overlay');

		var id = $(this).attr('href');
		$(id).addClass('open');

		var lead_partner = $(this).data('partner') || false;
		$(id).data('partner', lead_partner);

		$('.modal-overlay').addClass('open-overlay');
	});

	var contacts_modal = $('#modal-contacts');
	var thank_modal = $('#modal-thank');
	var form = $(".contacts-form");
	var alert = $('.contacts-form .alert');
	var alert_content = $('.contacts-form .alert .content');

	form.submit(function (e) {
		e.preventDefault();

		var post_url = $(this).attr("action");
		var request_method = $(this).attr("method");
		var form_data = $.extend($(this).serializeArray(), [{
			name: 'lead[partner]',
			value: contacts_modal.data('partner')
		}]);

		form.find(':input').prop('disabled', true);

		$.ajax({
			url: post_url,
			type: request_method,
			data: form_data
		}).done(function () {
			contacts_modal.removeClass('open');
			contacts_modal.removeClass('open-overlay');

			thank_modal.addClass('open');
			thank_modal.addClass('open-overlay');

			alert.hide();

			form.trigger("reset");
			form.find(".input-block").removeClass("active");
		}).fail(function (response) {
			alert.addClass('alert-danger');

			var error;
			if (response.responseJSON) {
				error = response.responseJSON.errors
			} else {
				error = "We're sorry, but something went wrong."
			}
			alert_content.text(error);

			alert.show();
		});

		form.find(':input').removeAttr("disabled");
	});

	$('.modal-close, .modal-overlay').on('click', function () {
		$(modalCont).removeClass('open');
		$('.modal-overlay').removeClass('open-overlay');

		form.trigger("reset");
		form.find(".input-block").removeClass("active");
		alert_content.text('');

		alert.hide();
	});


	$('.alert .close').on('click', function (e) {
		e.preventDefault();

		$('.alert').hide();
	})
});
