import {useEffect, useState} from 'react';
import {withAdminAuth} from './../../HOC';
import {useGetAllOrdersQuery} from './../../Apis/orderApi';
import {OrderList} from './../../Components/Page/Order';
import {MainLoader} from './../../Components/Page/Common';
import {inputHelper} from './../../Helper';
import {SD_Status} from './../../Interfaces/enums';
import {orderHeaderModel} from '../../Interfaces';

const filterOptions = [
  'All',
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.CANCELLED,
];

const AllOrders = () => {
  const [filters, setFilters] = useState({searchString: '', status: ''});
  const [apiFilters, setApiFilters] = useState({searchString: '', status: ''});
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({pageNumber: 1, pageSize: 5});
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [orderData, setOrderData] = useState<orderHeaderModel[]>([]);

  const {data, isLoading} = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const getPageDetails = () => {
    const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;
    return `${dataStartNumber} - ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords} of ${totalRecords}`;
  };

  useEffect(() => {
    if (data) {
      const orders = data?.apiResponse?.result || [];
      setOrderData(orders);
      const {TotalRecords} = JSON.parse(data?.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  };

  const handlePageOptionChange = (direction: string, pageSize?: number) => {
    if (direction === 'prev') {
      setPageOptions({pageSize: 5, pageNumber: pageOptions.pageNumber - 1});
    } else if (direction === 'next') {
      setPageOptions({pageSize: 5, pageNumber: pageOptions.pageNumber + 1});
    } else if (direction === 'change') {
      setPageOptions({pageSize: pageSize ? pageSize : 5, pageNumber: 1});
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">Orders List</h1>
            <div className="d-flex" style={{width: '40%'}}>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Search Name, Email or Phone"
                name="searchString"
                value={filters.searchString}
                onChange={handleChange}
              />
              <select className="form-select w-50 mx-2" name="status" onChange={handleChange} value={filters.status}>
                {filterOptions.map((item, idx) => (
                  <option key={idx} value={item === 'All' ? '' : item}>
                    {item}
                  </option>
                ))}
              </select>
              <button className="btn btn-outline-success" onClick={handleFilters}>
                Filter
              </button>
            </div>
          </div>
          <OrderList isLoading={isLoading} orderData={orderData} />
          <div className="d-flex mx-5 justify-content-end align-items center">
            <div className="mx-2">Rows per page:</div>
            <div>
              <select
                className="form-select mx-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handlePageOptionChange('change', +e.target.value);
                  setCurrentPageSize(+e.target.value);
                }}
                style={{width: '80px'}}
                value={currentPageSize}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            </div>
            <div className="m-2">{getPageDetails()}</div>
            <button
              disabled={pageOptions.pageNumber === 1}
              className="btn btn-outline-primary px-3 mx-2"
              onClick={() => handlePageOptionChange('prev')}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
              className="btn btn-outline-primary px-3 mx-2"
              onClick={() => handlePageOptionChange('next')}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default withAdminAuth(AllOrders);
