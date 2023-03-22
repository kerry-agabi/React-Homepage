import React from 'react';
import { useReducer, useEffect } from 'react';
import firebase from './firebase';
import 'firebase/firestore';
const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] };
    default:
      return state;
  }
}
function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    const jobsCollectionRef = firebase.firestore().collection('jobs');
    let query = jobsCollectionRef;

    if (params.company) {
      query = query.where('company', '==', params.Company);
    }

    if (params.location) {
      query = query.where('location', '==', params.Location);
    }

    if (page) {
      const pageSize = 1;
      const startAfter = page * pageSize;
      query = query.orderBy('date').startAt(startAfter).limit(pageSize);
    }

    query.get().then((snapshot) => {
      if (snapshot.empty && page) {
        // If there is no data for the current page, reduce the page number and fetch the previous page
        useFetchJobs(params, page - 1);
      } else {
        const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs } });
      }
    }).catch((error) => {
      dispatch({ type: ACTIONS.ERROR, payload: { error } });
    });
  }, [params, page]);

  return state;
}

export default useFetchJobs;