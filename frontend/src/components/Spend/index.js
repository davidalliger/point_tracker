import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBalances } from "../../store/balances";
import { Redirect } from 'react-router-dom';

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
        <div>
            <h1>Spend Points</h1>
            <p>Total Points: {totalPoints}</p>
            {showErrors && (
                <div>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
            >
                <label>
                    Amount:
                </label>
                <input
                    type='number'
                    onChange={e => setPoints(e.target.value)}
                    value={points}
                />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SpendPoints;
