if ('orientation' in screen) {
  $('#screen-orientation-content').show();
  let _ = document.getElementById.bind(document);

  let orientKey = 'orientation';
  if ('mozOrientation' in screen) {
    orientKey = 'mozOrientation';
  } else if ('msOrientation' in screen) {
    orientKey = 'msOrientation';
  }

  let target = _('logTargetScreen');
  let device = _('deviceScreen');
  let orientationTypeLabel = _('orientationScreenType');

  function logChange (event) {
    let timeBadge = new Date().toTimeString().split(' ')[0];
    let newState = document.createElement('p');
    newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + event + '.';
    target.appendChild(newState);
  }

  if (screen[orientKey]) {
    function update() {
      let type = screen[orientKey].type || screen[orientKey];
      orientationTypeLabel.innerHTML = type;

      let landscape = type.indexOf('landscape') !== -1;

      if (landscape) {
        device.style.width = '180px';
        device.style.height = '100px';
      } else {
        device.style.width = '100px';
        device.style.height = '180px';
      }

      let rotate = type.indexOf('secondary') === -1 ? 0 : 180;
      let rotateStr = 'rotate(' + rotate + 'deg)';

      device.style.webkitTransform = rotateStr;
      device.style.MozTransform = rotateStr;
      device.style.transform = rotateStr;
    }

    update();

    let onOrientationChange = null;

    if ('onchange' in screen[orientKey]) { // newer API
      onOrientationChange = function () {
        logChange('Orientação alterada para <b>' + screen[orientKey].type + '</b>');
        update();
      };

      screen[orientKey].addEventListener('change', onOrientationChange);
    } else if ('onorientationchange' in screen) { // older API
      onOrientationChange = function () {
        logChange('Orientação alterada para <b>' + screen[orientKey] + '</b>');
        update();
      };

      screen.addEventListener('orientationchange', onOrientationChange);
    }

    // browsers require full screen mode in order to obtain the orientation lock
    let goFullScreen = null;
    let exitFullScreen = null;
    if ('requestFullscreen' in document.documentElement) {
      goFullScreen = 'requestFullscreen';
      exitFullScreen = 'exitFullscreen';
    } else if ('mozRequestFullScreen' in document.documentElement) {
      goFullScreen = 'mozRequestFullScreen';
      exitFullScreen = 'mozCancelFullScreen';
    } else if ('webkitRequestFullscreen' in document.documentElement) {
      goFullScreen = 'webkitRequestFullscreen';
      exitFullScreen = 'webkitExitFullscreen';
    } else if ('msRequestFullscreen') {
      goFullScreen = 'msRequestFullscreen';
      exitFullScreen = 'msExitFullscreen';
    }

    _('lockScreen').addEventListener('click', function () {
      document.documentElement[goFullScreen] && document.documentElement[goFullScreen]();

      let promise = null;
      if (screen[orientKey].lock) {
        promise = screen[orientKey].lock(screen[orientKey].type);
      } else {
        promise = screen.orientationLock(screen[orientKey]);
      }

      promise
        .then(function () {
          logChange('Screen bloqueado');
          _('unlockScreen').style.display = 'block';
          _('lockScreen').style.display = 'none';
        })
        .catch(function (err) {
          logChange('Não foi possivel bloquear a tela: ' + err);
          document[exitFullScreen] && document[exitFullScreen]();
        });
    });

    _('unlockScreen').addEventListener('click', function () {
      document[exitFullScreen] && document[exitFullScreen]();

      if (screen[orientKey].unlock) {
        screen[orientKey].unlock();
      } else {
        screen.orientationUnlock();
      }

      logChange('Screen lock removed.');
      _('unlockScreen').style.display = 'none';
      _('lockScreen').style.display = 'block';
    });
  }
}