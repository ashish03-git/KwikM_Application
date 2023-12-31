import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'details',
  initialState: {
    values: [],
    number: [],
    category_id: [],
    product_id: [],
    login_data: [],
    lead_details: [],
    paytm_lead_details: [],
    check_payment_status: [],
    edit_bank_account: [],

    // corporate redux store
    recentTransactions: [],
    myDistributorsList: [],
  },

  reducers: {
    addDetails: (state, action) => {
      // console.log(action.payload)
      state.values = action.payload;
    },
    addNumber: (state, action) => {
      // console.log(action.payload)
      state.number = action.payload;
    },
    addCategoryId: (state, action) => {
      // console.log(action.payload)
      state.category_id = action.payload;
    },
    addProductId: (state, action) => {
      // console.log(action.payload)
      state.product_id = action.payload;
    },
    addLogin_data: (state, action) => {
      state.login_data = action.payload;
    },
    addRecentTransactions: (state, action) => {
      // console.log(action.payload)
      state.recentTransactions = action.payload;
    },
    addMyDistibutorList: (state, action) => {
      // console.log("Slice",action.payload)
      state.myDistributorsList = action.payload;
    },
    add_lead_Details: (state, action) => {
      // console.log(action.payload)
      state.lead_details = action.payload;
    },
    add_paytm_lead_details: (state, action) => {
      // console.log(action.payload)
      state.paytm_lead_details = action.payload;
    },
    add_check_payment_status: (state, action) => {
      state.check_payment_status = action.payload;
    },
    add_edit_bank_account_details: (state, action) => {
      state.edit_bank_account = action.payload;
    },
  },
});

export const {
  addDetails,
  addNumber,
  addCategoryId,
  addProductId,
  addLogin_data,
  addRecentTransactions,
  addMyDistibutorList,
  add_lead_Details,
  add_paytm_lead_details,
  add_check_payment_status,
  add_edit_bank_account_details,
} = slice.actions;
export default slice.reducer;
