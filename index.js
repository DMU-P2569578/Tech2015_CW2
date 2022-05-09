/*Index Slider*/

/*Setting the data and variables to later be used/called on every element and object*/
var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
/* Setting function variable/data.
slide () specifying what slide refers to*/
function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      /*distance sliders need to move*/
      threshold = 100,
      /*identifying/calling the images/slides*/
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;

  /*slide to be cloned, to create the "optical impresion" of "infinite" slider*/
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  /*The loaded tells the browser when to add the clones*/
  wrapper.classList.add('loaded');

  /* Mouse events definition*/
  items.onmousedown = dragStart;

  /* Touch events definition*/
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  /*Click events definition*/
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });

  /*Transition events definition*/
  items.addEventListener('transitionend', checkIndex);

/*Starting the commands to be applied when called.
The function drag envolves (and translates to) both touch and onmouse ev. as it is called when those events are activated.
Here we telling the browser how to "move" (position of slide) depending on the action.
*/
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }

  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }
/*onmouse up and move are set to not to work as they do not have any function for the slider to "end" as the slider must be cloned*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  /*Function to move the slides*/

  function shiftSlide(dir, action) {
    /*shifting is directly added to css and animated*/
    items.classList.add('shifting');
/*telling the browser how to move based on the action and prior movements*/
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    };

    allowShift = true;
  }

  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);
