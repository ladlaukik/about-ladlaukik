import SlideOverlay from '../shared/SlideOverlay.jsx';
import '../shared/template-media.css';
import video from './video.mp4';

export default function Slide({ index, total }) {
  return (
    <div className="template-slide">
      <video
        className="template-media"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
      <SlideOverlay
        title="Full-video template"
        description={[
          'Swap video.mp4 in this folder for the real clip.',
          'Autoplays muted and loops for a talk-safe background.',
          'Video always fills the frame, never stretched.',
        ]}
        topicName="Template"
        index={index}
        total={total}
      />
    </div>
  );
}
