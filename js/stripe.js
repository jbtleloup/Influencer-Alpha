

function stripe_test() {
    jQuery.ajax({
        type: "POST",
        url: 'stripe.php',
        dataType: 'json',
        data: {payment: 'add', arguments: [1, 2]},

        success: function (obj, textstatus) {
            console.log("suc");
            if (!('error' in obj)) {
                let id = obj.result;
                let stripe = Stripe('pk_test_aTtzhhZ0KO2SvRBHj6ctlmrK00PShqoQei');
                console.log(id);
                stripe.redirectToCheckout({
                    // Make the id field from the Checkout Session creation API response
                    // available to this file, so you can provide it as parameter here
                    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                    sessionId: id
                }).then(function (result) {
                    // If `redirectToCheckout` fails due to a browser or network
                    // error, display the localized error message to your customer
                    // using `result.error.message`.
                    console.log(result.error.message)
                });
            } else {
                console.log(obj.error);

            }
        },
        error: function (obj, text, re) {
            console.log(obj, text, re);
            console.warn(obj.responseText);
        }
    });

}