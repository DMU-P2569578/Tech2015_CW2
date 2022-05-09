/*Name script. This script displays the username texted in the navbar from Toon home.html
eventlistener load (when page is loaded)*/
window.addEventListener('load', () => {
  /*const identifies an individually element. cannot be reasigned
  parameters in this case are used to get the variable  from the form */
  const params = (new URL(document.location)).searchParams;
  /*getting the data provided in the form*/
    const name = params.get('name');

/*displaying the data in the place where id "result-name" is placed*/
    document.getElementById('result-name').innerHTML = name;


})




/*Navbar/Hamburger menu.
const identifies the element.set to 0 to be hidden.
eventlistent commands that when toggleButton is cliked, the menu will be activated*/

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})



/*Modal window

More than one code is needed to target each individual object(the movies)*/

/*Show pop up
display block to be shown*/

showJujutsu = () => {
  document.getElementById("popupJujutsu").style.display = "block";
};

/*hide pop up
display to none to appear "invisible"*/

hideJujutsu = () => {
  document.getElementById("popupJujutsu").style.display = "none";
};
/*event listener to call the commands*/
document
  .getElementById("infoJujutsu")
  .addEventListener("click", showJujutsu);

document
          .getElementById("CloseBtn")
  .addEventListener("click", hideJujutsu);




  /*Toon slider*/
  /*Slide position set to 0, original position of the slide.*/
let slidePosition = 0;
const slides = document.getElementsByClassName('carousel_item');
/*All the carousel equals to the sum of each slide lenght*/
const totalSlides = slides.length;

/*Next and Prev buttons functions move to pre/next slide*/
document.
getElementById('next')
  .addEventListener("click", function() {
    moveToNextSlide();
  });

document.
getElementById('prev')
  .addEventListener("click", function() {
    moveToPrevSlide();
  });


/*Slides are updated to be hidden or included by removing or adding the visible slide or viceversa*/
function updateSlidePosition() {
  /*let referes to slide variable/data*/
  for (let slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }

  slides[slidePosition].classList.add('carousel_item--visible');
}

function moveToNextSlide() {
  /*The amount of images must be specified with sums and subtractions the order of the images*/
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    /*++ to move "up" to the next starting from the position 0*/
    slidePosition++;
  }
  /*Applying the update function */

  updateSlidePosition();
}
/*-- to move "up" to the previous starting from the position 0*/
function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
/*Applying the update function */
  updateSlidePosition();
}
