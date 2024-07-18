import  { useEffect, useState } from 'react';
import axios from 'axios';
import CustomersTable from './CustomersTable';
import TransactionsChart from './TransactionsChart';

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const customersRes = await axios.get('http://localhost:5000/customers');
      const transactionsRes = await axios.get('http://localhost:5000/transactions');
      setCustomers(customersRes.data);
      setTransactions(transactionsRes.data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <CustomersTable
        customers={customers}
        transactions={transactions}
        setSelectedCustomer={setSelectedCustomer}
      />
      {selectedCustomer && (
        <TransactionsChart
          transactions={transactions.filter(t => t.customer_id === selectedCustomer.id)}
        />
      )}
    </div>
  );
}

export default App;
