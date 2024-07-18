import  { useState } from 'react';
import PropTypes from 'prop-types';

function CustomersTable({ customers, transactions, setSelectedCustomer }) {
  const [filter, setFilter] = useState({ name: '', amount: '' });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(filter.name.toLowerCase())
  );

  const filteredTransactions = transactions.filter(transaction =>
    (filter.amount === '' || transaction.amount >= filter.amount) &&
    filteredCustomers.some(customer => customer.id === transaction.customer_id)
  );

  const getCustomerName = id => customers.find(customer => customer.id === id)?.name || '';

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter.name}
        onChange={e => setFilter({ ...filter, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Filter by amount"
        value={filter.amount}
        onChange={e => setFilter({ ...filter, amount: e.target.value })}
      />
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id} onClick={() => setSelectedCustomer(customers.find(c => c.id === transaction.customer_id))}>
              <td>{getCustomerName(transaction.customer_id)}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CustomersTable.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer_id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSelectedCustomer: PropTypes.func.isRequired,
};

export default CustomersTable;
