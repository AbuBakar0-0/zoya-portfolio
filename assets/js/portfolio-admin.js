"use strict";

(function() {
    const defaultProjects = [{
            id: "halo",
            title: "HALO",
            summary: "Seizure Monitor and Early Alert System",
            category: "Research, UX/UI Design, Prototyping",
            href: "halo.html",
            imageSrc: "media/thumbnails/halo.png",
            imageAlt: "Halo project thumbnail",
            heroImageSrc: "media/halo/halo-app-mockup.png",
            role: "UX/UI Design, Interaction Design, Research",
            timeline: "Concept project",
            tools: "Figma",
            overview: "HALO explores a wearable concept that helps monitor seizure activity and provide earlier alerts for users and caregivers.",
            challenge: "The challenge was designing for a high-stakes health context while working within speculative future technology.",
            solution: "The concept combines wearable hardware, monitoring interfaces, and a notification flow built around clarity and trust."
        },
        {
            id: "snooze",
            title: "Snooze",
            summary: "Sleep Correction and Smart Alarm App",
            category: "Research, UX/UI Design",
            href: "snooze.html",
            imageSrc: "media/thumbnails/snooze.png",
            imageAlt: "Snooze App UI Mockup",
            heroImageSrc: "media/snooze/snooze-heroshot.png",
            role: "UX/UI Design, Prototyping, User Research",
            timeline: "Personal project",
            tools: "Figma",
            overview: "Snooze is a sleep-focused mobile concept that helps users build healthier routines and wake up more intentionally.",
            challenge: "The main challenge was making sleep data useful without overwhelming users with technical information.",
            solution: "The design emphasizes onboarding, guided habits, and a cleaner alarm flow supported by focused visual hierarchy."
        },
        {
            id: "fit2b",
            title: "Fit2B",
            summary: "Asthma and Weight Tracker",
            category: "UX/UI Design Internship @ UT Austin",
            href: "fit2b.html",
            imageSrc: "media/thumbnails/fit2b.png",
            imageAlt: "Fit2B Splash Screen",
            heroImageSrc: "media/fit2b/fit2b-header.png",
            role: "UX/UI Design, Gamification, Brand Identity",
            timeline: "Jan - June 2022",
            tools: "Figma, Adobe Illustrator",
            overview: "Fit2B combines fitness tracking, asthma support, and playful progress cues into a more motivating health experience.",
            challenge: "The challenge was balancing medical responsibility with a lighter, more encouraging product tone.",
            solution: "The final direction used stronger branding, progress mechanics, and clearer interface structure to support repeat engagement."
        },
        {
            id: "afterglow-mag",
            title: "Afterglow: Print Magazine",
            summary: "Editorial concept and print direction",
            category: "Creative Directing, Editorial Design",
            href: "afterglow-mag.html",
            imageSrc: "media/thumbnails/magcover.png",
            imageAlt: "Afterglow Magazine Issue 01 Cover",
            heroImageSrc: "media/magazine/magcover.png",
            role: "Creative Direction, Editorial Design",
            timeline: "Self-initiated",
            tools: "Adobe InDesign, Photoshop",
            overview: "This project explores a print-first editorial identity with expressive layouts, photography, and typography.",
            challenge: "The work needed to feel visually distinct while still maintaining coherence across multiple spreads and stories.",
            solution: "A tighter art direction system and recurring graphic language gave the magazine a stronger editorial voice."
        },
        {
            id: "afterglow",
            title: "Afterglow",
            summary: "Brand identity system",
            category: "Brand Identity",
            href: "afterglow.html",
            imageSrc: "media/thumbnails/afterglow.png",
            imageAlt: "Afterglow logo",
            heroImageSrc: "media/afterglow/afterglow-splashscreen.png",
            role: "Brand Identity, Visual Design",
            timeline: "Self-initiated",
            tools: "Adobe Illustrator, Photoshop",
            overview: "Afterglow is a brand identity exploration built around mood, typography, color, and graphic flexibility.",
            challenge: "The identity needed enough range to stretch across digital, merchandise, and social applications.",
            solution: "The system uses a distinctive wordmark, supporting marks, and a flexible color and asset language."
        },
        {
            id: "100daysui",
            title: "100 Days of UI",
            summary: "Daily UI challenge work",
            category: "UI Design",
            href: "100daysUI.html",
            imageSrc: "media/thumbnails/dailyUI.png",
            imageAlt: "Collage of the 100 Days of UI Challenge",
            heroImageSrc: "media/100daysUI/daily-ui-header.png",
            role: "UI Design",
            timeline: "100 days",
            tools: "Figma",
            overview: "This challenge was a fast-paced way to explore new visual directions and interface patterns through repetition.",
            challenge: "The constraint was maintaining consistency while still making each prompt feel distinct.",
            solution: "The result is a broad set of interface experiments spanning landing pages, error states, and media experiences."
        }
    ];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function renderProjectCard(project) {
        return `
            <a href="${escapeHtml(project.href)}">
                <div class="works-item">
                    <img src="${escapeHtml(project.imageSrc)}" alt="${escapeHtml(project.imageAlt)}">
                    <div class="works-item-overlay">
                        <div class="works-item-info">
                            <h3 class="works-info-title">${escapeHtml(project.title)}</h3>
                            <p class="works-info-category">${escapeHtml(project.category)}</p>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    function renderPortfolioGrid() {
        const grid = document.getElementById("portfolio-grid");
        if (!grid) {
            return;
        }

        grid.innerHTML = defaultProjects.map(renderProjectCard).join("") + '<div class="clearfix"></div>';
    }

    document.addEventListener("DOMContentLoaded", function() {
        renderPortfolioGrid();
    });
})();
