import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
import { toastNotify } from "./../Helper"; 
import { userModel } from "./../Interfaces";
import { RootState } from "./../Storage/Redux/store";
import { useSelector } from "react-redux";

const MenuItemDetails = () => {
    const navigate = useNavigate();
    const userFromStore: Partial<userModel> = useSelector(
        (state: RootState) => state.userAuthStore
    );

    const { menuItemId } = useParams();
    const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
    
    const [quantity, setQuantity] = useState<number>(1);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

    const [updateShoppingCart] = useUpdateShoppingCartMutation();

    const handleAddToCart = async (menuItemId: number) => {
        if(!userFromStore.uid){
            navigate('/login');
        } 
        setIsAddingToCart(true);

        try {
            await updateShoppingCart({
                userId: userFromStore.uid,
                menuItemId: menuItemId,
                updateQuantityBy: quantity
            });

            toastNotify("Item added to cart successfully");
        
        } catch(e)  {
            console.log("Error: ", e);
        }
        
        setIsAddingToCart(false);
    }

    const handleQuantity = (q: number) => {
        let newQuantity = quantity + q;
        if(newQuantity === 0) newQuantity = 1;
        setQuantity(newQuantity);
    }

    return (
        <div>
            <div className="container pt-4 pt-md-5">
                {!isLoading ? (
                <div className="row">
                    <div className="col-7">
                        <h2 className="text-success">{data?.name}</h2>
                        <span>
                            <span className="badge text-bg-dark pt-2" style={{ height: "40px", fontSize: "20px" }}>{data?.category}</span>
                        </span>
                        <span>
                            <span className="badge text-bg-light pt-2" style={{ height: "40px", fontSize: "20px" }}>{data?.specialTag}</span>
                        </span>
                        <p style={{ fontSize: "20px" }} className="pt-2">{data?.description}</p>
                        <span className="h3">{data?.price}</span> &nbsp;&nbsp;&nbsp;
                        <span className="pb-2  p-3" style={{ border: "1px solid #333", borderRadius: "30px" }}>
                            <i className="bi bi-dash p-1" style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => handleQuantity(-1)}></i>
                            <span className="h3 mt-3 px-3">{quantity}</span>
                            <i className="bi bi-plus p-1" style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => handleQuantity(1)}></i>
                        </span>
                        <div className="row pt-4">
                            <div className="col-5">
                                {isAddingToCart ? (
                                    <button disabled className="btn btn-success form-control"><MiniLoader size={50}/></button>
                                ) : (
                                <button className="btn btn-success form-control" onClick={() => handleAddToCart(data.id)}>Add to Cart</button>
                            )}                                
                            </div>
                            <div className="col-5 ">
                                <button className="btn btn-secondary form-control" onClick={() => navigate(-1)}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <img src={data.image} width="100%" style={{ borderRadius: "50%" }} alt="No content"></img>
                    </div>
                </div>
                ) : (<div className="d-flex justify-content-center" style={{width:"100%"}}><MainLoader /></div>)}            
            </div>
        </div>
    )
}

export default MenuItemDetails;