                           

(function ($) { "use strict";
	
	/* ========================================================================= */
	/*	Page Preloader
	/* ========================================================================= */
	
	// window.load = function () {
	// 	document.getElementById('preloader').style.display = 'none';
	// }

	$(window).on("load",function(){
		$('#preloader').fadeOut('slow',function(){$(this).remove();});
	});




	/* ========================================================================= */
	/*	Portafolio Filtering Hook
	/* =========================================================================  */
	$('.play-icon i').click(function() {
		var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
		$(this).replaceWith(video);
	});

	/* ========================================================================= */
	/*	Portafolio Filtering Hook
	/* =========================================================================  */

	var portafolio_item = $('.portafolio-items-wrapper');
	if (portafolio_item.length) {
		var mixer = mixitup(portafolio_item);
	};

	
	/* ========================================================================= */
	/*	Testimonios Carousel
	/* =========================================================================  */
 
	//Init the slider
	$('.testimonios-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: true,
		arrows:false,
		autoplay: true,
  		autoplaySpeed: 5000,
  		responsive: [
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		  ]
	});


	/* ========================================================================= */
	/*	clientes Slider Carousel
	/* =========================================================================  */
 
	//Init the slider
	$('.clientes-logo-slider').slick({
		infinite: true,
		arrows:false,
		autoplay: true,
  		autoplaySpeed: 2000,
  		slidesToShow: 5,
  		slidesToScroll: 1,
	});




	/* ========================================================================= */
	/*	Empresa Slider Carousel
	/* =========================================================================  */
	$('.empresa-galeria').slick({
		infinite: true,
		arrows:false,
		autoplay: true,
  		autoplaySpeed: 2000,
  		slidesToShow: 5,
  		slidesToScroll: 1,
	});
	
	
	/* ========================================================================= */
	/*	Awars Counter Js
	/* =========================================================================  */
	$('.counter').each(function() {
	  var $this = $(this),
	      countTo = $this.attr('data-count');
	  
	  $({ countNum: $this.text()}).animate({
	    countNum: countTo
	  },

	  {

	    duration: 1500,
	    easing:'linear',
	    step: function() {
	      $this.text(Math.floor(this.countNum));
	    },
	    complete: function() {
	      $this.text(this.countNum);
	      //alert('finished');
	    }

	  });  
	  
	  

	});




	/* ========================================================================= */
	/*   Contacto Form Validating
	/* ========================================================================= */


	$('#contacto-submit').click(function (e) {

		//stop the form from being submitted
		e.preventDefault();

		/* declare las variables, var error es la variable que usamos al final
		para determinar si hubo un error o no*/
		var error = false;
		var name = $('#name').val();
		var email = $('#email').val();
		var subject = $('#subject').val();
		var message = $('#message').val();

		/* en la siguiente sección hacemos la comprobación usando VARIABLE.length
		donde VARIABLE es la variable que estamos comprobando (como nombre, correo electrónico),
		la longitud es una función de JavaScript para obtener el número de caracteres.
		Y como pueden ver si el número de caracteres es 0, configuramos el error
		variable a true y muestra el name_error div con el efecto fadeIn.
		si no es 0, desvanecemos el div (eso es si se muestra el div y
		el error está arreglado, se desvanece.

		La única diferencia de estos controles es la comprobación de correo electrónico, tenemos
		email.indexOf ('@') que verifica si hay @ en el campo de entrada de correo electrónico.
		Esta función de JavaScript devolverá -1 si no se ha encontrado ninguna ocurrencia.*/
		if (name.length == 0) {
			var error = true;
			$('#name').css("border-color", "#D8000C");
		} else {
			$('#name').css("border-color", "#666");
		}
		if (email.length == 0 || email.indexOf('@') == '-1') {
			var error = true;
			$('#email').css("border-color", "#D8000C");
		} else {
			$('#email').css("border-color", "#666");
		}
		if (subject.length == 0) {
			var error = true;
			$('#subject').css("border-color", "#D8000C");
		} else {
			$('#subject').css("border-color", "#666");
		}
		if (message.length == 0) {
			var error = true;
			$('#message').css("border-color", "#D8000C");
		} else {
			$('#message').css("border-color", "#666");
		}

		//ahora cuando se realiza la validación comprobamos si la variable de error es falsa (sin errores)
		if (error == false) {
			// deshabilita el botón de enviar para evitar spam
			// y cambia el texto del botón a Enviando ...
			$('#contacto-submit').attr({
				'disabled': 'false',
				'value': 'Enviando...'
			});

			/* using the jquery's post(ajax) function and a lifesaver
			function serialize() which gets all the data from the form
			we submit it to send_email.php 
			utilizando la función jquery 's post(ajax) y una función salvavidas
			serialize() que obtiene todos los datos del formulario que usamos
			para enviar correos electrónicos en send_mail.php
			
			*/
			$.post("sendmail.php", $("#contacto-form").serialize(), function (result) {
				//and after the ajax request ends we check the text returned
				if (result == 'sent') {
					//if the mail is sent remove the submit paragraph
					$('#cf-submit').remove();
					//and show the mail success div with fadeIn
					$('#mail-success').fadeIn(500);
				} else {
					//show the mail failed div
					$('#mail-fail').fadeIn(500);
					/* vuelve a habilitar el botón de enviar quitando el atributo deshabilitado 
					y cambia el texto de nuevo el mensaje ENVIAR*/
					$('#contacto-submit').removeAttr('disabled').attr('value', 'EVIAR');
				}
			});
		}
	});


/* ========================================================================= */
/*	On scroll fade/bounce effect
/* ========================================================================= */
	var scroll = new SmoothScroll('a[href*="#"]');

/* ========================================================================= */
	/*	Header Scroll Background Change
	/* ========================================================================= */	
	
$(window).scroll(function() {    
var scroll = $(window).scrollTop();
 //console.log(scroll);
if (scroll > 200) {
    //console.log('a');
    $(".navigation").addClass("sticky-header");
} else {
    //console.log('a');
    $(".navigation").removeClass("sticky-header");
}});


})(jQuery);



window.marker = null;

function initialize() {
    var map;

	var latitude = $('#map').data('lat');
	var longitude = $('#map').data('long');
    var nottingham = new google.maps.LatLng(latitude, longitude);

    var style = [
    	{"stylers": [{"hue": "#ff61a6"},{"visibility": "on"},{"invert_lightness": true},{"saturation": 40},{"lightness": 10}]}
	];

    var mapOptions = {
        // SET THE CENTER
        center: nottingham,

        // SET THE MAP STYLE & ZOOM LEVEL
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom:9,

        // SET THE BACKGROUND COLOUR
        backgroundColor:"#000",

        // REMOVE ALL THE CONTROLS EXCEPT ZOOM
        zoom:17,
        panControl:false,
        zoomControl:true,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        overviewMapControl:false,
        zoomControlOptions: {
            style:google.maps.ZoomControlStyle.LARGE
        }

    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // SET THE MAP TYPE
    var mapType = new google.maps.StyledMapType(style, {name:"Grayscale"});
    map.mapTypes.set('grey', mapType);
    map.setMapTypeId('grey');

    //CREATE A CUSTOM PIN ICON
    var marker_image = $('#map').data('marker');
    var pinIcon = new google.maps.MarkerImage(marker_image,null,null, null,new google.maps.Size(25, 33));
	
    marker = new google.maps.Marker({
        position: nottingham,
        map: map,
        icon: pinIcon,
        title: 'navigator'
    });
}

var map = $('#map');
if(map.length != 0){
    google.maps.event.addDomListener(window, 'load', initialize);
}



                            