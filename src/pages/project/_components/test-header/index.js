import React, { useEffect, useState, useRef } from "react";
import { Header, Brand, MenuBar, MenuItem, Button } from "./style";
import zeedaslogo from "../../../../zeedas-assets/images/logos/zeedas-sidebar-logo.svg";
import AppFeature from "./app-feature-menu";
import { FaStop } from "react-icons/fa";
import { theme } from "../../style";
import { connect } from "react-redux";
import { updateAllTestCases } from "../../../../state/redux/test/actions";
import { updateModule } from "../../../../state/redux/modules/actions";
import { uploadTestVideos } from "../../../../services/file.service";

const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};

const sendMessage = () => {
  window.localStorage.setItem("message", "test-passed");
  window.localStorage.removeItem("message");
};

export const TestHeader = (props) => {
  const {
    showTestCases,
    setShowTestCases,
    moduleId,
    updateModule,
    updateAllTestCases,
  } = props;
  const [isRecording, setIsRecording] = useState(false);
  const [recordedClip, setRecoredClip] = useState();
  const [doneUpdating, setIsUpdating] = useState(false);
  const chunks = useRef([]);
  const recorder = useRef(null);
  const stream = useRef(null);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (doneUpdating) {
      sendMessage();
      window.close();
    }
  }, [doneUpdating]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const recordScreen = async () => {
      try {
        stream.current = await navigator.mediaDevices.getDisplayMedia({
          video: { mediaSource: "screen" },
        });
        recorder.current = new MediaRecorder(stream.current, {
          mimeType: "video/webm;codecs=h264",
        });
        recorder.current.ondataavailable = (e) => chunks.current.push(e.data);
        recorder.current.onstop = (e) => {
          const completeBlob = new Blob(chunks.current, {
            type: chunks.current[0].type,
          });
          const url = URL.createObjectURL(completeBlob);
          setRecoredClip(completeBlob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = `test.webm`;
          a.click();
          window.URL.revokeObjectURL(url);
        };

        recorder.current.start();
      } catch (error) {
        if (recorder.current && stream.current) {
          recorder.current.stop();
          stream.current.getVideoTracks()[0].stop();
        }
        setIsRecording(false);
      }
    };
    if (isRecording) {
      recordScreen();
    } else {
      if (recorder.current && stream.current) {
        recorder.current.stop();
        stream.current.getVideoTracks()[0].stop();
      }
    }
  }, [isRecording]);

  const handleAccept = () => {
    updateAllTestCases();
    updateModule(moduleId, { status: "completed", state: null });
    setTimeout(() => {
      setIsUpdating(true);
    }, 1000);
  };

  const handleReject = async () => {
    const file = blobToFile(recordedClip, "test.webm");

    await uploadTestVideos(file, "module_test_uploads");
    setTimeout(() => {
      setIsUpdating(true);
    }, 1000);
  };

  return (
    <Header>
      <Brand>
        <img src={zeedaslogo} alt="zeedas logo" />
      </Brand>
      <MenuBar>
        <MenuItem>
          <AppFeature></AppFeature>
        </MenuItem>
        {!isRecording && (
          <MenuItem onClick={() => setIsRecording(true)}>
            Start Recording
          </MenuItem>
        )}
        {isRecording && (
          <MenuItem onClick={() => setIsRecording(false)}>
            <FaStop color={theme.colors.$zdRed} /> Stop Recording
          </MenuItem>
        )}
        <MenuItem onClick={() => setShowTestCases(!showTestCases)}>
          Test Cases
        </MenuItem>
        <MenuItem onClick={handleReject}>Reject</MenuItem>
        <MenuItem>
          <Button onClick={handleAccept}>Accept</Button>
        </MenuItem>
      </MenuBar>
    </Header>
  );
};

export default connect(null, { updateAllTestCases, updateModule })(TestHeader);
