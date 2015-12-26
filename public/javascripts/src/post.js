$(window).load(function() {
	new Vue({
		el: '.form',
		data: {
			title: "",
			content: '# hello'
		},
		methods : {
			submit:function(e){
				alert('submit')
				$('.form').submit();
			}
		},
		filters: {
			marked: marked
		}
	})
})