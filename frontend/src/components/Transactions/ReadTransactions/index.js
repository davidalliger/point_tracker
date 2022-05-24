import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ReadTransactions = () => {
    const transactions = useSelector(state => state.transactions.transactions);

    console.log('transactions ', transactions);

    return (
        <div className='page'>
            <h2>Transactions</h2>
            <div className='content'>
                <pre>
                    {JSON.stringify(transactions, null, 2)}
                </pre>
            </div>
            <Link to='/transactions/new'>
                <button>
                    Add Transaction
                </button>
            </Link>
            <Link to='/'>
                <button>
                    Home
                </button>
            </Link>
        </div>
    )
}

export default ReadTransactions;
