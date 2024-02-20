import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://localhost:7067/api/';
const baseUrlIIS = 'http://react.localhost/api/';
const baseUrlBH = 'https://redmangoapi.azurewebsites.net/api/';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrlIIS,
  prepareHeaders: (headers: Headers, api) => {
    const token = localStorage.getItem('token');
    token && headers.append('Authorization', `Bearer ${token}`);
  },
});

export {baseUrl, baseUrlIIS, baseUrlBH, baseQuery};
