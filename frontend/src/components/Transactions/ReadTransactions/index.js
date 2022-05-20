import { useSelector } from 'react-redux';

const ReadTransactions = () => {
    const transactions = useSelector(state => state.transactions);
    console.log(transactions);
    return (
        <div>
            <div>
                {transactions.map((transaction, index) => (
                    <div key={index}>
                        {transaction}
                    </div>
                ))}
            </div>
            <button>Add Transaction</button>
        </div>
    )
}

export default ReadTransactions;
