var audio = new Audio("./insect-sound.mp3");

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  var timer = document.querySelector("#timer h1");
  var timerButton = document.querySelector("#timer button");
  var grow = 0;
  var int = setInterval(function () {
    if (grow < 90) {
      grow += Math.floor(Math.random() * 20);
      timer.innerHTML = grow + "%";
    } else {
      grow = 100;
      timer.innerHTML = grow + "%";
      // console.log("Hey")
      timer.style.transform = "translateY(-100%)";
      timerButton.style.transform = "translateY(-100%)";
      timerButton.style.opacity = "1";

      clearInterval(int);
    }
  }, Math.floor(Math.random() * 300));

  timerButton.addEventListener("click", function () {
    // play audio by this line
    // audio.play()
    gsap.to("#page1", {
      scale: 1,
      duration: 0.5,
      borderRadius: 0,
    });
    gsap.to("#timer", {
      opacity: 0,
    });
    gsap.to("#log", {
      opacity: 1,
    });
    gsap.to("#nav", {
      top: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to("body", {
      overflowY: "auto",
      paddingTop:"0vw"
    });
  });
}

function textAnimation(){
  var clutter = ""
  var h1Text = document.querySelector("#page3-part1 h1").textContent
  var splitedText = h1Text.split("")
  splitedText.forEach(function(elem){
    clutter += `<span>${elem}</span>`
  })
  document.querySelector("#page3-part1 h1").innerHTML = clutter

  var tl = gsap.timeline({
    scrollTrigger:{
      trigger:"#page3",
      scroller:"body",
      start:"top 0%",
      end:"top -100%",
      pin:true,
      scrub:2,
      markers:true
    }
  })
  tl.to("#page3-part1 h1 span",{
      color:"#000",
      stagger:0.1,
  })
  tl.to("#page3-part1",{
    transform:"translateX(-100vw)"
  },"anim1")
  tl.to("#page3-part2",{
    transform:"translateX(-100vw)"
  },"anim1")
}
textAnimation()
loadingAnimation();
// loco()




window.addEventListener("resize",function(){
  location.reload()
})