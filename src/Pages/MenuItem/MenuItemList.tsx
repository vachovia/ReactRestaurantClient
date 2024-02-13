import {useNavigate} from 'react-router-dom';
import {MainLoader} from '../../Components/Page/Common';
import {menuItemModel} from '../../Interfaces';
import {useDeleteMenuItemMutation, useGetMenuItemsQuery} from './../../Apis/menuItemApi';
import {toast} from 'react-toastify';

const MenuItemList = () => {
  const {data, isLoading} = useGetMenuItemsQuery(null);
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const navigate = useNavigate();

  const handleMenuItemDelete = (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: 'Processing your request...',
        success: 'Menu Item deleted successfully',
        error: 'error encountered',
      },
      {
        theme: 'dark',
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Menu Item List</h1>
            <button className="btn btn-success" onClick={() => navigate(`/menuItem/menuItemUpsert/`)}>
              Add New Menu Item
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-3">Name</div>
              <div className="col-2">Category</div>
              <div className="col-2">Price</div>
              <div className="col-2">Special Tag</div>
              <div className="col-1">Action</div>
            </div>
            {data.map((menuItem: menuItemModel, idx: number) => {
              return (
                <div className="row border" key={idx}>
                  <div className="col-1">
                    <img src={menuItem.image} alt="no content" style={{width: '100%', maxWidth: '120px'}} />
                  </div>
                  <div className="col-1 font-weight-bold">{menuItem.id}</div>
                  <div className="col-3 font-weight-bold">{menuItem.name}</div>
                  <div className="col-2 font-weight-bold">{menuItem.category}</div>
                  <div className="col-2 font-weight-bold">${menuItem.price}</div>
                  <div className="col-2 font-weight-bold">{menuItem.specialTag}</div>
                  <div className="col-1">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate(`/menuItem/menuItemUpsert/${menuItem.id}`)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-danger mx-2" onClick={() => handleMenuItemDelete(menuItem.id)}>
                      <i className="bi bi-trash-fill"></i>
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

export default MenuItemList;
