import React, { useState, useEffect } from 'react';
import {
  Container,
  BodyCentered,
  Preview,
  PreviewHeader,
  PreviewBody,
  FilesContent,
} from './style';
import { Container as Floating, Button } from 'react-floating-action-button';
import IconPlus from '../../../zeedas-assets/icons/icon-plus';
import colors from '../../../utils/colors';
import ZeedasModal from '../../../zeedas-components/modal';
import { UploadDialog } from './upload-form';
import { fetchFiles, createLink } from '../../../services/file.service';
import PageLoader from '../../../zeedas-components/page-loader';
import pdfImage from '../../../zeedas-assets/icons/pdf.svg';
import photoImg from '../../../zeedas-assets/icons/photo.svg';
import documentImg from '../../../zeedas-assets/images/logos/zeedas-logo-placeholder.svg';
import EmptyRecordMessage from '../../../zeedas-components/empty-record-message';
import { Link } from 'react-router-dom';

const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

export const Files = (props) => {
  const { projectId } = props;

  const [showModel, setShowModel] = useState(false);
  const [files, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const currentThumbnails = files.map((file) => {
      const link = createLink(file);
      const ext = link.split('.').reverse()[0];
      if (imgTypes.includes(ext)) {
        return { url: link, type: 'image' };
      } else if (ext === 'pdf') {
        return { url: link, type: 'pdf' };
      } else {
        return { url: link, type: 'doc' };
      }
    });
    setThumbnails(currentThumbnails);
  }, [files]);

  useEffect(() => {
    setIsFetching(true);
    fetchFiles(`files-${projectId}`, (response) => {
      setFiles(response);
      setIsFetching(false);
    });
  }, []);

  const handleComplete = (newFiles) => {
    setFiles([...files, ...newFiles]);
    setShowModel(false);
  };

  const createFilesViews = () => {
    return thumbnails.map(({ url, type }) => {
      const fileName = url.split('/').reverse()[0];
      return (
        <Preview key={fileName}>
          <PreviewHeader>
            {type === 'image' && <img src={photoImg} width={20} height={20} />}
            {type === 'pdf' && <img src={pdfImage} width={20} height={20} />}
            {type === 'doc' && <img src={documentImg} width={20} height={20} />}
            <div className="d-flex flex-column justify-content-start align-items-sm-stretch">
              <p>{fileName}</p>
              <p>{`user name`}</p>
            </div>
          </PreviewHeader>
          <PreviewBody>
            {type === 'image' && <img src={url} alt={fileName} />}
            {type !== 'image' && <img src={documentImg} alt={fileName} />}
          </PreviewBody>
        </Preview>
      );
    });
  };

  return (
    <>
      <Container>
        {isFetching && (
          <BodyCentered>
            <PageLoader />
          </BodyCentered>
        )}
        {!isFetching && thumbnails.length === 0 && (
          <BodyCentered>
            <EmptyRecordMessage
              callAction={() => setShowModel(true)}
              display="none"
              width={194}
              textWidth="336px"
              message="You don't have any Files yet"
              btnText="Add New File"
              showActionButton={false}
            />
          </BodyCentered>
        )}
        {!isFetching && thumbnails.length > 0 && (
          <FilesContent>{createFilesViews()}</FilesContent>
        )}
        <Floating>
          <Button
            className="fab-item btn btn-link btn-lg text-white"
            styles={{ backgroundColor: colors.ZEEDAS_BLUE }}
            onClick={() => setShowModel(true)}
          >
            <IconPlus />
          </Button>
        </Floating>
        <ZeedasModal
          onClose={() => setShowModel(false)}
          open={showModel}
          title="Upload Project Document"
        >
          <UploadDialog projectId={projectId} handleComplete={handleComplete} />
        </ZeedasModal>
      </Container>
    </>
  );
};

export default Files;
