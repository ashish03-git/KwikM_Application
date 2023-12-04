import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "details",
    initialState: {
        values: [], // Change "register" to "values"
        number: [], // Change "register" to "values"
        category_id: [], // Change "register" to "values"
        product_id: [], // Change "register" to "values"
        login_data: [],
        lead_details: [],
        paytm_lead_details: [],




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
            state.login_data = action.payload
        },
        addRecentTransactions: (state, action) => {
            // console.log(action.payload)
            state.recentTransactions = action.payload
        },
        addMyDistibutorList: (state, action) => {
            // console.log("Slice",action.payload)
            state.myDistributorsList = action.payload
        },
        add_lead_Details: (state, action) => {
            // console.log(action.payload)
            state.lead_details = action.payload
        },
        add_paytm_lead_details: (state, action) => {
            // console.log(action.payload)
            state.paytm_lead_details = action.payload
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
    add_paytm_lead_details

} = slice.actions;
export default slice.reducer;