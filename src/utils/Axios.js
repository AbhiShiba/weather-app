import axios from 'axios';

const Axios = async (url) => {
    const response = await axios.get(url);
    return response;
}

export default Axios;