import { formatMinutes, formatSeconds } from "../../helpers/soundHelpers";

import "../../styles/recorder-controls.css"

export default function RecorderControls({ recorderState, handlers}) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="controls-container" >
      <div className="recorder-display">
        <div className="recording-time">
          {initRecording && <div className="recording-indicator"></div>}
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </div>
        {initRecording && (
          <div className="cancel-button-container">
            <button className="cancel-button" title="Cancel recording" onClick={cancelRecording}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="start-button-container">
        {initRecording ? (
          <div data-role="controls">
            <button
              data-recording="true"
              className="save-button"
              title="Save recording"
              disabled={recordingSeconds === 0}
              onClick={saveRecording}
              >
              Stop
            </button>
          </div>
        ) : (
          <div data-role="controls">
            <button onClick={startRecording} className="start-button">
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}