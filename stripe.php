<?php

use Stripe\Stripe;

require "vendor/autoload.php";

header('Content-type: application json');
$aResult = array();

if( !isset($_POST['payment']) ) { $aResult['error'] = 'No function name!'; }

if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

if( !isset($aResult['error']) ) {

    switch($_POST['payment']) {
        case 'add':
            if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                $aResult['error'] = 'Error in arguments!';
            }
            else {
                \Stripe\Stripe::setApiKey('sk_test_KGtjTce2193poRx0H39CfnT500dvDXosHQ');

                $session = \Stripe\Checkout\Session::create([
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'name' => 'T-shirt',
                        'description' => 'Comfortable cotton t-shirt',
                        'images' => ['https://example.com/t-shirt.png'],
                        'amount' => 500,
                        'currency' => 'usd',
                        'quantity' => 1,
                    ]],
                    'success_url' => 'http://localhost:63342/testWAMPP/success.html?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => 'http://localhost:63342/testWAMPP/index.html',
                ]);
                $aResult['result'] = $session['id'];
            }
            break;

        default:
            $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
            break;
    }

}

echo json_encode($aResult);