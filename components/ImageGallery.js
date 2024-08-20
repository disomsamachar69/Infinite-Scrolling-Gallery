// components/ImageGallery.js
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import { fetchImages } from '../utils/pexels';

// Set up modal styles
Modal.setAppElement('#__next');

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    loadMoreImages();
  }, []);

  const loadMoreImages = async () => {
    const newImages = await fetchImages(page);
    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setCurrentImage(image.src.large);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  const downloadImage = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more images to show</p>}
      >
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img
                src={image.src.medium}
                alt={image.photographer}
                onClick={() => openModal(image)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        className="Modal"
        overlayClassName="Overlay"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {currentImage && <img src={currentImage} alt="Preview" style={{ width: '100%' }} />}
      </Modal>
    </>
  );
};

export default ImageGallery;
