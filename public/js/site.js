window.addEventListener('scroll', function() {
	if (document.body.scrollTop >= 90) {
		$('#topNav').addClass('active');
	}else{
		$('#topNav').removeClass('active');
	}
});