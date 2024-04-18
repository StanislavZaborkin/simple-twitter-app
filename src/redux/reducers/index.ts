import { combineSlices } from '@reduxjs/toolkit';
import { authSlice } from '../../pages/Login/slices';
import { homeSlice } from '../../pages/Home/slices';
import { detailSlice } from '../../pages/Detail/slices';

const createReducer = () => combineSlices(authSlice, homeSlice, detailSlice);

export default createReducer;
