if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
    $('#mic-content').show();

    $('#permission-mic').click(function() {

        var constraints = {audio: true};
        var chunks = [];

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                $('#mic-has-no-permission').hide();
                $('#mic-has-permission').show();
                let mediaRecorder = new MediaRecorder(stream);

                console.log(stream);
                let record = $('#mic')[0];
                record.onclick = function () {
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                    console.log("recorder started");
                    $('#mic').hide();
                    $('#stop').show();
                };

                let stop = $('#stop')[0];
                stop.onclick = function () {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("recorder stopped");
                    record.style.display = "";
                    record.style.color = "";
                    $('#stop').hide();
                    $('#mic').show();
                };

                mediaRecorder.onstop = function (e) {
                    console.log("data available after MediaRecorder.stop() called.");

                    let clipContainer = document.createElement('article');
                    let audio = document.createElement('audio');
                    let deleteButton = document.createElement('button');
                    deleteButton.setAttribute('class', 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored');
                    let downloadButton = document.createElement('a');
                    downloadButton.setAttribute('class', 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored');

                    clipContainer.classList.add('clip');
                    audio.setAttribute('controls', '');
                    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
                    downloadButton.innerHTML = '<i class="material-icons">file_download</i>';

                    let soundClips = $('#sound-clips')[0];
                    clipContainer.appendChild(audio);
                    clipContainer.appendChild(downloadButton);
                    clipContainer.appendChild(deleteButton);
                    soundClips.appendChild(clipContainer);

                    audio.controls = true;
                    let blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
                    chunks = [];
                    let audioURL = URL.createObjectURL(blob);
                    audio.src = audioURL;
                    console.log("recorder stopped");

                    deleteButton.onclick = function (e) {
                        evtTgt = e.target;
                        $(evtTgt).parents('article').remove();
                    };
                    downloadButton.href = audioURL;
                    downloadButton.download = 'audio.ogg';
                    downloadButton.target = '_blank';
                };

                mediaRecorder.ondataavailable = function (e) {
                    chunks.push(e.data);
                }
            })
            .catch(function (err) {
                console.log('The following error occurred: ' + err);
            })
    });
}