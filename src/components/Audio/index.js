import React, { useState, useRef, useEffect } from 'react';

import { Fab, CircularProgress } from '@material-ui/core';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';

import { useStyles } from './styles';

const mimeType = "audio/webm";

export const Audio = ({ handleUploadFiles }) => {
  const classes = useStyles();

  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recorderSupported, setRecorderSupported] = useState(true);

  useEffect(() => {
    if (!window.MediaRecorder) {
      setRecorderSupported(false);
    }
  }, [])

  const getMicrophonePermission = async () => {
    if (permission) return startRecording(stream)

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(streamData);
      startRecording(streamData);
    } catch (err) {
      alert(err.message);
    }
  };

  const startRecording = async (stream) => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const onStartSpeaking = () => {
    if (window && window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak({ rate: 1.2, text: 'dddddddddd' });
    }

    const windowsExisting = window ? true : false;

    if (windowsExisting && window && window.speechSynthesis && window.speechSynthesis.speaking) {
      const r = setInterval(() => {
        console.log(`window.speechSynthesis.speaking`, window.speechSynthesis.speaking);
        if (!window.speechSynthesis.speaking) {
          clearInterval(r);
        } else {
          window && window.speechSynthesis && window.speechSynthesis.pause();
          window && window.speechSynthesis && window.speechSynthesis.resume();
        }
      }, 14000);
    }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop()
      })

      const audioBlob = new Blob(audioChunks, { type: mimeType });

      const audioUrl = URL.createObjectURL(audioBlob);
      handleUploadFiles([audioUrl], 'audio')
      setAudioChunks([]);
    };
  };

  const handleRecordingClick = () => {
    getMicrophonePermission()
  }

  return (
    <>
      {recorderSupported &&
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Fab
              aria-label="save"
              color="primary"
              className={classes.fab}
              onClick={handleRecordingClick}
            >
              <MicOutlinedIcon fontSize='small' />
            </Fab>
            {recordingStatus === 'recording' && <CircularProgress
              size={50}
              className={classes.fabProgress}
              onClick={stopRecording}
            />}
          </div>
        </div>
      }
    </>
  )
}