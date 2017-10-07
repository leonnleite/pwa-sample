if ('onLine' in navigator) {
    $('#online-content').show();

    function onlineStateChange(state) {
        let timeBadge = new Date().toTimeString().split(' ')[0];
        let newState = document.createElement('li');
        newState.innerHTML = '<span class="badge">' + timeBadge + '</span> Sua conexão mudou para <strong>' + state + '</strong>.';
        document.getElementById('online-content-list').appendChild(newState);
    }


    onlineStateChange(navigator.onLine ? 'online' : 'offline');

    window.addEventListener('online', function () {
        onlineStateChange('online');
    });
    window.addEventListener('offline', function () {
        onlineStateChange('offline');
    });
}