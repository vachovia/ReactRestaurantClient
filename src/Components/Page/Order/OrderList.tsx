import {getNextStatus} from './../../../Helper';
import {StatusColor} from '.././../../Interfaces/enums';
import {MainLoader} from './../Common';
import OrderListProps from './orderListProps';
import {useNavigate} from 'react-router-dom';

const OrderList = ({isLoading, orderData}: OrderListProps) => {
  const navigate = useNavigate();
  const orders = orderData || [];

  const goToOrderDetails = (id: number) => {
    navigate(`/order/orderDetails/${id}`);
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="px-5">
          <div className="p-2">
            <div className="row border-bottom" style={{backgroundColor: '#fafafa'}}>
              <div className="col-1 py-2 fw-bold">ID</div>
              <div className="col-3 py-2 fw-bold">Name</div>
              <div className="col-2 py-2 fw-bold">Phone</div>
              <div className="col-1 py-2 fw-bold">Total</div>
              <div className="col-1 py-2 fw-bold">Items</div>
              <div className="col-1 py-2 fw-bold">Date</div>
              <div className="col-2 py-2 fw-bold">Status</div>
              <div className="col-1 py-2"></div>
            </div>
            {orders.map((order, idx) => {
              const badgeColor: StatusColor = getNextStatus(order.status!);
              const color = idx % 2 === 0 ? 'antiquewhite' : '#fafafa';
              return (
                <div className="row border-bottom " key={idx} style={{backgroundColor: color}}>
                  <div className="col-1 pt-2">{order.orderHeaderId}</div>
                  <div className="col-3 pt-2">{order.pickupName}</div>
                  <div className="col-2 pt-2">{order.pickupPhoneNumber}</div>
                  <div className="col-1 pt-2">$ {order.orderTotal?.toFixed(2)}</div>
                  <div className="col-1 pt-2">{order.totalItems}</div>
                  <div className="col-1 pt-2">{new Date(order.orderDate!).toLocaleDateString()}</div>
                  <div className="col-2 pt-2">
                    <span className={`badge bg-${badgeColor.color}`}>{order.status}</span>
                  </div>
                  <div className="col-1 py-1">
                    <button className="btn btn-success" onClick={() => goToOrderDetails(order.orderHeaderId!)}>
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
