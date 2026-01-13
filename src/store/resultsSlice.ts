import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URI = 'https://crab.brainstem.dataunion.app'

interface ResultsState {
    isDataLoading: boolean
    data: {
        rows: any[]
        totalCount: number
    }
}

const initialState: ResultsState = {
    isDataLoading: false,
    data: {
        rows: [],
        totalCount: 0
    }
}

export const fetchResults = createAsyncThunk(
    'results/fetchResults',
    async (params: {
        recording_type: string
        gender: string
        ethnicity: string
        max_amount: number
        min_amount: number
        min_age: number
        max_age: number
        page: number
        per_page: number
        sort_by: string
        sort_direction: 'ascending' | 'descending'
    }) => {
        const {
            recording_type,
            min_age,
            max_age,
            gender,
            ethnicity,
            max_amount,
            min_amount,
            page,
            per_page,
            sort_by,
            sort_direction
        } = params

        const url =
            `${API_URI}/api/v1/get-brainstem-leaderboard-data` +
            `?page=${page}` +
            `&per_page=${per_page}` +
            `&recording_type=${recording_type}` +
            `&min_age=${min_age}` +
            `&max_age=${max_age}` +
            `&gender=${gender}` +
            `&ethnicity=${ethnicity}` +
            `&max_amount=${max_amount}` +
            `&min_amount=${min_amount}` +
            `&sort_by=${sort_by}` +
            `&sort_direction=${sort_direction}`

        const response = await axios.get(url)
        return response.data.result
    }
)

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state) => {
                state.isDataLoading = true
            })
            .addCase(
                fetchResults.fulfilled,
                (state, action: PayloadAction<{ rows: any[]; totalCount: number }>) => {
                    state.isDataLoading = false
                    state.data.rows = action.payload.rows
                    state.data.totalCount = action.payload.totalCount
                }
            )
            .addCase(fetchResults.rejected, (state) => {
                state.isDataLoading = false
            })
    }
})

export default resultsSlice.reducer