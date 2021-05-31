import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "./style.scss";
import "./prism.css";
import PropTypes from "prop-types";
import IconFullScreen from "zeedas-assets/icons/icon-fullscreen";

import { SELECTION_TYPES } from "../../../../../../state/redux/comment/types";
import CommentsIcon from "../../../../../../zeedas-assets/icons/icon-comments";
import colors from "../../../../../../utils/colors";

const CodeReviewEditor = (props) => {
  const {
    /* inputs */
    comments = [],
    reviewFile,
    selectedLines = [],
    selectionType,
    fullScreen,
    /* handlers */
    onSelectLine,
    onHighlightLines,
    onCommentStart,
    onCommentSelect,
    onToggleFullScreen,
  } = props;

  const [fileTxt, setFileTxt] = useState([]);
  const [textIsHighlighted, setTextIsHighlighted] = useState(false);
  const [fileComments, setFileComments] = useState([]);

  const codeLineRefs = {};

  const refAssigner = (instance, key, refStore) => {
    if (instance === null) {
      // eslint-disable-next-line no-param-reassign
      delete refStore[key];
    } else {
      // eslint-disable-next-line no-param-reassign
      refStore[key] = instance;
    }
  };

  const processLatestFileComments = (allFileComments) => {
    //
    const tempFileComments = allFileComments.length
      ? allFileComments.map((singleComment) => {
        const tempSingleComment = { ...singleComment };
        // tempSingleComment.highlightedLines = singleComment.target.description.split(","); // remove soon
        return tempSingleComment;
      })
      : [];

    setFileComments(tempFileComments);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileTxt(e.target.result.split(/\n/));
    };
    reader.readAsText(file);
  };

  const highlightLines = (classToAdd, classToRemove) => {
    Object.keys(codeLineRefs).forEach((codeLine) => {
      if (classToAdd) {
        codeLineRefs[codeLine].classList.remove(classToAdd);
      }
      if (classToRemove) {
        codeLineRefs[codeLine].classList.remove(classToRemove);
      }
    });

    if (selectedLines.length && classToAdd) {
      selectedLines.forEach((codeLine) => {
        if (codeLine in codeLineRefs) {
          codeLineRefs[codeLine].classList.add(classToAdd);
        }
      });
    }
  };

  const clearHighlights = ({ clearParent } = { clearParent: false }) => {
    onHighlightLines([], SELECTION_TYPES.none);
    if (clearParent) {
      onSelectLine([]);
    }
  };

  const arrangeSelectedLines = (lineArray) => (
    /* create a sorted array of unique lineIds */
    [
      ...new Set(
        lineArray.sort((a, b) => {
          const aLineNumber = +a.match(/\d+/g)[0];
          const bLineNumber = +b.match(/\d+/g)[0];
          if (aLineNumber > bLineNumber) return 1;
          return -1;
        }),
      ),
    ]
  );

  const selectCodeLine = (lineId) => {
    if (selectionType !== SELECTION_TYPES.lineup) {
      clearHighlights({ clearParent: true });
      onHighlightLines([lineId], SELECTION_TYPES.lineup);
    } else {
      let newSelectedLines;

      if (!selectedLines.includes(lineId)) {
        newSelectedLines = arrangeSelectedLines([...selectedLines, lineId]);
      } else {
        const mutableActiveCodeLines = [...selectedLines];
        mutableActiveCodeLines.splice(selectedLines.indexOf(lineId), 1);
        newSelectedLines = arrangeSelectedLines(mutableActiveCodeLines);
      }

      onHighlightLines(newSelectedLines, SELECTION_TYPES.lineup);
      onSelectLine(newSelectedLines);
    }
  };

  const addCodeComment = (event, selectedCodeLines) => {
    onCommentStart(selectedCodeLines);
    event.stopPropagation();
  };

  const selectCodeComment = (event, commentData) => {
    clearHighlights();
    onCommentSelect(commentData);
    onHighlightLines(commentData.target.description.split(","), SELECTION_TYPES.comment);
    event.stopPropagation();
  };

  const handleSelection = (selectedCodeLines, lineSelectionType) => {
    switch (lineSelectionType) {
      case SELECTION_TYPES.comment:
        highlightLines("commented", "selected");
        break;
      case SELECTION_TYPES.lineup:
        highlightLines("selected", "commented");
        break;
      case SELECTION_TYPES.none:
      default:
        highlightLines("", "commented");
        highlightLines("", "selected");
        break;
    }
  };

  //
  const Blob = (blobProps) => {
    const {
      lineNumber,
      lineId,
      text,
      linkedComment,
    } = blobProps;

    return (
      <div className="Blob d-flex align-items-center px-4">
        { selectedLines && selectedLines.length > 0
        && lineId === selectedLines[0]
        && selectionType === SELECTION_TYPES.lineup
        && (
          <div
            className="Blob__add-comment font-weight-bold"
            title="Add a comment"
            onClick={(e) => addCodeComment(e, selectedLines)}
          >
            &#43;
          </div>
        )}

        { linkedComment && (
          <div
            className="Blob__select-comment font-weight-bold"
            title="View comments"
            onClick={(e) => selectCodeComment(e, linkedComment)}
          >
            <CommentsIcon
              height="18"
              width="18"
              fill={colors.ZEEDAS_ORANGE}
            />
            <span
              className="position-absolute m-auto"
              style={{ color: colors.ZEEDAS_WHITE }}
            >
              { linkedComment.replies.length + 1 }
            </span>
          </div>
        )}

        <pre className="mr-1 ml-1 mb-0 Blob__line-number font-12">{ lineNumber }</pre>
        <pre className="Blob__line-text my-0 font-12">
          <code className="language-javascript">
            { text }
          </code>
        </pre>
      </div>
    );
  };

  Blob.propTypes = {
    lineNumber: PropTypes.number.isRequired,
    lineId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    linkedComment: PropTypes.object,
  };

  Blob.defaultProps = {
    linkedComment: undefined,
  };

  //
  useEffect(() => {
    if (fileTxt.length > 0) {
      Prism.highlightAll(false, setTextIsHighlighted(true));
    }
  });

  useEffect(() => {
    if (comments) {
      processLatestFileComments(comments);
    }
  }, [comments]);

  useEffect(() => {
    clearHighlights();
    if (reviewFile && reviewFile.contents) {
      if (typeof reviewFile.contents === "string") {
        setFileTxt(reviewFile.contents.split(/[\n\r]/));
      } else if (Array.isArray(reviewFile.contents)) {
        setFileTxt(reviewFile.contents);
      }
    } else {
      setFileTxt([]);
    }
  }, [reviewFile]);

  useEffect(() => {
    handleSelection(selectedLines, selectionType);
  }, [selectedLines, selectionType]);

  useEffect(() => {
    clearHighlights();
    // setFileTxt([]);
  }, []);

  return (
    <div className="CodeReviewEditor py-3 pt-5">
      <div className="CodeReviewEditor__header d-flex justify-content-between px-4 py-2">
        {/*        <input
          id="fileUploadInput"
          type="file"
          accept="*"
          onChange={handleUpload}
        /> */}
        { (selectedLines && selectedLines.length > 0) && (
          <div
            className="CodeReviewEditor__fullscreen-toggle d-flex align-items-center"
            onClick={() => clearHighlights({ clearParent: true })}
          >
            <span className="font-12 mr-2">Clear Selection</span>
            <div className="d-flex align-items-center">
              &times;
            </div>
          </div>
        )}

        {!fullScreen && fileTxt.length > 0 && (
          <div
            className="CodeReviewEditor__fullscreen-toggle d-flex align-items-center ml-auto"
            onClick={onToggleFullScreen}
          >
            <span className="font-12 mr-2">Compare Versions</span>
            <div className="d-flex align-items-center">
              <IconFullScreen />
            </div>
          </div>
        )}
      </div>

      {(textIsHighlighted && fileTxt.length > 0)
        && fileTxt.map((text, index) => (
          <a
            onClick={() => selectCodeLine(`line-${index + 1}`)}
            key={index}
            className="Blob__container"
            id={`line-${index + 1}`}
            ref={(inst) => refAssigner(inst, `line-${index + 1}`, codeLineRefs)}
          >
            <Blob
              lineNumber={index + 1}
              lineId={`line-${index + 1}`}
              text={text}
              linkedComment={fileComments.find((singleComment) => (
                // singleComment.highlightedLines[0] === `line-${index + 1}`
                singleComment && singleComment.target && singleComment.target.description
                && singleComment.target.description.split(",")[0] === `line-${index + 1}`
              ))}
            />
          </a>
        ))}
    </div>
  );
};

CodeReviewEditor.propTypes = {
  /* inputs */
  comments: PropTypes.array.isRequired,
  reviewFile: PropTypes.object.isRequired,
  selectedLines: PropTypes.array.isRequired,
  selectionType: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool,
  /* handlers */
  onSelectLine: PropTypes.func.isRequired,
  onHighlightLines: PropTypes.func.isRequired,
  onCommentStart: PropTypes.func.isRequired,
  onCommentSelect: PropTypes.func.isRequired,
  onToggleFullScreen: PropTypes.func,
};

CodeReviewEditor.defaultProps = {
  fullScreen: false,
  onToggleFullScreen: () => ({}),
};

export default CodeReviewEditor;
