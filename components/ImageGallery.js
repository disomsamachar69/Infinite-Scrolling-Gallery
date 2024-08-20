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

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={true}
        loader={<h4 className="text-center text-white">Loading...</h4>}
        endMessage={<p className="text-center text-white">No more images to show</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.src.medium}
                alt={image.photographer}
                onClick={() => openModal(image)}
                className="w-full h-auto cursor-pointer"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="relative bg-white p-4 max-w-screen-sm mx-auto rounded">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
          {currentImage && (
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-auto"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageGallery;
