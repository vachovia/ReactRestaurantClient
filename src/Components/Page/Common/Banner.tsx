import './Banner.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchItem } from './../../../Storage/Redux/menuItemSlice';

const Banner = () => {
  const  [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    dispatch(setSearchItem(v));
    setValue(v);
  }

  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{
          width: '400px',
          height: '50vh',
        }}
      >
        <div className="d-flex align-items-center" style={{width: '100%'}}>
          <input
            type={'text'}
            className="form-control rounded-pill"
            style={{
              width: '100%',
              padding: '20px 20px',
            }}
            placeholder="Search for Food Items!"
            value={value}
            onChange={handleChange}
          />
          <span style={{position: 'relative', left: '-43px'}}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
