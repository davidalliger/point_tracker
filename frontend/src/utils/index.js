export const handleResponse = async(response) => {
    if (response.status === 404) {
        //TODO
    } else if (response < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error has occurred. Please try again.'];
    }
}
