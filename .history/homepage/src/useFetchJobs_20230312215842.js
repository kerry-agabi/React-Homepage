import React from 'react'
import { useReducer, useEffect } from 'react'
import axios from 'axios'
const ACTIONS = {

    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

// const BASE_URL=  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
// const  BASE_URL = 'https://job-listings.p.rapidapi.com/api/job/details/?url=https%3A%2F%2Fwww.indeed.co.in%2Frc%2Fclk%3Fjk%3D8fd51fdef5282f41%26fccid%3Da4e4e2eaf26690c9%26vjs%3D3';

    const options = {
    method: "GET",
    url: "https://job-listings.p.rapidapi.com/api/job/details/",
    params: {
        url: "https://www.indeed.co.in/rc/clk?jk=8fd51fdef5282f41&fccid=a4e4e2eaf26690c9&vjs=3",
    },
    headers: {
        "X-RapidAPI-Key": "1c09947a8fmsh3685aa048f22b0cp1f02bejsnf31a4398c036",
        "X-RapidAPI-Host": "job-listings.p.rapidapi.com",
    },
    };

function reducer(state, action){

    switch(action.type){

        case ACTIONS.MAKE_REQUEST:
            return{loading:true, jobs:[] }

        case ACTIONS.GET_DATA:
            return{...state, loading: false, jobs: action.payload.jobs }

        case ACTIONS.ERROR:

        return{...state, loading: false, error: action.payload.error, jobs:[] }

        default:

        return state
    }

}
export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, {jobs:[], loading: true})
    useEffect(() => {
        dispatch({type: ACTIONS.MAKE_REQUEST})
        axios.get(options, {

            params: {markdown: true, page: page, ...params}
        }).then(res => {
            dispatch({type: ACTIONS.GET_DATA, payload: {jobs: res.data}})

        }).catch(e => {

            dispatch({type: ACTIONS.ERROR, payload: {error : e}})
        })

    }, [params, page])
  return state
    


}
