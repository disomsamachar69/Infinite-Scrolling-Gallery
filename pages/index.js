// pages/index.js
import ImageGallery from '../components/ImageGallery';
import styles from '../styles/Home.module.css'; // Import the CSS module

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Infinite Scrolling Gallery</h1>
      <ImageGallery />
    </div>
  );
}
