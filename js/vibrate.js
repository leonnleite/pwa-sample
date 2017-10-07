if ('vibrate' in navigator) {
    $('#vibrate-content').show();

    $('#vibrate-short').click(function () {
        navigator.vibrate(200);
    });

    $('#vibrate-pattern').click(function () {
        navigator.vibrate([100, 200, 200, 200, 500]);
    })
}