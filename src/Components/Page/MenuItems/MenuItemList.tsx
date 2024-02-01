import { useEffect } from 'react';
import { menuItemModel } from './../../../Interfaces';
import { MenuItemCard } from './';
import { useGetMenuItemsQuery } from './../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from './../../../Storage/Redux/menuItemSlice';
import { MainLoader } from './../Common';

const MenuItemList = () => {

    const dispatch = useDispatch();

    const { data, isLoading } = useGetMenuItemsQuery(null);

    useEffect(() => {
       if(!isLoading) {
          dispatch(setMenuItem(data));
       }
      }, [isLoading])

      if(isLoading){
        return (<MainLoader />)
      }

  return (
    <div className="container row">
        {data.length > 0 && data.map((menuItem: menuItemModel, idx: number) => (
            <MenuItemCard key={idx} menuItem={menuItem} />
        ))}
    </div>
  )
}

export default MenuItemList;