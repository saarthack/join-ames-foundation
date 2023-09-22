gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


locoScroll.stop()


gsap.set("body,#main", {
    overflowY: "hidden",
    overflowX: "hidden"
})

gsap.set("#nav", {
    y: -80
})
gsap.set("#elem1", {
    opacity: 1
})

gsap.set("#elem1 p", {
    opacity: 1
})

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

    var btn = document.querySelector("#page1 button")
    btn.addEventListener("click", function () {
        locoScroll.start()
        var tl = gsap.timeline()
        tl.to("#page1", {
            scale: 1,
            duration: 0.8
        }, "anim")
        tl.to("#main", {
            overflowY: "auto"
        }, "anim")
        tl.to("#log", {
            opacity: 1,
        }, "anim");
        tl.to(btn, {
            opacity: 0
        }, "anim")
        tl.to("#nav", {
            y: 0
        })
    })

}

loadingAnimation()




var text = document.querySelector("#page2-part1 h1").textContent
var clutter = ""
text.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
})

document.querySelector("#page2-part1 h1").innerHTML = clutter

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        scrub: 2,
        pin: true,
        start: "top 0",
        end: "top -200%"
    }
})
tl.to("#page2 h1 span", {
    color: "#111",
    stagger: 0.2,
})
tl.to("#page2-part1", {
    transform: "translateX(-100vw)",
    duration: 10
}, "anim")
tl.to("#page2-part2", {
    transform: "translateX(-100vw)",
    duration: 30
}, "anim")


var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page3",
        scroller: "#main",
        start: "top 0",
        end: "top -200%",
        scrub: true,
        pin: true
    }
})

tl3.to("#page3 img", {
    y: 200
})
    .to("#page3 #elem1", {
        opacity: 0.5
    }, "lol")
    .to("#page3 #elem1 p", {
        opacity: 0
    }, "lol")
    .to("#page3 #elem2", {
        opacity: 1
    }, "lol")
    .to("#page3 #elem2 p", {
        opacity: 1
    }, "lol")
    .to("#page3 img", {
        y: 400
    })
    .to("#elem2", {
        opacity: 0.5
    })
    .to("#elem2 p", {
        opacity: 0
    })
    .to("#elem3", {
        opacity: 1
    })
    .to("#elem3 p", {
        opacity: 1
    })



function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}

swiperAnimation()