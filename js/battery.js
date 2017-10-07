if ('getBattery' in navigator) {
    $('#battery-content').show();
    navigator.getBattery().then(battery => {
        $('#qt-battery').html((battery.level * 100).toFixed());
        $('#status-battery').html( battery.charging ? 'está carregando': 'não está carregando');

        battery.addEventListener('levelchange', () => {
            $('#qt-battery').html((battery.level * 100).toFixed());
        }, false);

        battery.addEventListener('chargingchange', () => {
            $('#status-battery').html( battery.charging ? 'está carregando': 'não está carregando');

        }, false)
    });
    }
