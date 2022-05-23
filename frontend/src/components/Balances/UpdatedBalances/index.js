import { useSelector } from 'react-redux';

const UpdatedBalances = (updates) => {
    return (
        <div>
            <div>
                {balances.map((balance, index) => (
                    <div key={index}>
                        {balance}
                    </div>
                ))}
            </div>
            <Link to='/spend'>
                <button>
                    Spend More Points
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

export default UpdatedBalances;
