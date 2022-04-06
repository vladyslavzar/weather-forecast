import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: '',
    cityLoadingStatus: 'idle',
    temp: 0,
    tempLoadingStatus: 'idle',
    weather: '',
    weatherLoadingStatus: 'idle',
    autoCompleteInput: '',
    dailyCast: []
}

const appSlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        cityFetching: state => {state.cityLoadingStatus = 'loading'},
        cityFetched: (state, action) => {
            state.cityLoadingStatus = 'idle';
            state.city = action.payload;
        },
        cityFetchingError: state => {
            state.cityLoadingStatus = 'error';
        },
        cityTempSetFetching: state => {state.tempLoadingStatus = 'loading'},
        cityTempSet: (state, action) => {
            state.tempLoadingStatus = 'idle';
            state.temp = action.payload;
        },
        cityTempSetError: state => {state.tempLoadingStatus = 'error'},
        cityWeatherSetFetching: state => {state.weatherLoadingStatus = 'loading'},
        cityWeatherSet: (state, action) => {
            state.weatherLoadingStatus = 'idle';
            state.weather = action.payload;          
        },
        cityWeatherSetError: state => {state.weatherLoadingStatus = 'error'},
        setAutoCompleteInput: (state, action) => {
            state.autoCompleteInput = action.payload; 
        },
        setDailyCast: (state, action) => {
            state.dailyCast = action.payload;
        }
    }
});

const {actions, reducer} = appSlice;

export default reducer;
export const {
    cityFetching,
    cityFetched,
    cityFetchingError,
    cityTempSet,
    cityWeatherSet,
    setAutoCompleteInput,
    setDailyCast,
    cityWeatherSetFetching,
    cityWeatherSetError,
    cityTempSetFetching,
    cityTempSetError
} = actions;