import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./sliceList.jsx";




const store = configureStore({
    reducer: {
        lists: listsReducer,
    }
});

export default store;
