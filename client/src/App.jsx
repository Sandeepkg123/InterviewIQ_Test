import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Auth from './page/Auth'
import { use } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserDate } from './redux/userSlice';
import InterviewPage from './page/InterviewPage';
import InterviewReport from './page/InterviewReport';

export const ServerUrl = 'http://localhost:3000';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log('Fetching user data...');
        const result = await axios.get(`${ServerUrl}/api/user/current-user`, {
          withCredentials: true
        });
        console.log('User data fetched successfully:', result);
        dispatch(setUserDate(result.data.user));  
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message);
        dispatch(setUserDate(null));
      }
    };

    getUser();
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/report' element={<InterviewReport />} />
    </Routes>
  )
}

export default App