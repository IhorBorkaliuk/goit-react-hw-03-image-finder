import axios from "axios";
import Notiflix from 'notiflix';


axios.defaults.baseURL = ' https://pixabay.com/api';

const API_KEY = '29728762-2a6b84e3d27132460ba58a3d0';

const findImages = async (query, page) => {
try {
        const response = await axios.get(
          `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    
    return response.data
} catch (error) {
    Notiflix.Notify.failure('Виникла помилка, будь ласка, спробуйте ще раз.');
}
}

export default findImages