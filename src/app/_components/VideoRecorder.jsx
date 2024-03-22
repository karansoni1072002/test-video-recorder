'use client';
import { ReactMediaRecorder } from "react-media-recorder";
import { useEffect, useRef, useState } from 'react';

const VideoPreview = (props) => {
  const stream = props.stream;
  console.log(stream)
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream])
  if (!stream) {
    return null;
  }
  return (
    <div className="text-white h-full">
      <video id="livePreview" ref={videoRef} className="h-full" autoPlay />
    </div>
  );

}
function liveStream(stream) {
  const previewStream = stream;
  if (previewStream != null) {
    return <VideoPreview stream={previewStream} />
  }
}
function download(mediaBlobUrl) {
  if (mediaBlobUrl != null) {
    return (
      <a href={mediaBlobUrl} download="apoorv.mp4">
        <button id="mediaDownload" className="bg-white" >
          download
        </button>
      </a>
    )
  }

}
function Dwn() {

  useEffect(() => {
    const a = document.getElementById("mediaDownload")
    if (a) {
      a.click()
    }
  })
  return <></>
}

function liveStreamWrapper(previewStream, fn, status) {
  //console.log(status)
  if (status != 'stopped') {
    return fn(previewStream)
  }
}
function recordedVideo(mediaBlob, status) {
  //console.log(status)
  if (status == 'stopped') {
    return <div className=""><video className="h-full" src={mediaBlob} controls></video></div>
  }
}
export function VideoRecorder({ videoSaveHandler }) {
  let [audioOnOff, setAudio] = useState('true')

  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false)
  const recordingButtonHandler = (startRecording) => {
    startRecording()
    setIsRecording(true)
  }
  function stopRecordingWrapper(stopRecording) {

    //document.getElementById("livePreview").style.display='hidden'
    stopRecording()
    setIsRecording(false)
    setRecorded(true)
  }
  return (
    <div className="App">
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
          <div className='min-h-[35.25rem] h-full flex flex-col items-center'>

            <div className='flex flex-col items-center h-full'>
              {/* <div className="text-white">Status : {status}</div>
              <div className="text-white">Keep Mic On: {'' + audioOnOff} </div> */}

              {!isRecording && <h1 className="text-lg font-semibold text-white pt-12 flex flex-col justify-center">{recorded ? '' : 'Record a video explaining yourself'}</h1>}

              {liveStreamWrapper(previewStream, liveStream, status)}
              {recordedVideo(mediaBlobUrl, status)}
              <div className={`${recorded ? 'absolute bottom-3 flex gap-4' : 'h-full flex flex-col justify-center'}`}>
                {
                  isRecording ?
                    <button onClick={() => stopRecordingWrapper(stopRecording)} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">Stop Recording</button>
                    :
                    <button onClick={() => recordingButtonHandler(startRecording)} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">{recorded ? 'Record again' : 'Start Recording'}</button>
                }
                {
                  recorded && <button onClick={videoSaveHandler} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">Save</button>
                }
              </div>


              {/* {download(mediaBlobUrl)} */}
            </div>




            {/* {Dwn()} */}



          </div>
        )}
      />
    </div>
  );
}
