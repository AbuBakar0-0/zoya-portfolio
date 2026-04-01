//---START TYPEWRITER---
const carouselText = [{
        text: "Apple",
        color: "red"
    },
    {
        text: "Orange",
        color: "orange"
    },
    {
        text: "Lemon",
        color: "yellow"
    }
]

$(document).ready(async function() {
    carousel(carouselText, "#feature-text")
});

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

async function carousel(carouselList, eleRef) {
    var i = 0;
    while (true) {
        updateFontColor(eleRef, carouselList[i].color)
        await typeSentence(carouselList[i].text, eleRef);
        await waitForMs(1500);
        await deleteSentence(eleRef);
        await waitForMs(500);
        i++
        if (i >= carouselList.length) {
            i = 0;
        }
    }
}

function updateFontColor(eleRef, color) {
    $(eleRef).css('color', color);
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
//-----END TYPEWRITER---
//hide header on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        //2024-10-07  document.getElementById("navItems").style.top = "0px";
    } else {
        //2024-10-07  document.getElementById("navItems").style.top = "-60px";
    }
    prevScrollpos = currentScrollPos;
}
//smooth scroll
$(document).ready(function() {
    $("a").on('click', function(event) {
        return true;
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function() {
                window.location.hash = hash;
            });
        }
    });
});
//smooth scroll to top
jQuery(document).ready(function() {
    var offset = 220;
    var duration = 500;
    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })
});
//disable drag on images
$('img').on('dragstart', function(event) {
    event.preventDefault();
});
$('img').bind('contextmenu', function(e) {
    return false;
});
//responsive header
function toggleMenu() {
    $("#hamburgerMenu").toggleClass("collapsed");
    $(".mobile-overlay").animate({
        height: "toggle",
        opacity: "toggle"
    }, 300);
}
//scrollspy
window.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
                document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
    });
    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });
});
//rotating logo on scroll
;
(function() {
    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function() {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle("scroll", "optimizedScroll");
})();
var logofront = document.getElementById("logo-front"),
    logoback = document.getElementById("logo-back");
window.addEventListener("scroll", function() {
    //2024-10-07 logofront.style.transform = "rotate("+(window.pageYOffset*0.1)+"deg)";
    //2024-10-07 logoback.style.transform = "rotate("+(window.pageYOffset*0.1)+"deg)";
});
//play gif on command
//commented out 2024-10-07
// new Freezeframe('.freezeframe-hover', {
//     trigger: 'hover',
//     overlay: false
// });
// new Freezeframe('.freezeframe-clickoverlay', {
//     trigger: 'click',
//     overlay: true,
//     responsive: true
// });
// new Freezeframe('.freezeframe-dontstop', {
//     trigger: 'hover',
//     overlay: false
// });
// 2024-10-07
// var $grid = $('.grid').masonry({
//   itemSelector: '.grid-item',
//   percentPosition: true,
//   columnWidth: '.grid-sizer'
// });

// layout Masonry after each image loads
// $grid.imagesLoaded().progress( function() {
//   $grid.masonry();
// });
// 2024-10-07
//tabs on spice rack
function spiceCategory(evt, categoryName) {
    var i, tabcontent, filter;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    filter = document.getElementsByClassName("filter");
    for (i = 0; i < filter.length; i++) {
        filter[i].className = filter[i].className.replace(" active", "");
    }
    document.getElementById(categoryName).style.display = "block";
    evt.currentTarget.className += " active";
    $grid.masonry()
}
// Get the element with id="defaultOpen" and click on it
// 2024-10-09 document.getElementById("defaultOpen").click();
// animate on scroll
// 2024-10-09 AOS.init();
// You can also pass an optional settings object
// below listed default settings

// 2024-10-09
// AOS.init({
//     // Global settings:
//     disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
//     startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
//     initClassName: 'aos-init', // class applied after initialization
//     animatedClassName: 'aos-animate', // class applied on animation
//     useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
//     disableMutationObserver: false, // disables automatic mutations' detections (advanced)
//     debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
//     throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
//     // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
//     delay: 0, // values from 0 to 3000, with step 50ms
//     duration: 1500, // values from 0 to 3000, with step 50ms
//     easing: 'ease-in', // default easing for AOS animations
//     once: false, // whether animation should happen only once - while scrolling down
//     mirror: false, // whether elements should animate out while scrolling past them
// });
// 2024-10-09