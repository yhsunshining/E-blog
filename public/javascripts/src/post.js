$(window).load(function() {
	var form = new Vue({
		el: '.form',
		data: {
			title: "",
			content: '# hello'
		},
		methods : {
			submit:function(e){
				console.log('submit')
//				$('.form').submit();
			}
		},
		filters: {
			marked: marked
		},
		watch:{
			'content':function(oldS,newS){
				setTimeout(function(){
					$('.markdown').scrollTop($(".markdown")[0].scrollHeight);
				},300)
			}
		}
	})
	
})