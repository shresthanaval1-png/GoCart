import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: "",
  gender: "",
  image: "", // ✅ NEW (profile image)
  wishlist: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    // 👤 OLD (OPTIONAL KEEP)
    setUserInfo: (state, action) => {
      const { name, age, gender } = action.payload;
      state.name = name;
      state.age = age;
      state.gender = gender;
    },

    // ✅ NEW (FULL PROFILE UPDATE)
    updateProfile: (state, action) => {
      const { name, age, gender, image } = action.payload;

      state.name = name;
      state.age = age;
      state.gender = gender;
      state.image = image;
    },

    // ❤️ ADD TO WISHLIST
    addToWishlist: (state, action) => {
      const productId = action.payload;

      if (!state.wishlist.includes(productId)) {
        state.wishlist.push(productId);
      }
    },

    // ❌ REMOVE FROM WISHLIST
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        id => id !== action.payload
      );
    },

    // 🧹 OPTIONAL CLEAR
    clearWishlist: (state) => {
      state.wishlist = [];
    }
  }
});

// ✅ EXPORT ALL
export const {
  setUserInfo,
  updateProfile, // ⭐ NEW
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = userSlice.actions;

export default userSlice.reducer;