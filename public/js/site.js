$().ready( function () {
	var ctx = document.getElementById("myChart").getContext('2d');
	AOS.init();
	var myDoughnutChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [15,35,30,20],
				backgroundColor: [
					'#BDDB00', '#FFCB33', '#BA7200', '#FF9500'
				]
			}],
			labels: [
				'Red',
				'Yellow',
				'Blue',
				'Black',
			],
		},
		options: {
			responsive: false,
			tooltips: {
				enabled: false
			},
			legend: {
				'display' : false
			}
		}
	});

	particlesJS.load('particles-js', './particles.json', function() {
		console.log('callback - particles.js config loaded');
	});

});
function update(e){
	var x = e.clientX || e.touches[0].clientX
	var y = e.clientY || e.touches[0].clientY
  
	document.getElementById('particle-network-animation').style.setProperty('--cursorX', x + 'px')
	document.getElementById('particle-network-animation').style.setProperty('--cursorY', y + 'px')
  }
document.addEventListener('mousemove',update)
document.addEventListener('touchmove',update)

