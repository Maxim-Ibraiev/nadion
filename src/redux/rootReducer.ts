import { combineReducers } from "@reduxjs/toolkit";

import main, { selectedProducts } from "./main/mainReducer";

export default combineReducers({ main, selectedProducts });
