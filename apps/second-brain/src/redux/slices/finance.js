import { createSlice } from '@reduxjs/toolkit';

export const financeSlice = createSlice({
    name: 'finance',
    initialState: {
        roiCalculators: [],
        royalties: {
            current: 0,
            projection: 0
        },
        loading: false
    },
    reducers: {
        updateRoyalties: (state, action) => {
            state.royalties = action.payload;
        },
        addCalculator: (state, action) => {
            state.roiCalculators.push(action.payload);
        }
    },
});

export const { updateRoyalties, addCalculator } = financeSlice.actions;

export default financeSlice.reducer;
