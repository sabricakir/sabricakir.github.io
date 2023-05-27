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
};


var switchButton = document.getElementById('toggleB');

switchButton.addEventListener('click', function(){
  var lightIcons = document.querySelectorAll('.light-icon');
  var darkIcons = document.querySelectorAll('.dark-icon');
  var lightTexts = document.querySelectorAll('.text-black');
  var lightHeaderTexts = document.querySelectorAll('.text-black-header');
  for(var i=0; i<lightIcons.length; i++){
    lightIcons[i].classList.toggle('hidden');
    darkIcons[i].classList.toggle('hidden');
  }
  for(var i=0; i<lightTexts.length; i++){
    lightTexts[i].classList.toggle('text-slate-100');
  }
  for(var i=0; i<lightHeaderTexts.length; i++){
    lightHeaderTexts[i].classList.toggle('text-[#04aa6d]');
  }
  document.body.classList.toggle('bg-slate-700');
})