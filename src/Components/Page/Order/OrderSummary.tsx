import {useSelector} from 'react-redux';
import {SD_Roles, SD_Status, StatusColor} from './../../../Interfaces/enums';
import {getNextStatus, getStatusColor} from './../../../Helper';
import {cartItemModel, userModel} from './../../../Interfaces';
import {orderSummaryProps} from './orderSummaryProps';
import {useNavigate} from 'react-router-dom';
import {RootState} from './../../../Storage/Redux/store';
import {useState} from 'react';
import {useUpdateOrderHeaderMutation} from './../../../Apis/orderApi';
import {MainLoader} from './../Common';

const OrderSummary = ({data, userInput}: orderSummaryProps) => {
  const navigate = useNavigate();
  const badgeTypeColor = getStatusColor(data.status!);
  const nextStatus: StatusColor = getNextStatus(data.status!);
  const userFromStore: Partial<userModel> = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setLoading] = useState(false);
  const [updateOrder] = useUpdateOrderHeaderMutation();

  const handleNextStatus = async () => {
    setLoading(true);
    await updateOrder({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    await updateOrder({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED,
    });
    setLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>{data.status}</span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">Phone : {userInput.phoneNumber}</div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3"></div>
              {data.cartItems?.map((item: cartItemModel, idx: number) => (
                <div className="d-flex" key={idx}>
                  <div className="d-flex w-100 justify-content-between">
                    <p>{item.menuItem?.name}</p>
                    <p>
                      {item.menuItem?.price}x{item.quantity}=
                    </p>
                  </div>
                  <p style={{width: '70px', textAlign: 'right'}}>${(item.menuItem?.price ?? 0) * (item.quantity ?? 0)}</p>
                </div>
              ))}
              <hr />
              <h4 className="text-danger" style={{textAlign: 'right'}}>
                ${data.cartTotal?.toFixed(2)}
              </h4>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Orders
            </button>
            {userFromStore.role === SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.status !== SD_Status.CANCELLED && data.status !== SD_Status.COMPLETED && (
                  <button className="btn btn-danger mx-2" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
                {nextStatus.value && (
                  <button className={`btn btn-${nextStatus.color}`} onClick={handleNextStatus}>
                    {nextStatus.value}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
