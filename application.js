var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);

  this.userTheme = localStorage.getItem("theme");
  this.systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  this.themeCheck();
}

function themeCheck() {
  if(this.userTheme === "dark" || (!this.userTheme && this.systemTheme)) {
    setDarkTheme();
  }
  else {
    setLightTheme();
  }
}

function setDarkTheme() {
  var lightIcons = document.querySelectorAll('.light-icon');
  var darkIcons = document.querySelectorAll('.dark-icon');
  var lightTexts = document.querySelectorAll('.text-black');
  var lightHeaderTexts = document.querySelectorAll('.text-black-header');
  var switchButton = document.getElementById('toggleB');
  for(var i=0; i<lightIcons.length; i++){
    lightIcons[i].classList.add('hidden');
  }
  for(var i=0; i<darkIcons.length; i++){
    darkIcons[i].classList.remove('hidden');
  }
  for(var i=0; i<lightTexts.length; i++){
    lightTexts[i].classList.add('text-slate-100');
  }
  for(var i=0; i<lightHeaderTexts.length; i++){
    lightHeaderTexts[i].classList.add('text-[#04aa6d]');
  }
  switchButton.checked = true;
  document.body.classList.add('bg-slate-700');
}

function setLightTheme() {
  var lightIcons = document.querySelectorAll('.light-icon');
  var darkIcons = document.querySelectorAll('.dark-icon');
  var lightTexts = document.querySelectorAll('.text-black');
  var lightHeaderTexts = document.querySelectorAll('.text-black-header');
  for(var i=0; i<lightIcons.length; i++){
    lightIcons[i].classList.remove('hidden');
  }
  for(var i=0; i<darkIcons.length; i++){
    darkIcons[i].classList.add('hidden');
  }
  for(var i=0; i<lightTexts.length; i++){
    lightTexts[i].classList.remove('text-slate-100');
  }
  for(var i=0; i<lightHeaderTexts.length; i++){
    lightHeaderTexts[i].classList.remove('text-[#04aa6d]');
  }
  switchButton.checked = false;
  document.body.classList.remove('bg-slate-700');
}

function toggleTheme() {
  if(this.userTheme === "dark") {
    localStorage.setItem("theme", "light");
    this.userTheme = "light";
    setLightTheme();
  }
  else {
    localStorage.setItem("theme", "dark");
    this.userTheme = "dark";
    setDarkTheme();
  }

}

var switchButton = document.getElementById('toggleB');
switchButton.addEventListener('click', toggleTheme);