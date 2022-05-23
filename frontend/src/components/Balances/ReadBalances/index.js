import { useSelector } from 'react-redux';

const ReadBalances = () => {
    const balanceState = useSelector(state => state.balances);
    const balances = Object.values(balanceState);
    return (
        <div>
            <div>
                {balances.map((balance, index) => (
                    <div key={index}>
                        {balance}
                    </div>
                ))}
            </div>
            {/* <Link to='/balances/new'>
                <button>
                    Add Balance
                </button>
            </Link> */}
        </div>
    )
}

export default ReadBalances;
