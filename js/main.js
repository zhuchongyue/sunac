$(window).resize(function(){
	document.getElementsByClassName('ctn')[0].style.top = $('.bg_wrap .end_bg').height() * 0.52 + "px";
});

function rnd(n, m)
{
	return parseInt(Math.random()*(m-n)+n);
}

function sunacAnimate () {	


	$("div.bg_wrap").show();

	//var screen2 = document.getElementById('screen_2');
	var oDiv = document.getElementsByClassName('ctn')[0];

	var isAudioTempPause = false;

	var C=8;
	var R=6;
	
	var divCX=oDiv.offsetWidth/2;  //容器的中心点
  	var divCY=oDiv.offsetHeight/2; //容器的中心点
	var isAnimating = false;
	var showNodes = 0;
	var hideNodes = 0;

	var cur_status = -1;
	var os = {};
	function animateSpread (cb) {
		hideNodes = 0;
		for(var i=0;i<R;i++)
		{
			for(var j=0;j<C;j++)
			{
				var oNewDiv = document.getElementById('new_'+i+'_'+j);
				if(!oNewDiv) {
					cb('no element');
					return;
				}
				//飞走——跟中心的距离——方向
				var l=oNewDiv.offsetLeft+oNewDiv.offsetWidth/2;
				var t=oNewDiv.offsetTop+oNewDiv.offsetHeight/2;
				var disX=l-divCX;
				var disY=t-divCY;
				(function (oNewDiv, disX, disY){
					setTimeout(function (){
						oNewDiv.style.WebkitTransform='perspective(800px) translate3d('+disX+'px, '+disY+'px, 600px) rotateY('+rnd(-180, 180)+'deg) rotateX('+rnd(-180, 180)+'deg) scale(2,2)';
						oNewDiv.style.opacity=0;


						setTimeout(function (){
							oDiv.removeChild(oNewDiv);
							hideNodes ++;
							if(hideNodes == i * j && cb) cb();
						}, 600);
					}, rnd(1, 301));
				})(oNewDiv, disX, disY);
			}
		}
	}
	function animateAggregate (cb) {

		oDiv.style.top = $('.bg_wrap .end_bg').height() * 0.52 + "px";

		showNodes = 0;
		for(var i=0;i<R;i++)
		{
			for(var j=0;j<C;j++)
			{
				//创建
				var w=Math.floor(oDiv.offsetWidth/C);
				var h=Math.floor(oDiv.offsetHeight/R);
				var oNewDiv=document.createElement('div');
				oNewDiv.id='new_'+i+'_'+j;
				oNewDiv.style.opacity=0;
				oNewDiv.style.left=j*w+'px';
				oNewDiv.style.top=i*h+'px';
				
				oNewDiv.style.width=w+'px';
				oNewDiv.style.height=h+'px';
				
						
				var offsetLeft = j*w;
				var offsetTop = i*h;

				var l=offsetLeft+w/2;
				var t=offsetTop+h/2;
				var disX=l-divCX;
				var disY=t-divCY;
				oNewDiv.style.WebkitTransform='perspective(800px) translate3d('+disX+'px, '+disY+'px, 600px) rotateY('+rnd(-180, 180)+'deg) rotateX('+rnd(-180, 180)+'deg) scale(2,2)';
						oNewDiv.style.opacity=0;
				oNewDiv.style.backgroundPosition = '-'+offsetLeft+'px -'+offsetTop+'px';
				oNewDiv.style.backgroundSize = parseFloat($('.end_bg').width()) * 0.45 +'px auto';
						
				oDiv.appendChild(oNewDiv);
				
				//飞来——跟中心的距离——方向
				
				(function (oNewDiv, disX, disY){
					setTimeout(function (){
						oNewDiv.style.WebkitTransform='translate3d(0,0,0)';
						oNewDiv.style.opacity=1;
						showNodes ++;
						if(showNodes == i * j && cb) cb();
					}, /*rnd(300, 500)*/500);
				})(oNewDiv, disX, disY);
			}
		}
	}
	

	
	function hideAndShow (status, isBack) {
		
		animateSpread(function(){			
			animateAggregate(function(){
				isAnimating = false;
			});
		});
	}
	
    function bindEvents () {
    	var ua = navigator.userAgent;
    	var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	    if(android || ipad || ipod || iphone) {
	    	$('#btn').on('touchstart', hideAndShow);
	    } else {
	    	$('#btn').on('click', hideAndShow);
	    }	
		
    }
   
    function init () {
    	animateAggregate();
    	//bindEvents();
    }
    init();
}

$(function(){

		const WRAP_WIDTH = $("#wrap").width();

		const WRAP_HEIGHT = $("#wrap").height();

		var col = Math.floor(WRAP_WIDTH / 120);


		function getLeft(index){

			return (index % col) * 120;
		}

		function getTop(index){

			return Math.floor(index / col) * 120;
		}

		function getRotate() {
			return "rotate(" + (Math.random()* 90 - 45) + "deg)"
		}

		$("div.container img").each(function(index,value){
			$(value).css({'left':getLeft(index),'top': getTop(index),'transform':getRotate()});
		});


		var initRotate;

		$("div.container img").hover(
			function(){

				initRotate = $(this).css('transform');

				$(this).css({
					'box-shadow':'15px 15px 20px rgba(50, 50, 50, 0.4)',
					'-webkit-transform':'rotate(0deg) scale(1.50)',
					'-moz-transform':'rotate(0deg) scale(1.50)',
					'transform':'rotate(0deg) scale(1.50)',
					'z-index':2
				});

			
			},function(){

				$(this).css({
					'box-shadow':'2px 2px 3px rgba(50, 50, 50, 0.4)',
					'transform':initRotate,
					'z-index':1
				});
		});


		//$("#hole .hole").addClass("hole-active");

		var leftVal = $("div.container").width() / 2;
		var topVal = $("div.container").height() / 2;


		$("#wrap img").each(function(index,value){


			var x = leftVal- parseInt($(value).css('left'));

			var y = topVal - parseInt($(value).css('top'));

			$.keyframe.define([{
				name:'move'+index,
				'0%':{'transform':'translate(0px,0px)','opacity':1,'width':'100px'},
				'100%':{'transform':'translate('+ x +'px,' + y + 'px)', 'opacity': 0,'width':'0px'}
			}])

			var time = rnd(1000,5000);


			setTimeout(function(){
					//$(value).css({"transform":"","zIndex":10}).addClass('imgmv');

					$(value).css({"transform":"","zIndex":10}).playKeyframe({
					    name: 'move'+index, 
					    duration: '2s',
					    timingFunction: 'linear', 
					    delay: '0s', 
					    iterationCount: '1', 
					    direction: 'normal', 
					    fillMode: 'forwards', 
					    complete: function(){
					    	$(value).remove();
					    } 
					});

			},time);

			/*setTimeout(function(){

				$.keyframe.define([{
					name:'scale'+index,
					'0%':{'transform':'scale(1,1)', 'opacity':1},
					'100%':{'transform':'scale(0,0)', 'opacity': 1}
				}]);

				$(value).playKeyframe({
				    name: 'scale'+index, 
				    duration: '2s',
				    timingFunction: 'linear', 
				    delay: '0s', 
				    iterationCount: '1', 
				    direction: 'normal', 
				    fillMode: 'forwards', 
				    complete: function(){} 
				});
			},time + 10000)*/

		});

		setTimeout(sunacAnimate,6500);


	});