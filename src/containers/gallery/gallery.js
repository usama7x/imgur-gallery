import React, {useEffect, useState, Fragment} from 'react';
import { Select, Checkbox, Typography  } from 'antd';
import GalleryGrid from 'react-grid-gallery';
import { useSelector, useDispatch } from 'react-redux';
import GalleryActions from '../../services/gallery/actions';
import * as GallerySelectors from '../../services/selectors';
import './gallery.css';
import { CONSTANT_VARIABLES } from '../../utils/constants';

const Gallery = props => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const { Title } = Typography;
    const galleryData = useSelector(state => GallerySelectors.gallery(state));
    const gallery = galleryData ? galleryData.toJS(): [];
    const [gridDataSource, setGridDataSource] = useState([]);
    const [currentImage, setCurrentImage] = useState({});
    const [galleryParams, setGalleryParams] = useState({
        section: 'hot',
        window: 'day',
        sort: 'viral',
        showViral: true,
    });

    useEffect(() => {
        dispatch(GalleryActions.fetchGallery({ galleryParams }));
    }, [dispatch, galleryParams]);

    useEffect(() => {
        if(gallery.some(image => image)) {
           setGridDataSource(gallery.map(i => ({
                src: getImageUrl(i),
                thumbnail: getImageUrl(i),
                thumbnailWidth: 40,
                thumbnailHeight: 30,
                caption: getCaption(i),
                thumbnailCaption: getThumbnailCaption(i),
            })));
        }
    }, [galleryData]);


    const handleSectionChange = section => setGalleryParams(params => ({...params, section: section}));

    const handleWindowChange = window => setGalleryParams(params => ({...params, window: window}));

    const handleSortChange = sort => setGalleryParams(params => ({...params, sort: sort}));

    const getCaption = album => album.images 
                                ? album.images[0].description 
                                : album.description 
                                ? album.description 
                                : 'N/A';

    const getThumbnailCaption = album => album.images && album.images[0].description
                                         ? album.images[0].description?.slice(0,30) + '...' 
                                         : album.description
                                         ? album.description?.slice(0,30) + '...' 
                                         : 'N/A';
    const getImageUrl = album => {
        if(album?.images) {
            return album.images[0].link;
        } else if(album.link) {
            return album.link;
        } else {
            return CONSTANT_VARIABLES.DEFAULT_IMAGE;
        }
    };
    const imageInfo =[ 
        <div>
            <h2 id="imageTitle">{currentImage.title ? currentImage.title : currentImage.images[0].title ? currentImage.images[0].title : 'Title Not Available.'}</h2>

            {/* <h2 id="imageTitle">{currentImage.images && currentImage.images.length > 0 ? currentImage.images[0].title : currentImage.title ? currentImage.title : 'Title Not Available.'}</h2> */}
            <h6 className="votes">Upvotes: {currentImage.ups}</h6>
            <h6 className="votes">Downvotes: {currentImage.downs}</h6>
            <h6 id="score">Score: {currentImage.score}</h6>
        </div>
    ];
    return (
        <Fragment>
          <div id="filtersContainer">
            <Title style={{marginTop: 5}} level="5">Imgur Gallery</Title>
            <div className="block">
              <label>Section:</label>
              <Select defaultValue="hot" style={{ width: 120 }} className="block" onChange={handleSectionChange}>
                <Option value="hot">Hot</Option>
                <Option value="top">Top</Option>
                <Option value="user">User</Option>
              </Select>
            </div>
            <div className="block">
              <label>Sort:</label>
              <Select disabled={galleryParams.section !== 'user'} defaultValue="viral" className="block" style={{ width: 120 }} onChange={handleSortChange}>
                <Option value="viral">Viral</Option>
                <Option value="top">Top</Option>
                <Option value="time">Time</Option>
                <Option value="rising">Rising</Option>
              </Select>
            </div>    
            <div className="block">
              <label>Window:</label>
              <Select disabled={galleryParams.section !== 'top'} defaultValue="day" className="block" style={{ width: 120 }} onChange={handleWindowChange}>
                <Option value="day">Day</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
            </div>
            <div className="block">
              <label style={{marginBottom: 0, marginTop: 15}}>Show Viral:</label>
              <Checkbox 
                className="block"
                checked={galleryParams.showViral} 
                onChange={x => setGalleryParams(params => ({...params, showViral: x.target.checked }))}>
              </Checkbox>                
        </div>
            <div style={{
                display: "block",
                minHeight: "1px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto",
                textAlign: "center",
                background: "white"
            }}>
                <GalleryGrid
                    rowHeight={250}
                    images={gridDataSource}
                    enableImageSelection={false}
                    currentImageWillChange={index => setCurrentImage(gallery[index])}
                    customControls={imageInfo}
                />
            </div>
        </div>

        </Fragment>
    );
}

export default Gallery;