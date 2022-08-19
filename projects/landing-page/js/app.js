/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const navbarList = document.querySelector("#navbar__list");
const fixedHeader = document.querySelector("header.page__header");
// used to determine the direction of scrolling
let direction = 'up';
let prevYPosition = 0;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// compares two value of the scrollTop to set the direction in the variable direcdirectioniton
function setScrollDirection() {
    if (document.body.scrollTop > prevYPosition) {
        direction = 'down'
    } else {
        direction = 'up'
    }

    prevYPosition = document.body.scrollTop
}

// adds active class to the target section and removes it from the others
function setActiveClass(target) {
    sections.forEach(section => {
        section.classList.remove("your-active-class");
    })
    target.classList.add("your-active-class");
}

// due to observer functionality the active section is wrong when scrolling down
// to fix it when scrolling down we check if there is a sibling element next to it 
// and choose it, if scrolling up it returns the target as usual
function getTargetSection(target) {
    if (direction === 'up') return target

    if (target.nextElementSibling) {
        return target.nextElementSibling
    } else {
        return target
    }
}

function shouldUpdate(entry) {

    // the fix for the selecting element now when the element is entering we would 
    // add the class
    if (direction === 'down' && !entry.isIntersecting) {
        return true
    }


    // if we scroll up and element is in view should have the class
    // ( Normal Behavior)
    if (direction === 'up' && entry.isIntersecting) {
        return true
    }

    return false;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const frag = document.createDocumentFragment();
for (let section of sections) {
    const linkText = section.dataset.nav; 
    
    const navItem = document.createElement("li");
    const navLink = document.createElement("a");
    navLink.textContent = linkText;
    navLink.classList.add("menu__link");
    navLink.setAttribute("href", "#" + section.attributes.id.value)

    navItem.appendChild(navLink);
    frag.appendChild(navItem);
}
navbarList.appendChild(frag);

// Add class 'active' to section when near top of viewport

// option that determine when the observer will detect the section
const observerOptions = {
    // remove the height of the fixed header
    rootMargin: `${(fixedHeader.offsetHeight * -1)}px`,
    threshold: 0
};

// main intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        // set the scroll direction
        setScrollDirection();

        // if the element is intersecting and the right scroll direction add the class
        if (!shouldUpdate(entry)) return;

        // gets the right element to update
        const target = getTargetSection(entry.target);

        // add class to target section and remove from others
        setActiveClass(target);
    })
}, observerOptions);


// hook the observer to each section
sections.forEach(section => {
    observer.observe(section);
})


// Scroll to anchor ID using built-in functionality
document.documentElement.style.scrollBehavior = "smooth";


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


