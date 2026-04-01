"use strict";

(function() {
    const STORAGE_KEY = "zoyaPortfolioProjects";
    const SESSION_KEY = "zoyaPortfolioAdminUnlocked";
    const ADMIN_PASSCODE = "zoya-admin-2026";

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

    function normalizeProject(project) {
        const normalized = {
            id: String(project.id || Date.now()),
            title: String(project.title || "").trim(),
            summary: String(project.summary || "").trim(),
            category: String(project.category || "").trim(),
            href: String(project.href || "").trim(),
            imageSrc: String(project.imageSrc || "").trim(),
            imageAlt: String(project.imageAlt || "").trim(),
            heroImageSrc: String(project.heroImageSrc || project.imageSrc || "").trim(),
            role: String(project.role || "").trim(),
            timeline: String(project.timeline || "").trim(),
            tools: String(project.tools || "").trim(),
            overview: String(project.overview || "").trim(),
            challenge: String(project.challenge || "").trim(),
            solution: String(project.solution || "").trim(),
            generatedPage: Boolean(project.generatedPage)
        };

        if (!normalized.imageAlt) {
            normalized.imageAlt = normalized.title;
        }

        if (!normalized.href) {
            normalized.href = normalized.generatedPage ? getGeneratedProjectHref(normalized.id) : "";
        }

        return normalized;
    }

    function getGeneratedProjectHref(projectId) {
        return `project.html?project=${encodeURIComponent(projectId)}`;
    }

    function parseParagraphs(text) {
        return String(text || "")
            .split(/\n\s*\n/)
            .map(paragraph => paragraph.trim())
            .filter(Boolean);
    }

    function renderParagraphs(text) {
        return parseParagraphs(text)
            .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
            .join("");
    }

    function readCustomProjects() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed
                .map(normalizeProject)
                .filter(project =>
                    project.title &&
                    project.category &&
                    project.imageSrc &&
                    project.summary &&
                    project.overview
                );
        } catch (error) {
            console.error("Could not read saved portfolio projects.", error);
            return [];
        }
    }

    function writeCustomProjects(projects) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    function getAllProjects() {
        return defaultProjects.concat(readCustomProjects());
    }

    function getProjectById(projectId) {
        return getAllProjects().find(project => project.id === projectId) || null;
    }

    function renderProjectCard(project) {
        const href = project.generatedPage ? getGeneratedProjectHref(project.id) : project.href;

        return `
            <a href="${escapeHtml(href)}">
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

        grid.innerHTML = getAllProjects().map(renderProjectCard).join("") + '<div class="clearfix"></div>';
    }

    function renderAdminList() {
        const list = document.getElementById("admin-project-list");
        const emptyState = document.getElementById("admin-empty-state");
        if (!list || !emptyState) {
            return;
        }

        const projects = readCustomProjects();
        list.innerHTML = projects.map(project => `
            <article class="admin-project-card">
                <img src="${escapeHtml(project.imageSrc)}" alt="${escapeHtml(project.imageAlt)}">
                <div class="admin-project-copy">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.category)}</p>
                    <a href="${escapeHtml(getGeneratedProjectHref(project.id))}" target="_blank" rel="noreferrer">Open generated project page</a>
                </div>
                <button type="button" class="admin-remove-button" data-project-id="${escapeHtml(project.id)}">Remove</button>
            </article>
        `).join("");

        emptyState.style.display = projects.length ? "none" : "block";
    }

    function renderGeneratedProjectPage() {
        const container = document.getElementById("generated-project-page");
        if (!container) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const projectId = params.get("project");
        const project = projectId ? getProjectById(projectId) : null;

        if (!project) {
            container.innerHTML = `
                <div class="container">
                    <div class="single-project generated-project generated-project-empty">
                        <h1>Project Not Found</h1>
                        <div class="single-project-info">
                            <p>This generated project could not be loaded in this browser.</p>
                            <p>Open the admin page, add the project again, then return here.</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        document.title = `${project.title} | Zoya Abbasi`;

        container.innerHTML = `
            <img class="header-large" src="${escapeHtml(project.heroImageSrc || project.imageSrc)}" alt="${escapeHtml(project.imageAlt)}">
            <div class="container">
                <div class="single-project generated-project">
                    <section class="new-section" id="intro">
                        <h1>${escapeHtml(project.title)}</h1>
                        <h2 class="header2">${escapeHtml(project.summary)}</h2>
                        <div class="row row-tagline generated-project-specs">
                            <div class="col l2 offset-l1 m2">
                                <ul class="specs">
                                    <li><p class="specs-title">Role:</p></li>
                                    <li><p class="specs-list">${escapeHtml(project.role || project.category)}</p></li>
                                </ul>
                            </div>
                            <div class="col l2 m2">
                                <ul class="specs">
                                    <li><p class="specs-title">Category:</p></li>
                                    <li><p class="specs-list">${escapeHtml(project.category)}</p></li>
                                </ul>
                            </div>
                            <div class="col l2 m2">
                                <ul class="specs">
                                    <li><p class="specs-title">Timeline:</p></li>
                                    <li><p class="specs-list">${escapeHtml(project.timeline || "Not provided")}</p></li>
                                </ul>
                            </div>
                            <div class="col l2 m3">
                                <ul class="specs">
                                    <li><p class="specs-title">Tools Used:</p></li>
                                    <li><p class="specs-list">${escapeHtml(project.tools || "Not provided")}</p></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section class="new-section generated-project-section">
                        <div class="single-project-info">
                            <h2>Overview</h2>
                            ${renderParagraphs(project.overview)}
                        </div>
                    </section>

                    <section class="new-section generated-project-section">
                        <div class="single-project-info">
                            <h2>Challenge</h2>
                            ${renderParagraphs(project.challenge || "No challenge section was added yet.")}
                        </div>
                    </section>

                    <section class="new-section generated-project-section">
                        <div class="single-project-info">
                            <h2>Solution</h2>
                            ${renderParagraphs(project.solution || "No solution section was added yet.")}
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    function toggleAdminState(isUnlocked) {
        const login = document.getElementById("admin-login");
        const panel = document.getElementById("admin-panel");
        const status = document.getElementById("admin-status");

        if (!login || !panel || !status) {
            return;
        }

        login.style.display = isUnlocked ? "none" : "block";
        panel.style.display = isUnlocked ? "block" : "none";
        status.textContent = isUnlocked ? "Admin unlocked" : "Enter the admin passcode";

        if (isUnlocked) {
            renderAdminList();
        }
    }

    function initAdminPage() {
        const loginForm = document.getElementById("admin-login-form");
        const projectForm = document.getElementById("admin-project-form");
        const list = document.getElementById("admin-project-list");
        const resetButton = document.getElementById("admin-clear-projects");

        if (!loginForm || !projectForm || !list || !resetButton) {
            return;
        }

        toggleAdminState(sessionStorage.getItem(SESSION_KEY) === "true");

        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const passcodeInput = document.getElementById("admin-passcode");
            const feedback = document.getElementById("admin-login-feedback");
            const isValid = passcodeInput && passcodeInput.value === ADMIN_PASSCODE;

            if (!feedback || !passcodeInput) {
                return;
            }

            if (!isValid) {
                feedback.textContent = "Incorrect passcode.";
                return;
            }

            sessionStorage.setItem(SESSION_KEY, "true");
            feedback.textContent = "";
            passcodeInput.value = "";
            toggleAdminState(true);
        });

        projectForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(projectForm);
            const projectId = `custom-${Date.now()}`;
            const project = normalizeProject({
                id: projectId,
                title: formData.get("title"),
                summary: formData.get("summary"),
                category: formData.get("category"),
                imageSrc: formData.get("imageSrc"),
                imageAlt: formData.get("imageAlt"),
                heroImageSrc: formData.get("heroImageSrc"),
                role: formData.get("role"),
                timeline: formData.get("timeline"),
                tools: formData.get("tools"),
                overview: formData.get("overview"),
                challenge: formData.get("challenge"),
                solution: formData.get("solution"),
                generatedPage: true
            });

            if (!project.title || !project.summary || !project.category || !project.imageSrc || !project.overview) {
                return;
            }

            const projects = readCustomProjects();
            projects.unshift(project);
            writeCustomProjects(projects);
            projectForm.reset();
            renderAdminList();
        });

        list.addEventListener("click", function(event) {
            const button = event.target.closest("[data-project-id]");
            if (!button) {
                return;
            }

            const projectId = button.getAttribute("data-project-id");
            const projects = readCustomProjects().filter(project => project.id !== projectId);
            writeCustomProjects(projects);
            renderAdminList();
        });

        resetButton.addEventListener("click", function() {
            localStorage.removeItem(STORAGE_KEY);
            renderAdminList();
        });
    }

    document.addEventListener("DOMContentLoaded", function() {
        renderPortfolioGrid();
        renderGeneratedProjectPage();
        initAdminPage();
    });
})();
