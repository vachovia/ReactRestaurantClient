import {NavLink, useNavigate} from 'react-router-dom';
import {cartItemModel, userModel} from './../../Interfaces';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './../../Storage/Redux/store';
import {setLoggedInUser} from './../../Storage/Redux/userAuthSlice';
import {SD_Roles} from '../../Interfaces/enums';
let logo = require('./../../Assets/Images/mango.png');

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector((state: RootState) => state.shoppingCartStore.cartItems ?? []);

  const userFromStore: Partial<userModel> = useSelector((state: RootState) => state.userAuthStore);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedInUser({fullName: '', email: '', role: '', uid: ''}));
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={logo} style={{height: '40px'}} className="m-1" alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {userFromStore.role === SD_Roles.ADMIN ? (
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin Panel
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <span className="dropdown-item" onClick={() => navigate('/menuItem/menuItemList')} style={{cursor: 'pointer'}}>
                        Menu Item
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item" onClick={() => navigate('/order/myOrders')} style={{cursor: 'pointer'}}>
                        My Orders
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item" onClick={() => navigate('/order/allOrders')} style={{cursor: 'pointer'}}>
                        All Orders
                      </span>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/order/myOrders">
                    Orders
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/shoppingCart">
                  <i className="bi bi-cart"></i> {userFromStore.uid && shoppingCartFromStore?.length ? `(${shoppingCartFromStore.length})` : ''}
                </NavLink>
              </li>
              <div className="d-flex" style={{marginLeft: 'auto'}}>
                {userFromStore.uid && (
                  <>
                    <li className="nav-item">
                      <button className="nav-link active" style={{cursor: 'pointer', background: 'transparent', border: 0}}>
                        Welcome {userFromStore.fullName}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{border: 'none', height: '40px', width: '100px'}}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!userFromStore.uid && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" aria-current="page" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{border: 'none', height: '40px', width: '100px'}}
                        aria-current="page"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
