import { useState } from "react";

const CreateTransaction = () => {
    const [payer, setPayer] = useState('');
    const [points, setPoints] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Add Transaction</h1>
            <form
                onSubmit={handleSubmit}
            >
                <label>
                    Payer:
                </label>
                <input
                    type='text'
                />
                <label>
                    Points:
                </label>
                <input
                    type='number'
                />
                <label>
                    Date:
                </label>
                <input
                    type='date'
                />
                <label>
                    Time:
                </label>
                <input
                    type='time'
                />
            </form>
        </div>
    )
}
