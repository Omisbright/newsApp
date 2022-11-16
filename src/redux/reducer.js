import { createSlice } from '@reduxjs/toolkit';
import { setUseProxies } from 'immer';
import axios from 'axios';

const initialState = {
    stories: [],
    loading: false
  }

export const newsSlice = createSlice({
  name: 'newsApp',
  initialState,
  reducers: {
    setStories: (state, action) => {state.stories =  action.payload},
    startLoading: (state) => {state.loading = true},
    stopLoading: (state) => {state.loading = false}
  }
})

// Action creators are generated for each case reducer function
export const { setStories, startLoading, stopLoading } = newsSlice.actions

export default newsSlice.reducer;



export const getStories = (number) => (dispatch) => {

    dispatch(startLoading())
    axios
    .get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then( async res => {
            const data =  res.data;

            const newStories = async () => {

                let stories = [];

                for ( let i = 0; i <= number; i++) {
                    let result = await axios
                    .get(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)
                    stories.push(result.data)
                }
                return stories;
            }

            let myStories = await newStories();

            dispatch(setStories(myStories));
            dispatch(stopLoading())
        }
    )
    .catch(res => {
        dispatch(stopLoading())
        console.log("res", res)
    })
}

