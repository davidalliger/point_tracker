import { Redirect } from 'react-router-dom';

export const handleResponse = async(response) => {
    if (response.status === 404) {
        return <Redirect to='/not-found' />;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return { 'errors': ['An error has occurred. Please try again.'] };
    }
}
