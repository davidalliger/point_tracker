import { Link, Redirect, useLocation } from 'react-router-dom';

const UpdatedBalances = () => {
    const location = useLocation();
    let updates;
    if (location.state && location.state.updates) {
        updates = location.state.updates;
    }
    if (!updates) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <div>
                <pre>
                    {JSON.stringify(updates, null, 4)}
                </pre>
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
