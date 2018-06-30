var _ = document.querySelector.bind(document);
var __ = function (selector) {
  return [].slice.call(document.querySelectorAll(selector), 0);
};
let target = _('#logTarget');

function logChange (event) {
  let timeBadge = new Date().toTimeString().split(' ')[0];
  let newState = document.createElement('p');
  newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + event + '.';
  target.appendChild(newState);
}

let prefix = null;
if ('requestFullscreen' in document.documentElement) {
  prefix = 'fullscreen';
} else if ('mozRequestFullScreen' in document.documentElement) {
  prefix = 'mozFullScreen';
} else if ('webkitRequestFullscreen' in document.documentElement) {
  prefix = 'webkitFullscreen';
} else if ('msRequestFullscreen') {
  prefix = 'msFullscreen';
}


let onFullscreenHandler = function (started) {
  _('#exitFullscreen').style.display = started ? 'inline-block' : 'none';

};

let onFullscreenChange = function () {
  let elementName = 'not set';
  if (document[prefix + 'Element']) {
    elementName = document[prefix + 'Element'].nodeName;
  }
  logChange('Fullscreen no elemento <b>' + elementName + '</b>');
  onFullscreenHandler(!!document[prefix + 'Element']);
};

if (document[prefix + 'Enabled']) {
  $('#fullscreen-content').show();

  document.addEventListener(prefix.toLowerCase() + 'change', onFullscreenChange);

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

  let goFullscreenHandler = function (element) {
    return function () {
      let maybePromise = element[goFullScreen]();
      if (maybePromise && maybePromise.catch) {
        maybePromise.catch(function (err) {
          logChange('Cannot acquire fullscreen mode: ' + err);
        });
      }
    };
  };

  _('#startFullscreen').addEventListener('click', goFullscreenHandler(document.documentElement));
  _('#startFullscreenBox').addEventListener('click', goFullscreenHandler(_('#fullscreenBox')));

  _('#exitFullscreen').addEventListener('click', function () {
    document[exitFullScreen]();
  });
}