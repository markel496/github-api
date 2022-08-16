import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IRepo } from '../../models/models'

const LS_FAV_KEY = 'rfk'

interface GitHubState {
  favourites: string[]
  repositories: IRepo[]
  searchValue: string
}

const initialState: GitHubState = {
  //Если в localStorage ничего нет - парсим пустой массив
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
  repositories: [],
  searchValue: '',
}

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      state.favourites.push(action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    },

    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter((el) => el !== action.payload)
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
    },

    changeRepositories: (state, action: PayloadAction<IRepo[]>) => {
      state.repositories = action.payload
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const githubActions = githubSlice.actions

export const githubReducer = githubSlice.reducer
