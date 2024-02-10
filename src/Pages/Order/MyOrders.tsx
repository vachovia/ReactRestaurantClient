import {useSelector} from 'react-redux';
import {userModel} from './../../Interfaces';
import {withAuth} from './../../HOC';
import {RootState} from './../../Storage/Redux/store';
import {useGetAllOrdersQuery} from './../../Apis/orderApi';
import {OrderList} from './../../Components/Page/Order';
import {MainLoader} from './../../Components/Page/Common';

const MyOrders = () => {
  const userFromStore: Partial<userModel> = useSelector((state: RootState) => state.userAuthStore);

  const {data, isLoading} = useGetAllOrdersQuery(userFromStore.uid!);

  const orders = data?.result || [];

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={orders} />}
    </>
  );
};

export default withAuth(MyOrders);
