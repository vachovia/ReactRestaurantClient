import { useSelector } from "react-redux";
import { cartItemModel } from "./../../../Interfaces";
import { RootState } from "./../../../Storage/Redux/store";
import { useState } from "react";
import { inputHelper } from "./../../../Helper";
import { MiniLoader } from "../Common";


const CartPickUpDetails = () => {
    let grandTotal = 0, totalItems = 0;

    const [loading, setLoading] = useState(false);

    const initialUserData = { name: "", email: "", phoneNumber: "" };

    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    );

    shoppingCartFromStore?.map((cartItem: cartItemModel) => {
        totalItems += cartItem.quantity ?? 0;
        grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
        return null;
    });

    const [userInput, setUserInput] = useState(initialUserData);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
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