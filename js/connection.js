if ('connection' in navigator) {
    $('#connection-content').show();

    $('#connection-effetive-type').html(navigator.connection.effectiveType);
    navigator.connection.addEventListener('change', function () {
        $('#connection-effetive-type').html(navigator.connection.effectiveType);
    });

}