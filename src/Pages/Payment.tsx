import {useLocation} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentForm} from './../Components/Page/Payment';
import {OrderSummary} from '../Components/Page/Order';

const Payment = () => {
  const {
    state: {apiResult, userInput},
  } = useLocation();

  const stripePromise = loadStripe(
    'pk_test_51Kb5VDIbFLvvlEjSZaexkN8qyebzWWe8dZyn0OFf819fR6Cntd9Ja4rWd4ASdjvr6jM0yuX0BgWW1ToSgtvuczR400uBgROxku'
  );

  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  console.log(apiResult, userInput);

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="wh-90 m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <PaymentForm />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
