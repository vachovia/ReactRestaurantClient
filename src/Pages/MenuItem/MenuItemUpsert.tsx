import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useGetMenuItemByIdQuery, useCreateMenuItemMutation, useUpdateMenuItemMutation} from '../../Apis/menuItemApi';
import {MainLoader} from './../../Components/Page/Common';
import {inputHelper, toastNotify} from './../../Helper';
import {SD_Categories} from '../../Interfaces/enums';

const categories = [SD_Categories.APPETIZER, SD_Categories.ENTREE, SD_Categories.DESSERT, SD_Categories.BEVERAGES];

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: categories[0],
  price: '',
};

const MenuItemUpsert = () => {
  const {id} = useParams();
  const {data} = useGetMenuItemByIdQuery(id);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>('');
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  useEffect(() => {
    if (data) {
      const tempData = {
        name: data.name,
        description: data.description,
        specialTag: data.specialTag,
        category: data.category,
        price: data.price,
      };
      setMenuItemInputs(tempData);
      setImageToDisplay(data.image);
    }
  }, [data]);

  const handleMenuItemInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imgType = file.type.split('/')[1];
      const validImgTypes = ['png', 'jpg', 'jpeg'];
      const isImgTypeValid = validImgTypes.includes(imgType);
      const validImgSize = 1000 * 1024;

      if (file.size > validImgSize) {
        setImageToStore('');
        toastNotify('File must be less than 1 MB', 'error');
        return;
      } else if (!isImgTypeValid) {
        setImageToStore('');
        toastNotify('File must be in jpeg, jpg or png', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToStore && !id) {
      setImageToStore('');
      toastNotify('Please upload an image.', 'error');
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append('Name', menuItemInputs.name);
    formData.append('Description', menuItemInputs.description);
    formData.append('SpecialTag', menuItemInputs.specialTag ?? "");
    formData.append('Category', menuItemInputs.category);
    formData.append('Price', menuItemInputs.price);
    if (!imageToDisplay) {
      formData.append('File', imageToStore);
    }

    let response;

    if (id) {
      formData.append('Id', id);
      response = await updateMenuItem({data: formData, id: id});
      toastNotify('Menu Item updated successfully', 'success');
    } else {
      response = await createMenuItem(formData);
      toastNotify('Menu Item created successfully', 'success');
    }

    if (response) {
      setLoading(false);
      navigate('/menuItem/menuItemList');
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <MainLoader />}
      {!loading && (
        <div className="container border mt-5 p-4 bg-light">
          <h3 className="offset-2 px-2 text-success">{id ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
          <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="row mt-4">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={menuItemInputs.name}
                  onChange={handleMenuItemInput}
                  required
                />
                <textarea
                  className="form-control mt-3"
                  placeholder="Enter Description"
                  rows={6}
                  name="description"
                  value={menuItemInputs.description}
                  onChange={handleMenuItemInput}
                ></textarea>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Special Tag"
                  name="specialTag"
                  value={menuItemInputs.specialTag}
                  onChange={handleMenuItemInput}
                />
                <select className="form-control form-select mt-3" name="category" value={menuItemInputs.category} onChange={handleMenuItemInput}>
                  {categories.map((category, idx) => {
                    return(<option key={idx} value={category}>{category}</option>)
                  })}
                </select>
                <input
                  type="number"
                  className="form-control mt-3"
                  required
                  placeholder="Enter Price"
                  name="price"
                  value={menuItemInputs.price}
                  onChange={handleMenuItemInput}
                />
                <input type="file" className="form-control mt-3" onChange={handleFileChange} />
                <div className="row">
                  <div className="col-6">
                    <button type="submit" className="btn btn-success form-control mt-5">
                      {id ? 'Update' : 'Create'}
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-secondary form-control mt-5"
                      onClick={() => navigate('/menuItem/menuItemList')}
                    >
                      Back to Menu Items
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <img src={imageToDisplay} style={{width: '100%', borderRadius: '30px'}} alt="" />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MenuItemUpsert;
