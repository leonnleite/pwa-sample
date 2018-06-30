if ('Notification' in window) {
    $('#local-notification-content').show();

    $('#local-notification-permission').click(requestPermission);

    $('#local-notification-notify').click(notifyMe);
    function requestPermission() {
        if (Notification.permission === 'granted') {
            $('#local-notification-permission').hide();
            $('#local-notification-notify').show();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    $('#local-notification-permission').hide();
                    $('#local-notification-notify').show();
                }
            });
        }
    }

    function notifyMe() {
        let iconNumber = $('input[name="icon-local-notification"]:checked').val();
        let title = $('#local-notification-title').val();
        let body = $('#local-notification-body').val();

        new Notification(title, {
            icon: window.location.href + 'images/icone-0' + iconNumber + '.png',
            body: body
        })
    }
}