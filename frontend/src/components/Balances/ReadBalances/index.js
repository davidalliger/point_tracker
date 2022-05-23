import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ReadBalances = () => {
    const balanceState = useSelector(state => state.balances.balances);
    // const balances = Object.values(balanceState);
    return (
        <div>
            <div>
                <pre>
                    {JSON.stringify(balanceState, null, 4)}
                </pre>
            </div>
            <Link to='/'>
                <button>
                    Home
                </button>
            </Link>
        </div>
    )
}

export default ReadBalances;
