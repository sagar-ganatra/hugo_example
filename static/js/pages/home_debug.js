var AboutMeBtn = flight.component(aboutMe);

function aboutMe () {
  this.onAboutMeBtnClick = function () {
    alert('About me');
  };

  this.after('initialize', function () {
    this.on('click', this.onAboutMeBtnClick);
  });
}

AboutMeBtn.attachTo('#aboutMeBtn')
