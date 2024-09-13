import axios from "axios";
import Notiflix from "notiflix";

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '45476172-6bbda7ba5ec4a4fe36c5c9968';




// getting images from server
export async function getImage(query, page) {
    try {
      const res = await axios.get(ENDPOINT, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: page,
          per_page: 40,
        },
      });
      const totalHits = res.data.totalHits;
      if(totalHits > 0) {
         Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
      }
      else {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
     
      return res.data.hits;
    } catch (error) {
      error = Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      throw error; 
    }
};