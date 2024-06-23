$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });
    

    // Add class on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });

    // Toggle mobile menu
    $('.menu-toggle').on('click', function() {
        $('nav').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Animate on Scroll Initialization
    AOS.init({
        duration: 1000,
        once: true
    });

    // Back to top button
    var backToTop = $('.back-to-top');
    backToTop.hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Form submission via AJAX
    $('#contactForm').submit(function(e) {
        e.preventDefault(); // Prevent form submission and page reload

        // Serialize form data
        var formData = $(this).serialize();

        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: 'process_contact.php', // Adjust URL as needed
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Show success alert
                    showAlert('success', response.message);
                    // Optionally clear the form
                    $('#contactForm')[0].reset();
                } else {
                    // Show error alert
                    showAlert('error', response.message);
                }
            },
            error: function(xhr, status, error) {
                showAlert('error', 'An error occurred while processing your request.');
            }
        });
    });

    function showAlert(type, message) {
        var alertClass = (type === 'success') ? 'alert-success' : 'alert-danger';
        var alertHtml = '<div class="alert ' + alertClass + ' alert-dismissible fade show" role="alert">' +
                        message +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>';
        $('#alerts').html(alertHtml);
    }
});