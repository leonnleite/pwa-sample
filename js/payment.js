if(window.PaymentRequest) {
    $('#payment-content').show();

    $('#pay').click(function(e) {
        let moneyValue = $('#how-much').val();
        if (moneyValue == 0) {
            alert('tá de sacanagem? tem que ser pelo menos 1 realzim');
            e.preventDefault();
            return ;
        }
        let payreq = new PaymentRequest(
            [{ supportedMethods: ['basic-card'] }],
            {
                total: {
                    label: 'Pagamento teste',
                    amount:{
                        currency: 'BRL',
                        value: moneyValue
                    }
                }
            },
            {}
        );

        payreq.show().then(() => {
            alert('Pagou de mentirinha');
        }).catch(function(){
            alert('Ixi, problemas com a Payment Request API', 4000);
        });

    })
}