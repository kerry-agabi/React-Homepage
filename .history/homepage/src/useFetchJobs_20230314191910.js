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

    // Get a reference to the Firestore collection
    const jobsCollectionRef = firebase.firestore().collection('jobs');

    // Build the query using the provided params
    let query = jobsCollectionRef;
    if (params.company) {
      query = query.where('company', '==', params.Company);
    }
    if (params.location) {
      query = query.where('location', '==', params.Location);
    }

    // Paginate the results if a page number is provided
    if (page) {
      const pageSize = 10;
      query = query.orderBy('date').startAt(page * pageSize).limit(pageSize);
    }

    // Execute the query and update state with the results
    query
      .get()
      .then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs } });
      })
      .catch((error) => {
        dispatch({ type: ACTIONS.ERROR, payload: { error } });
      });
  }, [params, page]);

  return state;
}

export default useFetchJobs;