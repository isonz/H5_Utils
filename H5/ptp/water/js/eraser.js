var canvas = document.getElementById("cas"),ctx = canvas.getContext("2d"); 

		var x1,y1,a=80,timeout,totimes = 100,jiange = 30;
		canvas.width = document.getElementById("bb").clientWidth;
		canvas.height = document.getElementById("bb").clientHeight;
		var img = new Image();
		img.src = "images/img2.jpg";
		img.onload = function(){
			lockSlide();
			//alert(1111);
			//fontimg.style.display = 'none';
			ctx.drawImage(img,0,0,canvas.width,canvas.height)
			//ctx.fillRect(0,0,canvas.width,canvas)
			//tapClip()
		}
		
		//通过修改globalCompositeOperation来达到擦除的效果
		function tapClip(){
			var hastouch = "ontouchstart" in window?true:false,
				tapstart = hastouch?"touchstart":"mousedown",
				tapmove = hastouch?"touchmove":"mousemove",
				tapend = hastouch?"touchend":"mouseup";
				
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.lineWidth = a*2;
			ctx.globalCompositeOperation = "destination-out";
			
			canvas.addEventListener(tapstart , function(e){
				clearTimeout(timeout)
				e.preventDefault();
				
				x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
				y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
				
				ctx.save();
				ctx.beginPath()
				ctx.arc(x1,y1,1,0,2*Math.PI);
				ctx.fill();
				ctx.restore();
				
				canvas.addEventListener(tapmove , tapmoveHandler);
				
				canvas.addEventListener(tapend , function(){
					canvas.removeEventListener(tapmove , tapmoveHandler);
					
					timeout = setTimeout(function(){					  
						var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
						var dd = 0;
						
						for(var x=0;x<imgData.width;x+=30){
							for(var y=0;y<imgData.height;y+=30){
								var i = (y*imgData.width + x)*4;
								if(imgData.data[i+3] >0){
									dd++
								}
							}
						}
						if(dd/(imgData.width*imgData.height/900)<0.6){
							canvas.className = "noOp";
                            //font1.style.visibility = 1;
                            document.getElementById("array").style.visibility = "visible";
                            //fontimg.style.display = 'inline';
							//$("#fontimg1").append(innerHTML1);
                            unlockSlide();
                        }
					},totimes)
				});
				function tapmoveHandler(e){
					clearTimeout(timeout)
					e.preventDefault()
					x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
					y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
					
					ctx.save();
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke();
					ctx.restore()
					
					x1 = x2;
					y1 = y2;
				}
			})
		}