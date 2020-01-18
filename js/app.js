"use strict";  //-use strict to prevent missed typed variable names from causing problems

/**
 * Define Global Variables
 * 
*/
let activeSection = 'section1';
const activeClassName = 'your-active-class';

//Check to make sure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    const navList = getNavList();

    buildNavBar(navList);
    setSectionActiveInViewPort(navList);

    document.addEventListener('scroll', () => {
        setTimeout(setSectionActiveInViewPort(navList), 100);
    });

});
/**************************************************************** 
*** Sets the Section to Active using a CSS class when in ViewPort
***
*****************************************************************/
function setSectionActiveInViewPort(navList) {

    for (const [id, text] of Object.entries(navList)) {
        const section = document.querySelector('#'+id);
        if (isInViewport(section.querySelector('h2'))) {
            removeActiveClass();
            setActiveClass(section, id);
            break;
        }
    } 

}
/**************************************************************** 
*** Checks to see if an element is within the ViewPort
***
*****************************************************************/
function isInViewport(elem) {
    
    const bounding = elem.getBoundingClientRect();

    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const verticalInView = (bounding.top <= windowHeight) && ((bounding.top + bounding.height) >= 0);
    const horizontalInView = (bounding.left <= windowWidth) && ((bounding.left + bounding.width) >= 0);

    return (verticalInView && horizontalInView);
}

/**************************************************************** 
*** Builds the Nav Bar Dynamically based on Section within the Page
***
*****************************************************************/
function buildNavBar(navList) {

    const fragment = document.createDocumentFragment();

    for (const [id, text] of Object.entries(navList)) {
        const newListElement = document.createElement('li');
        newListElement.setAttribute('id', id+'__nav');
        newListElement.setAttribute('class', 'menu__link');
        newListElement.textContent = text;
        newListElement.addEventListener('click', navToSelection.bind(this, id));
        fragment.appendChild(newListElement);
    }

    document.querySelector('#navbar__list').appendChild(fragment);

}
//----------------------------------------------------------------
function getNavList() {

    const sections = document.querySelectorAll('section');
    let navArray = [];

    for (const section of sections) {
        navArray[section.getAttribute('id')] = (section.getAttribute('data-nav'));
    }

    return navArray;
}
//----------------------------------------------------------------------
function navToSelection(sectionId) {

    const sectionElement = document.querySelector('#'+sectionId);

    removeActiveClass();
    setActiveClass(sectionElement, sectionId);
    sectionElement.scrollIntoView({behavior: 'smooth'});

}
//--------------------------------------------------------------------
function removeActiveClass() {

    const oldActiveSection = document.querySelector('#'+activeSection);
    oldActiveSection.classList.remove(activeClassName);

}
//---------------------------------------------------------------------
function setActiveClass(element, sectionId) {

    activeSection = sectionId;
    element.classList.add(activeClassName);
}
