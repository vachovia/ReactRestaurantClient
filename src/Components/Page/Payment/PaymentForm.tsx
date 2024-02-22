import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {useState} from 'react';
import {toastNotify} from './../../../Helper';
import {orderSummaryProps} from './../Order/orderSummaryProps';
import {apiResponse, cartItemModel, orderDetailsDto, orderHeaderModel} from './../../../Interfaces';
import {useCreateOrderMutation} from './../../../Apis/orderApi';
import {SD_Status} from './../../../Interfaces/enums';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShoppingCart } from '../../../Storage/Redux/shoppingCartSlice';

const PaymentForm = ({data, userInput}: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      redirect: 'if_required', // will not redirect because of this flag!!!!!!!!!!!!!!!!!!!!************
    });

    if (result.error) {
      toastNotify('An unexpected error occured', 'error');
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      let grandTotal = 0;
      let totalItems = 0;
      const orderDetailsDto: orderDetailsDto[] = [];

      data.cartItems?.forEach((item: cartItemModel) => {
        const tempDto: orderDetailsDto = {
          menuItemId: item.menuItem?.id,
          quantity: item.quantity,
          itemName: item.menuItem?.name,
          price: item.menuItem?.price,
        };
        orderDetailsDto.push(tempDto);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });

      try {
        const response: apiResponse<orderHeaderModel> = await createOrder({
          pickupName: userInput.name,
          pickupPhoneNumber: userInput.phoneNumber,
          pickupEmail: userInput.email,
          totalItems: totalItems,
          orderTotal: grandTotal,
          applicationUserId: data.userId,
          stripePaymentIntentID: data.stripePaymentIntentId,
          status: result.paymentIntent.status === 'succeeded' ? SD_Status.CONFIRMED : SD_Status.PENDING,
          orderDetailsDtos: orderDetailsDto,
        }).unwrap();
        
        if (response.result.status === SD_Status.CONFIRMED) {
          dispatch(setShoppingCart([]));
          navigate(`/order/orderConfirmed/${response.result?.orderHeaderId}`);
        } else {
          navigate('/failed');
        }
      } catch (e) {
        console.log(e);
        navigate('/failed');
      }
    }

    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div>
        <button className="btn btn-success mt-5 w-100" disabled={!stripe || isProcessing}>
          <span>{isProcessing ? "Processing": "Submit Order"}</span>
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
