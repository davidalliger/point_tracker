import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotal, updateBalances } from "../../store/balances";
import { Redirect, Link } from 'react-router-dom';

const SpendPoints = () => {
    const totalPoints = useSelector(state => state.balances.totalPoints);
    const [points, setPoints] = useState('');
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [updates, setUpdates] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(points);
        const data = await dispatch(updateBalances({points}));
        await dispatch(getTotal());
        if (data.errors) {
            setErrors(data.errors);
        } else {
            console.log(data);
            setUpdates(data);
        }
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    useEffect(() => {
        if (updates) {
            setUpdated(true)
        }
    }, [updates])


    if (updated) {
        console.log(updates);
        return <Redirect to={{pathname: '/balances/updated', state:{updates: updates}}} />
    }

    return (
        <div className='page'>
            <h2>Spend Points</h2>
            {showErrors && (
                <div className='errors'>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className='form-content'>
                <div className='info'>
                    <p><span className='bold'>Total Points:</span> {totalPoints}</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='label'>
                        <label>
                            Amount:
                        </label>
                    </div>
                    <input
                        className='input'
                        type='number'
                        onChange={e => setPoints(e.target.value)}
                        value={points}
                    />
                    <div className='form-button'>
                        <button>
                            Spend
                        </button>
                    </div>
                </form>
            </div>
            <Link to='/'>
                <button>
                    Home
                </button>
            </Link>
        </div>
    )
}

export default SpendPoints;
