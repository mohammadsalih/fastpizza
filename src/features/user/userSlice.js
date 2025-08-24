import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "../../services/apiGeocoding";
import { getPosition } from "../../utils/helpers";

const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
});

// User initial state
const initialStateUser = {
  status: "idle",
  address: null,
  position: {},
  username: "",
  error: "",
};

const userSlice = createSlice({
  name: "User",
  initialState: initialStateUser,
  reducers: {
    createUser: {
      reducer(state, action) {
        const { username } = action.payload;

        state.username = username;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        const { position, address } = action.payload;

        state.position = position;
        state.address = address;
        state.status = "succeeded";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = "Failed to fetch address";
      });
  },
});

const { createUser } = userSlice.actions;

export default userSlice.reducer;
export { createUser, fetchAddress };
