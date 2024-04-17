import { combineSlices } from '@reduxjs/toolkit';
import { authSlice } from '../../pages/Login/slices';
import { homeSlice } from '../../pages/Home/slices';

const createReducer = () => combineSlices(authSlice, homeSlice);

export default createReducer;
