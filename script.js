var timer = document.querySelector("#timer h1")
var timerButton = document.querySelector("#timer button")


var grow  = 0
var int = setInterval(function(){
    if(grow < 90){ 
        grow += Math.floor(Math.random()*20)
        timer.innerHTML = grow+"%"
    } else{
        grow = 100
        timer.innerHTML = grow+"%"
        // console.log("Hey")
        timer.style.transform = "translateY(-100%)"
        timerButton.style.transform = "translateY(-100%)"
        timerButton.style.opacity = "1"


        clearInterval(int)
       
    }
},Math.floor(Math.random()*300))


timerButton.addEventListener("click",function(){
    gsap.to("#page1",{
        scale:1,
        duration:0.5
    })
    gsap.to("#timer",{
        opacity:0
    })
})