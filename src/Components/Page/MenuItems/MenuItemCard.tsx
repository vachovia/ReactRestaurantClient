import { Link, useNavigate } from 'react-router-dom';
import { menuItemModel, userModel } from './../../../Interfaces';
import { useState } from 'react';
import { useUpdateShoppingCartMutation } from './../../../Apis/shoppingCartApi';
import { MiniLoader } from '../Common';
import { toastNotify } from './../../../Helper';
import { RootState } from './../../../Storage/Redux/store';
import { useSelector } from 'react-redux';

interface Props {
    menuItem: menuItemModel
}

const MenuItemCard = (props: Props) => {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const userFromStore: Partial<userModel> = useSelector(
      (state: RootState) => state.userAuthStore
  );

  const handleAddToCart = async (menuItemId: number) => {
    if(!userFromStore.uid){
        navigate('/login');
    }    
    setIsAddingToCart(true);

    try {
        await updateShoppingCart({
            userId: userFromStore.uid,
            menuItemId: menuItemId,
            updateQuantityBy: 1
        }).unwrap();

        toastNotify("Item added to cart successfully");
        
    } catch(e)  {
        console.log("Error: ", e);
    }
    
    setIsAddingToCart(false);
}

  return (
    <div className="col-md-4 col-12 p-4">
      <div className="card" style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }} >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`} >
                <img src={props.menuItem.image} style={{ borderRadius: "50%" }} alt="" className="w-100 mt-5 image-box" />
            </Link>
          </div>
          {props.menuItem.specialTag && props.menuItem.specialTag.length && (
            <i className="bi bi-star btn btn-success" style={styles.iconSuccess}>&nbsp; {props.menuItem.specialTag}</i>
          )}
          {isAddingToCart ? (<div style={styles.miniLoader}><MiniLoader/></div>) : (
            <i className="bi bi-cart-plus btn btn-outline-danger" style={styles.iconDanger} onClick={() => handleAddToCart(props.menuItem.id)}></i>
          )}          
          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
                <Link to={`/menuItemDetails/${props.menuItem.id}`} style={{textDecoration:"none", color:"green"}}>
                    {props.menuItem.name}
                </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>{props.menuItem.category}</p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>{props.menuItem.description}</p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard;

const styles = {
  iconSuccess: {
    position: "absolute",
    top: "15px",
    left: "15px",
    padding: "5px 10px",
    borderRadius: "3px",
    outline: "none !important",
    cursor: "pointer"
  } as React.CSSProperties,
  iconDanger:{
    position: "absolute",
    top: "15px",
    right: "15px",
    padding: "5px 10px",
    borderRadius: "3px",
    outline: "none !important",
    cursor: "pointer"
  } as React.CSSProperties,
  miniLoader:{
    position:"absolute",
    top: "15px",
    right: "15px"
  } as React.CSSProperties
}