export const ActionTypes = {
    FETCH_GALLERY: 'services/gallery/fetch_gallery',
    SET_GALLERY: 'services/gallery/set_gallery'
};

const fetchGallery = ({ galleryParams }) => ({
    galleryParams,
    type: ActionTypes.FETCH_GALLERY,
}); 

const setGallery = ({ gallery }) => ({
    gallery,
    type: ActionTypes.SET_GALLERY,
}); 

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    fetchGallery,
    setGallery
};