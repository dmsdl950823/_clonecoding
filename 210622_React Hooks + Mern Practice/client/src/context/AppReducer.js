// Reducer

export default (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS': // get data
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTIONS': // delete data
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTIONS': // add data
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR': // error handler
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
