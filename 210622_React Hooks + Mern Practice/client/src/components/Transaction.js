import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Transaction = ({ transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+'
  const { deleteTransactions } = useContext(GlobalContext)

  return (
    <li
      className={transaction.amount < 0 ? 'minus' : 'plus'}
      key={transaction}
    >
    { transaction.text }

    <span>{sign} ${ numberWithCommas(Math.abs(transaction.amount)) }</span>

    <button
      className="delete-btn"
      onClick={() => deleteTransactions(transaction.id)}
    >x</button>
  </li>
  )
}
