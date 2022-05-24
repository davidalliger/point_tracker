import { useState, useEffect } from "react";
import { createTransaction } from "../../../store/transactions";
import { useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { getBalances } from "../../../store/balances";

const CreateTransaction = () => {
    const [payer, setPayer] = useState('');
    const [points, setPoints] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const transaction = {
            payer,
            points: Number(points),
            timestamp
        }
        const data = await dispatch(createTransaction(transaction));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            await dispatch(getBalances());
            history.push('/transactions');
        }
    }

    useEffect(() => {
        if (errors?.length) {
            setShowErrors(true);
        }
    }, [errors]);

    return (
        <div className='page'>
            <h2>Add Transaction</h2>
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
                <div className="form-content">
                    <form className='form'
                        onSubmit={handleSubmit}
                    >
                        <div className="label">
                            <label>
                                Payer:
                            </label>
                        </div>
                        <div>
                            <input
                                className="input"
                                type='text'
                                onChange={e => setPayer(e.target.value)}
                                value={payer}
                            />
                        </div>
                        <div className="label">
                            <label>
                                Points:
                            </label>
                        </div>
                        <div>
                            <input
                                className="input"
                                type='number'
                                onChange={e => setPoints(e.target.value)}
                                value={points}
                            />
                        </div>
                        <div className="label">
                            <label>
                                Date and Time:
                            </label>
                        </div>
                        <div>
                            <input
                                className="input"
                                type='datetime-local'
                                onChange={e => setTimestamp(e.target.value)}
                                value={timestamp}
                            />
                        </div>
                        <div className='form-button'>
                            <button>
                                Submit
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

export default CreateTransaction;
