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

(function () {
    const visualProjectPages = ['gallery-page', 'notepad-page', 'cylo-visual-page'];
    const isVisualProjectPage = visualProjectPages.some(function (pageClass) {
        return document.body.classList.contains(pageClass);
    });

    if (!isVisualProjectPage) {
        return;
    }

    const zoomableImages = document.querySelectorAll('.zoomable-image');

    if (!zoomableImages.length) {
        return;
    }

    const minScale = 1;
    const maxScale = 3;
    const scaleStep = 0.25;

    function clampScale(value) {
        return Math.min(maxScale, Math.max(minScale, value));
    }

    zoomableImages.forEach(function (image) {
        if (image.closest('.inline-zoom')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'inline-zoom';

        const controls = document.createElement('div');
        controls.className = 'inline-zoom-controls';

        const zoomOutButton = document.createElement('button');
        zoomOutButton.type = 'button';
        zoomOutButton.className = 'inline-zoom-button';
        zoomOutButton.setAttribute('aria-label', 'Zoom out');
        zoomOutButton.textContent = '-';

        const zoomLevel = document.createElement('span');
        zoomLevel.className = 'inline-zoom-level';
        zoomLevel.textContent = '100%';

        const zoomInButton = document.createElement('button');
        zoomInButton.type = 'button';
        zoomInButton.className = 'inline-zoom-button';
        zoomInButton.setAttribute('aria-label', 'Zoom in');
        zoomInButton.textContent = '+';

        const stage = document.createElement('div');
        stage.className = 'inline-zoom-stage';

        image.draggable = false;
        image.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });

        image.parentNode.insertBefore(wrapper, image);
        wrapper.appendChild(stage);
        stage.appendChild(image);
        wrapper.appendChild(controls);
        controls.appendChild(zoomOutButton);
        controls.appendChild(zoomLevel);
        controls.appendChild(zoomInButton);

        let currentScale = 1;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let startScrollLeft = 0;
        let startScrollTop = 0;

        function canPan() {
            return currentScale > minScale &&
                (stage.scrollWidth > stage.clientWidth || stage.scrollHeight > stage.clientHeight);
        }

        function stopDragging(event) {
            if (!isDragging) {
                return;
            }

            isDragging = false;
            stage.classList.remove('is-dragging');

            if (event && stage.hasPointerCapture(event.pointerId)) {
                stage.releasePointerCapture(event.pointerId);
            }
        }

        function updateZoom() {
            image.style.width = (currentScale * 100) + '%';
            zoomLevel.textContent = Math.round(currentScale * 100) + '%';
            zoomOutButton.disabled = currentScale <= minScale;
            zoomInButton.disabled = currentScale >= maxScale;
            stage.classList.toggle('is-zoomed', currentScale > minScale);

            if (currentScale <= minScale) {
                stopDragging();
                stage.scrollLeft = 0;
                stage.scrollTop = 0;
            }
        }

        function changeZoom(delta) {
            const nextScale = clampScale(currentScale + delta);
            if (nextScale === currentScale) {
                return;
            }

            currentScale = nextScale;
            updateZoom();
        }

        zoomInButton.addEventListener('click', function () {
            changeZoom(scaleStep);
        });

        zoomOutButton.addEventListener('click', function () {
            changeZoom(-scaleStep);
        });

        stage.addEventListener('wheel', function (event) {
            if (!event.ctrlKey && !event.metaKey) {
                return;
            }

            event.preventDefault();
            changeZoom(event.deltaY < 0 ? scaleStep : -scaleStep);
        }, { passive: false });

        stage.addEventListener('pointerdown', function (event) {
            if (!canPan() || (event.pointerType === 'mouse' && event.button !== 0)) {
                return;
            }

            event.preventDefault();
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;
            startScrollLeft = stage.scrollLeft;
            startScrollTop = stage.scrollTop;
            stage.classList.add('is-dragging');
            stage.setPointerCapture(event.pointerId);
        });

        stage.addEventListener('pointermove', function (event) {
            if (!isDragging) {
                return;
            }

            event.preventDefault();
            stage.scrollLeft = startScrollLeft - (event.clientX - startX);
            stage.scrollTop = startScrollTop - (event.clientY - startY);
        });

        stage.addEventListener('pointerup', stopDragging);
        stage.addEventListener('pointercancel', stopDragging);

        updateZoom();
    });
}());
