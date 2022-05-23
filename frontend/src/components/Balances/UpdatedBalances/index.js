import { Link } from 'react-router-dom';

const UpdatedBalances = (updates) => {
    return (
        <div>
            <div>
                {updates.map((update, index) => (
                    <div key={index}>
                        {update}
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
