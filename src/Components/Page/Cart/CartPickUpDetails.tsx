import { useSelector } from "react-redux";
import { apiResponse, cartItemModel, shoppingCartModel, userModel } from "./../../../Interfaces";
import { RootState } from "./../../../Storage/Redux/store";
import { useState, useEffect } from "react";
import { inputHelper } from "./../../../Helper";
import { MiniLoader } from "./../Common";
import { useInitiatePaymentMutation } from "./../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";


const CartPickUpDetails = () => {
    let grandTotal = 0, totalItems = 0;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    );
    const userFromStore: Partial<userModel> = useSelector((state: RootState) => state.userAuthStore);    

    const initialUserData = {name: userFromStore.fullName, email: userFromStore.email, phoneNumber: ''};

    shoppingCartFromStore?.map((cartItem: cartItemModel) => {
        totalItems += cartItem.quantity ?? 0;
        grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
        return null;
    });

    const [userInput, setUserInput] = useState(initialUserData);

    const [initiatePayment] = useInitiatePaymentMutation();

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    }

    useEffect(() => {
        setUserInput({
          name: userFromStore.fullName,
          email: userFromStore.email,
          phoneNumber: '',
        });
    }, [userFromStore]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try{
            const orderSummary = {grandTotal, totalItems};
            const response: apiResponse<shoppingCartModel> = await initiatePayment(userFromStore.uid!).unwrap();
            
            navigate('/payment', {
              state: {
                apiResult: response?.result,
                userInput: userInput,
                orderSummary: orderSummary,
              },
            });
        } catch(e) {
            console.log(e);
        }

        setLoading(false);
    }

    return (
        <div className="border pb-5 pt-3">
            <h1 style={{ fontWeight: "300" }} className="text-center text-success">Pickup Details</h1>
            <hr />
            <form className="col-10 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group mt-3">Pickup Name
                    <input type="text" className="form-control" placeholder="Name..." name="name" value={userInput.name} onChange={handleUserInput} required />
                </div>
                <div className="form-group mt-3">Pickup Email
                    <input type="email" className="form-control" placeholder="Email..." name="email" value={userInput.email} onChange={handleUserInput} required />
                </div>
                <div className="form-group mt-3">Pickup Phone Number
                    <input type="number" className="form-control" placeholder="Phone Number..." name="phoneNumber" value={userInput.phoneNumber} onChange={handleUserInput} required />
                </div>
                <div className="form-group mt-3">
                    <div className="card p-3" style={{ background: "ghostwhite" }}>
                        <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
                        <h5>No of items : {totalItems}</h5>
                    </div>
                </div>
                <button type="submit" className="btn btn-lg btn-success form-control mt-3" disabled={loading}>
                    {loading ? <MiniLoader /> : "Looks Good? Place Order!"}                    
                </button>
            </form>
        </div>
    )
}

export default CartPickUpDetails;