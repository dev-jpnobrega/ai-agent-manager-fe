import React, { useState, useRef, useEffect } from 'react';

import { Fab, CircularProgress } from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useStyles } from './styles';

const mimeType = "audio/webm";

export const Audio = ({ pushChatMessage }) => {
  const classes = useStyles();

  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [stream, setStream] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const onStartListening = async (event) => {
    if (!isMicrophoneAvailable) {
      console.log('Microphone is not available.')
      return
    }

    const streamData = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    setStream(streamData)

    const media = new MediaRecorder(streamData, { type: mimeType });

    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);

    await SpeechRecognition.startListening({
      language: 'pt-BR',
      continuous: true,
    });
  }

  const stopRecording = () => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop()
      })

      const audioBlob = new Blob(audioChunks, { type: mimeType });

      const audioUrl = URL.createObjectURL(audioBlob);
      handleSentAudio(transcript, audioUrl)
      setAudioChunks([]);

    };

    SpeechRecognition.stopListening();
  };

  const handleSentAudio = (transcript, audioUrl = null) => {
    const message = {
      content: transcript,
      audioUrl,
      role: 'User',
      type: 'audio',
      name: 'Username'
    }

    resetTranscript()

    pushChatMessage(message)
  }

  return (
    <>
      {browserSupportsSpeechRecognition &&
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Fab
              aria-label="save"
              color="primary"
              className={classes.fab}
              onClick={onStartListening}
            >
              { listening ? 
                <SendIcon fontSize='small' /> :
                <MicOutlinedIcon fontSize='small' />
              }
            </Fab>
            {listening && <CircularProgress
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