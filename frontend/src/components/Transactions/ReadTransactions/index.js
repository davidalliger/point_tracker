import { useSelector } from 'react-redux';

const ReadTransactions = () => {
    const transactionState = useSelector(state => state.transactions);
    const transactions = Object.values(transactionState);
    return (
        <div>
            <div>
                {transactions.map((transaction, index) => (
                    <div key={index}>
                        {transaction}
                    </div>
                ))}
            </div>
            <Link to='/transactions/new'>
                <button>
                    Add Transaction
                </button>
            </Link>
        </div>
    )
}

export default ReadTransactions;
