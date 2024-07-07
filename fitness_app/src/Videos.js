import './Videos.css';
import React, { useRef } from 'react';

function Videos() {
  const yogaRef = useRef(null);
  const exerciseRef = useRef(null);
  const cardioRef = useRef(null);
  const absRef = useRef(null);
  const facialRef = useRef(null);

  const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className='Videos' style={{minWidth: '96vw', minHeight: '100vh', maxHeight:"fit-content" , maxWidth:'fit-content'}}>
      <br></br><br></br><h1>INSTRUCTIONAL VIDEOS</h1>
      <div className='container' >
        <div className='btn-container'>
            <button className='vid_btn' onClick={() => scrollToRef(yogaRef)}>YOGA</button><br></br>
            <button className='vid_btn' onClick={() => scrollToRef(exerciseRef)}>WEIGHT LOSS EXERCISE</button><br></br>
            <button className='vid_btn' onClick={() => scrollToRef(cardioRef)}>CARDIO WORKOUT</button><br></br>
            <button className='vid_btn' onClick={() => scrollToRef(facialRef)}>FACIAL EXERCISE</button><br></br>
            <button className='vid_btn' onClick={() => scrollToRef(absRef)}>AB WORKOUT</button><br></br><br></br>
        </div>
        <div className='img-container'>
            <img src="videos.gif" />
        </div>
      </div>

      <div>
        <h1 id="yoga" ref={yogaRef}>YOGA</h1>
        <div className="yoga">
          <iframe title="yoga video" src="https://www.youtube.com/embed/kFhG-ZzLNN4?autoplay=0&controls=1"></iframe>
        </div>

        <h1 id="cardio" ref={cardioRef}>CARDIO WORKOUT</h1>
        <div className="cardio">
          <iframe title="cardio video" src="https://www.youtube.com/embed/dj03_VDetdw?autoplay=0&controls=1"></iframe>
        </div>

        <h1 id="exercise" ref={exerciseRef}>WEIGHT LOSS EXERCISE</h1>
        <div className="exercise">
          <iframe title="exercise video" src="https://www.youtube.com/embed/gC_L9qAHVJ8?autoplay=0&controls=1"></iframe>
        </div>

        <h1 id="abs" ref={absRef}>ABS WORKOUT</h1>
        <div className="abs">
          <iframe title="abs video" src="https://www.youtube.com/embed/6OzGTeCc6J8?autoplay=0&controls=1"></iframe>
        </div>

        <h1 id="facial" ref={facialRef}>FACIAL EXERCISE</h1>
        <div className="facial">
          <iframe title="facial video" src="https://www.youtube.com/embed/RVTnQMtBGTU?autoplay=0&controls=1"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Videos;