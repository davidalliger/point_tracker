import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTransactions } from '../../../store/transactions';

const ReadTransactions = () => {
    // const dispatch = useDispatch();
    // const [loaded, setLoaded] = useState(false);
    // const [transactions, setTransactions] = useState('');
    // useEffect(() => {
    //     (async() => {
    //         const response = await dispatch(getTransactions());
    //         setTransactions(response);
    //     })();
    // }, [dispatch]);

    // useEffect(() => {
    //     if (transactions) {
    //         setLoaded(true);
    //     }
    // }, [transactions]);
    const transactions = useSelector(state => state.transactions.transactions);
    console.log(transactions);

    return (
        <div className='page'>
            <h2>Transactions</h2>
            <div className='content'>
                {/* {loaded && ( */}
                    <pre>
                        {transactions?.length ? (
                            <div>
                                {JSON.stringify(transactions, null, 2)}
                            </div>
                        ) : (
                            <div>
                                No transactions yet.
                            </div>
                        )}
                    </pre>
                {/* )} */}
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
