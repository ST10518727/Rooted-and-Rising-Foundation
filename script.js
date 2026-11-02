"use strict";

/* ==================================================================================
   ROOTED AND RISING FOUNDATION
   Main JavaScript file for the Rooted and Rising Foundation website.
   This file contains the JavaScript code that handles the functionality of the website,
   including form validation, event handling, and other interactive features.
   ================================================================================== */

   //Run JavaScript after the HTML has loaded. 
   document.addEventListener("DOMContentLoaded", () => {

    //===================================================================================
    // 1. MOBILE NAVIGATION MENU
    //===================================================================================

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links"); 

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = 
               navigation.classList.toggle("active"); 

            menuButton.setAttribute(
                "aria-expanded", 
                String(isOpen)
            );
        }); 
        
        //Close the mobile menu after selecting a link. 
        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuButton.setAttribute(
                    "aria-expanded", 
                    "false"
                );
            });
        });
    }

    //===================================================================================
    // 2. FAQ ACCORDION FUNCTIONALITY
    //===================================================================================

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            
            if (!answer) return; 

            const isOpen = 
                question.getAttribute("aria-expanded") === "true";

            //Close all other FAQ answers. 
            faqQuestions.forEach(otherQuestion => {
                otherQuestion.setAttribute(
                    "aria-expanded", 
                    "false"
                );
                
                const otherAnswer =
                    otherQuestion.nextElementSibling;

                if (otherAnswer) {
                    otherAnswer.hidden = true; 
                }
            });

            //Open the selected answer. 
            if (!isOpen) {
                question.setAttribute(
                    "aria-expanded",
                    "true"
                );
                answer.hidden = false; 
            }
        });
    });

    //===================================================================================
    // 3. DONATION AMOUNT SELECTOR 
    //===================================================================================

    const donationButtons =
        document.querySelectorAll("[data-donation]");

    const donationInput = 
        document.querySelector("#donation-amount");

    const donationForm =
        document.querySelector("#donation-form");

    donationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const amount = Number(
                button.dataset.donation
            );
            
            if (!Number.isFinite(amount) || amount <= 0) {
                return; 
            }

            //Put the selected amount in the input. 
            if (donationInput) {
                donationInput.value = amount; 
            }

            //Highlight the selected amount. 
            donationButtons.forEach(item => {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");
        }); 
    }); 

    if (donationForm) {
        donationForm.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const amount = Number(
                donationInput?.value
            );

            if (!Number.isFinite(amount) || amount <= 0) {
                alert("Please enter a valid donation amount.");
                donationInput?.focus();
                return; 
            }

            alert(
                `Thank you for choosing to donate R${amount.toFixed(2)}. ` + 
                "Please connect a secure payment service to complete your donation."
            );
        });
    }

    //==========================================================================
    // 4. CONTACT FORM VALIDATION
    //==========================================================================

    const contactForm =
        document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return; 
            }

            //This confirm the front-end form is valid. 
            //A server or form service is needed to send the message. 
            alert( 
                "Thank you for contacting Rooted and Rising Foundation. " +
                "Your form is valid, but a submission service must be " + 
                "connected to send your message." 
            ); 

            contactForm.reset(); 
        });
    }

    //===================================================================================
    // 5. ENQUIRY FORM VALIDATION
    //===================================================================================   


    //===================================================================================
    // 6. VOLUNTEER FORM VALIDATION
    //===================================================================================

    const volunteerForm =
        document.querySelector("#volunteer-form");

    if (volunteerForm) {
        volunteerForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!volunteerForm.checkValidity()) {
                volunteerForm.reportValidity();
                return; 
            }

            alert(
                "Thank you for your interest in volunteering with Rooted and Rising Foundation. " +
                "Your form is valid. Connect a backend service " + 
                "to recieve and store applications." 
            );

            volunteerForm.reset();
        });
    }

    //===================================================================================
    // 7. NEWS AND EVENTS SEARCH 
    //===================================================================================

    const searchInput = 
        document.querySelector("#news-search"); 

    const categoryFilter = 
        document.querySelector("#category-filter");

    const sortSelect = 
        document.querySelector("#sort-events");

    const eventsContainer = 
        document.querySelector("#events-container");

    if (eventsContainer) {
        const events = Array.from(
            eventsContainer.querySelectorAll(".event-card")
        );

        function filterAndSortEvents() {
            const searchTerm = 
                searchInput?.value.trim().toLowerCase() || "";

            const selectedCategory = 
                categoryFilter?.value || "all";

            const sortOrder =
                sortSelect?.value || "default";

            //Show cards matching the search and category.
            eventCards.forEach(card => {
                const text = card.textContent.toLowerCase();

                const category = 
                    card.dataset.category || "";

                const matchesSearch =
                    text.includes(searchTerm);

                const matchesCategory =
                    selectedCategory === "all" || 
                    category === selectedCategory;

                card.hidden = !(
                    matchesSearch && matchesCategory
                );
            });

            //Sort cards by date if requested. 
            if (sortOrder !== "default") {
                const sortedCards = [...eventCards].sort(
                    (a, b) => {
                    const dateA = Date.parse(a.dataset.date);
                    const dateB = Date.parse(b.dataset.date);

                    if (
                        !Number.isFinite(dateA) ||
                        !Number.isFinite(dateB)
                    ) {
                        return 0; 
                    }

                    return sortOrder === "newest"
                        ? dateA - dateB
                        : dateB - dateA;
                    }
                );

                sortedCards.forEach(card => {
                    eventsContainer.appendChild(card);
                }); 
            }
        }

        searchInput?.addEventListener(
            "input", 
            filterAndSortEvents
        );

        categoryFilter?.addEventListener(
            "change", 
            filterAndSortEvents
        );

        sortSelect?.addEventListener(
            "change", 
            filterAndSortEvents
        );
    }

    //===================================================================================
    // 8. CURRENT YEAR IN FOOTER
    //===================================================================================

    const yearElement =
        document.querySelector("#current-year"); 

    if (yearElement) {
        yearElement.textContent = 
            new Date().getFullYear();
    }

    //===================================================================================
    // 9. SCROLL TO TOP BUTTON
    //===================================================================================

    const topButton = 
        document.querySelector("#back-to-top");

    if (topButton) {
        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

}); 
// Function to display the current date and time
function updateDateTime() {
    const now = new Date();

    // Format the date
    const date = now.toLocaleDateString("en-ZA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Format the time
    const time = now.toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    // Display the date and time on the webpage
    document.getElementById("current-date").textContent = date;
    document.getElementById("current-time").textContent = time;
}

// Display immediately when the page loads
updateDateTime();

// Update the time every second
setInterval(updateDateTime, 1000);