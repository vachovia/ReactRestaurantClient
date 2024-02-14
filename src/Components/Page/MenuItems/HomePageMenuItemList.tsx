import {useEffect, useState} from 'react';
import {menuItemModel} from '../../../Interfaces';
import {MenuItemCard} from '.';
import {useGetMenuItemsQuery} from '../../../Apis/menuItemApi';
import {useDispatch, useSelector} from 'react-redux';
import {setMenuItem} from '../../../Storage/Redux/menuItemSlice';
import {MainLoader} from '../Common';
import {RootState} from '../../../Storage/Redux/store';
import {SD_SortTypes} from '../../../Interfaces/enums';

const HomePageMenuItemList = () => {
  const dispatch = useDispatch();
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryList, setCategoryList] = useState(['']);
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const searchValue = useSelector((state: RootState) => {
    return state.menuItemStore.search;
  });
  const {data, isLoading} = useGetMenuItemsQuery(null);

  const handleFilters = (search: string, category: string, sortType: SD_SortTypes) => {
    let tempMenuItems =
      category === 'All'
        ? [...data]
        : [
            ...data.filter((m: menuItemModel) => {
              return m.category.toUpperCase() === category.toUpperCase();
            }),
          ];
    search = (search || '').trim().toLowerCase();
    if (search) {
      tempMenuItems = tempMenuItems.filter((m: menuItemModel) => m.name.toLocaleLowerCase().includes(search));
    }

    switch (sortType) {
      case SD_SortTypes.PRICE_LOW_HIGH:
        return tempMenuItems.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
      case SD_SortTypes.PRICE_HIGH_LOW:
        return tempMenuItems.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
      case SD_SortTypes.NAME_A_Z:
        return tempMenuItems.sort(
          (a: menuItemModel, b: menuItemModel) =>
            a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0)
        );
      default:
        return tempMenuItems.sort(
          (a: menuItemModel, b: menuItemModel) =>
            b.name.toUpperCase().charCodeAt(0) - a.name.toUpperCase().charCodeAt(0)
        );
    }
  };

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll('.custom-buttons');
    let localCategory;
    buttons.forEach((btn, idx) => {
      if (idx === i) {
        btn.classList.add('active');
        if (idx === 0) {
          localCategory = 'All';
        } else {
          localCategory = categoryList[idx];
        }
        setSelectedCategory(localCategory);
        const tempMenuItems = handleFilters(searchValue, localCategory, sortName);
        setMenuItems(tempMenuItems);
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
     const tempMenuItems = handleFilters(searchValue, selectedCategory, sortOptions[i]);
     setMenuItems(tempMenuItems);
  };

  useEffect(() => {
    if (data) {
      const tempMenuItems = handleFilters(searchValue, selectedCategory, sortName);
      setMenuItems(tempMenuItems);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data));
      setMenuItems(data);
      if (data && Array.isArray(data)) {
        const tempCategoryList = ['All'];
        data.forEach((m: menuItemModel) => {
          if (tempCategoryList.indexOf(m.category) === -1) {
            tempCategoryList.push(m.category);
          }
        });
        setCategoryList(tempCategoryList);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3 px-4">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((name, idx) => {
            return (
              <li className="nav-item" key={idx} style={{...(idx === 0 && {marginLeft:"auto"})}}>
                <button
                  className={`nav-link p-0 pb-2 custom-buttons fs-5 ${idx === 0 && 'active'}`}
                  onClick={() => handleCategoryClick(idx)}
                >
                  {name}
                </button>
              </li>
            );
          })}
          <li className="nav-item dropdown" style={{marginLeft: 'auto'}}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, idx) => {
                return (
                  <li className="dropdown-item" key={idx} onClick={() => handleSortClick(idx)} style={{cursor:"pointer"}}>
                    {sortType}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, idx: number) => <MenuItemCard key={idx} menuItem={menuItem} />)}
    </div>
  );
};

export default HomePageMenuItemList;
