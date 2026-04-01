"use strict";

//Toggle navigation

function openNav() {
    document.getElementById('navigation').style.display = 'block';
}

function closeNav() {
    document.getElementById('navigation').style.display = 'none';
}



let lastScrollTop = 0; // Track the last scroll position
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.top = '-85px'; // Adjust this value to hide the header
    } else {
        // Scrolling up
        header.style.top = '0';
    }

    lastScrollTop = scrollTop; // Update the last scroll position
});


/*------------------------------------*/