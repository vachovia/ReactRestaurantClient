import {useSelector} from 'react-redux';
import {userModel} from '../../Interfaces';
import {withAdminAuth} from '../../HOC';
import {RootState} from '../../Storage/Redux/store';
import {useGetAllOrdersQuery} from '../../Apis/orderApi';
import {OrderList} from '../../Components/Page/Order';
import {MainLoader} from '../../Components/Page/Common';

const AllOrders = () => {

  const {data, isLoading} = useGetAllOrdersQuery("");

  const orders = data?.result || [];

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && <OrderList isLoading={isLoading} orderData={orders} />}
    </>
  );
};

export default withAdminAuth(AllOrders);
