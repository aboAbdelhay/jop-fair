import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import PropTypes from 'prop-types';

function TransactionsChart({ transactions }) {
  const data = {
    labels: transactions.map(t => t.date),
    datasets: [
      {
        label: 'Total Transaction Amount',
        data: transactions.map(t => t.amount),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={data} />;
}

TransactionsChart.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer_id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionsChart;
