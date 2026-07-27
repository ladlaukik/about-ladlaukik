import SlideOverlay from '../shared/SlideOverlay.jsx';
import '../shared/template-media.css';
import image from './image.jpg';

export default function Slide({ index, total }) {
  return (
    <div className="template-slide">
      <img className="template-media" src={image} alt="" />
      <SlideOverlay
        title="Full-image template"
        description={[
          'Swap image.jpg in this folder for the real photo.',
          'Edit the title, description, and topicName below.',
          'Image always fills the frame, never stretched.',
        ]}
        topicName="Template"
        index={index}
        total={total}
      />
    </div>
  );
}
