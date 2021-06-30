import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

// Initial State
const initialState = {
  transactions: [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
  ],
  error: null,
  loading: true
}

// context 생성
export const GlobalContext = createContext(initialState)

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions
  async function getTransactions () {
    // console.log('get Data!')
    dispatch({ type: 'GET_TRANSACTIONS', payload: state.transactions })
  }
  async function deleteTransactions (id) {
    // console.log(id)
    dispatch({ type: 'DELETE_TRANSACTIONS', payload: id })
  }
  async function addTransactions (data) {
    // console.log(data)
    dispatch({ type: 'ADD_TRANSACTIONS', payload: data })
  }

  const values = {
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransactions,
    addTransactions
  }

  return (
    <GlobalContext.Provider
      value={values}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
