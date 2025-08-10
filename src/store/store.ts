import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import themeSlice from "./theme/themeSlice";
// import cameraSlice from "./camera/cameraSlice";
// import registrySlice from "./registry/registrySlice";
// import locationSlice from "./locations/locationSclice";
// import archivesSlice from "./archives/archivesSlice";
// import buildingSlice from "./buildings/buildingSclice";
// import floorSlice from "./floors/floorSlice";
// import bucketSlice from "./Bucket/bucketSlice";
// import usersReducer from "./users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    // camera : cameraSlice.reducer,
    // registry: registrySlice.reducer,
    // location:locationSlice.reducer,
    // archives:archivesSlice.reducer,
    // buildings:buildingSlice.reducer,
    // floors:floorSlice.reducer,
    // bucket:bucketSlice.reducer,
    // users: usersReducer,
  },
  middleware: (
    getDefaultMiddleware, // To remove response headers should not be non-serializable error while returning promise in action creators.
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;