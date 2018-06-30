if ('DeviceOrientationEvent' in window) {
  $('#device-orientation-content').show();
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
}

function deviceOrientationHandler (eventData) {
  let tiltLR = eventData.gamma;
  let tiltFB = eventData.beta;
  let dir = eventData.alpha;

  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);

  let logo = document.getElementById("imageLogo");
  logo.style.webkitTransform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
  logo.style.MozTransform = "rotate(" + tiltLR + "deg)";
  logo.style.transform = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB * -1) + "deg)";
}