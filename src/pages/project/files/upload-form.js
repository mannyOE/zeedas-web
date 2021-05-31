import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  DialogContainer,
  TextWrapper,
  UploadButton,
  Text,
  CompleteButton,
  ThumbnailContainer,
  Thumbnail,
  ThumbnailWrapper,
} from "./style";
import documentImg from "../../../zeedas-assets/images/logos/zeedas-logo-placeholder.svg";
import {
  openUploadWidget,
  createPDFThumbnail,
  uploadTestVideos,
} from "../../../services/file.service";
import { Progress } from "reactstrap";
import { TickIcon } from "../../../zeedas-assets/icons/icon-tick";

export const UploadDialog = (props) => {
  const { projectId, handleComplete } = props;
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);
  const [progress, setProgress] = useState({});
  const inputRef = useRef(null);

  const openFileWidget = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const uploadProgress = (name, currentProgress) => {
      setProgress({ ...progress, [name]: currentProgress });
    };

    const [preview] = filesPreview.reverse();

    if (preview) {
      const { file, name } = preview;
      uploadTestVideos(
        file,
        "upload",
        [`files-${projectId}`],
        "raw",
        uploadProgress,
        name,
        (error, file) => {
          if (!error) {
            if (file.event === "success") {
              setFiles([...files, file.info]);
            }
          } else {
          }
        }
      );
    }
  }, [filesPreview]);

  const beginUpload = () => {
    const uploadOptions = {
      cloudName: "zeedas",
      tags: [`files-${projectId}`],
      resource_type: "raw",
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, file) => {
      if (!error) {
        if (file.event === "success") {
          setFiles([...files, file.info]);
        }
      } else {
       
      }
    });
  };

  useMemo(() => {}, [filesPreview]);

  const handleFileUpload = (event) => {
    const [file] = event.target.files;
    const { name } = file;
    const [ext] = name.split(".").reverse();
    if (["pdf", "docx", "doc"].includes(ext)) {
      if (ext === "pdf") {
        const fileReader = new FileReader();
        fileReader.onload = function () {
          var typedarray = new Uint8Array(this.result);
          createPDFThumbnail(typedarray).then((image) => {
            setFilesPreview([
              ...filesPreview,
              { name, preview: image, file, name, type: ext },
            ]);
          });
        };

        fileReader.readAsArrayBuffer(file);
      } else {
        setFilesPreview([
          ...filesPreview,
          { name, preview: documentImg, file, name, type: ext },
        ]);
      }
    } else {
      setFilesPreview([
        ...filesPreview,
        { name, preview: URL.createObjectURL(file), file, name, type: ext },
      ]);
    }
  };

  const onComplete = () => {
    handleComplete(files);
    setFiles([]);
  };

  const generatedThumbnails = (() => {
    return filesPreview.map(({ preview, name }) => (
      <ThumbnailWrapper className="m-1" key={name}>
        {progress[name] === 100 && <TickIcon />}
        <Thumbnail>
          <img src={preview} alt={name} />
        </Thumbnail>
        <Progress color="success" animated value={progress[name] || 0} />
      </ThumbnailWrapper>
    ));
  })();

  return (
    <DialogContainer>
      <TextWrapper>
        <p>Upload contract documents</p>{" "}
        <UploadButton onClick={openFileWidget}>Upload</UploadButton>
      </TextWrapper>
      <Text>Uploaded Documents</Text>
      <ThumbnailContainer>{generatedThumbnails}</ThumbnailContainer>
      <CompleteButton onClick={onComplete}>Complete</CompleteButton>
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        multiple="false"
        style={{ visibility: "hidden" }}
        ref={inputRef}
      />
    </DialogContainer>
  );
};
