// create a flight component
var AboutMeBtn = flight.component(aboutMe);

// component definition
function aboutMe () {
  // event listener for the click event
  this.onAboutMeBtnClick = function () {
    alert('Button clicked!');
  };

  // after the component has been initialized, attched the event listener
  this.after('initialize', function () {
    this.on('click', this.onAboutMeBtnClick);
  });
}

// attach the component to the DOM node with id - aboutMeBtn
AboutMeBtn.attachTo('#aboutMeBtn');
