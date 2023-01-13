import RecorderControls from '../components/Sounds/RecorderControls';
import SoundForm from '../components/Sounds/SoundForm';
import SoundList from '../components/Sounds/SoundList';

import useRecorder from '../hooks/useRecorder';
import useRecordingsList from '../hooks/useRecordingsList';

function Sounds() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const { recordings, deleteAudio } = useRecordingsList(audio);

    return (
      <section className="App">
      <div className="recorder-container">
      
        {recordings.length === 0 && 
        <>
          <h1 className="title">Alarm Tones</h1>
          <RecorderControls recorderState={recorderState} handlers={handlers} />
        </>
        }
        <SoundForm recordings={recordings} deleteAudio={deleteAudio} />
      </div>
      <SoundList />
    </section>
    );
}

export default Sounds;