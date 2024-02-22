import {useSelector} from 'react-redux';
import {userModel} from './../../Interfaces';
import {withAuth} from './../../HOC';
import {RootState} from './../../Storage/Redux/store';
import {useGetAllOrdersQuery} from './../../Apis/orderApi';
import {OrderList} from './../../Components/Page/Order';
import {MainLoader} from './../../Components/Page/Common';

const MyOrders = () => {
  const userFromStore: Partial<userModel> = useSelector((state: RootState) => state.userAuthStore);

  const {data, isLoading} = useGetAllOrdersQuery({userId:userFromStore.uid!});

  const orders = data?.apiResponse?.result || [];

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">My Orders</h1>
          </div>
          <OrderList isLoading={isLoading} orderData={orders} />
        </>
      )}
    </>
  );
};

export default withAuth(MyOrders);
