import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toastNotify } from '../../../Helper';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
      redirect:"if_required" // will not redirect because of this flag!!!!!!!!!!!!!!!!!!!!************
    });

    if (result.error) {
      toastNotify("An unexpected error occured", "error")
      setIsProcessing(true);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(result);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div>
        <button className="btn btn-success mt-5 w-100">Submit</button>
      </div>
    </form>
  );
};

export default PaymentForm;
