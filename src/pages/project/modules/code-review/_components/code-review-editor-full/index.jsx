import React, {useEffect, useRef, useState} from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { CustomInput } from "reactstrap";
import moment from "moment";
import Prism from "prismjs";
import { connect } from "react-redux";
import ReactDiffViewer from "react-diff-viewer";
import SelectOption from "pages/app/_components/select-option";
import CodeReviewEditor from "../code-review-editor/index";
import CodeReviewComments from "../code-review-comments";
import zeedaslogo from "../../../../../../zeedas-assets/images/logos/zeedas-sidebar-logo.svg";
import {COMMENT_LEVELS, SELECTION_TYPES} from "../../../../../../state/redux/comment/types";
import { ReactComponent as SettingsIcon } from "../../../../../../zeedas-assets/images/topbar-icons/settings-icon.svg";
import temp from "../../../../../app/_components/temp";
import {comment as commentActions} from "../../../../../../state/redux/comment/actions";

const sortVersionsByNewest = (versions) => (
  versions && versions.length
    ? versions.sort((a, b) => {
      if (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) {
        return -1;
      }
      return 1;
    })
    : []
);

const filterCommentsByDate = (
  unfilteredComments = [],
  afterThisDate,
  beforeThisDate = Date.now(),
) => (
  unfilteredComments.length
    ? unfilteredComments.map((singleComment) => {
      const tempSingleComment = { ...singleComment };

      if ((new Date(tempSingleComment.createdAt).getTime() > new Date(afterThisDate).getTime())
        && (new Date(tempSingleComment.createdAt).getTime() < new Date(beforeThisDate).getTime())
      ) {
        return tempSingleComment;
      }
    })
    : []
);

const CodeReviewEditorFull = (props) => {
  const {
    allFileComments,
    initFileComments,
    reviewFile,
    fileData,
    appId,
    moduleId,
    onCloseFullscreen,
    //
    $$setCodeFragmentComments,
  } = props;

  const fileVersionsByNewest = sortVersionsByNewest(fileData ? fileData.versions : []);

  const versionDropdownOptions = fileVersionsByNewest.length
    ? fileVersionsByNewest.map((version, index) => {
      // const tempVersion = {
      //   value: version._id,
      //   label: index === 0
      //     ? "Latest Edit"
      //     : moment(version.created_at).format("Do MMM YYYY, h:mm:ss a"),
      // };
      const tempVersion = { ...version };
      tempVersion.value = version._id;
      tempVersion.label = index === 0
        ? "Latest Edit"
        : moment(version.created_at).format("Do MMM YYYY, h:mm:ss a");
      return tempVersion;
    })
    : [];

  /* later version data on the right, earlier version data on the left */
  const INIT = {
    comments: {
      left: filterCommentsByDate(
        allFileComments,
        versionDropdownOptions[1].created_at,
        versionDropdownOptions[0].created_at,
      ),
      // right: initFileComments,
      right: filterCommentsByDate(
        allFileComments,
        versionDropdownOptions[0].created_at,
        Date.now(),
      ),
    },
    reviewFiles: {
      // left: reviewFile,
      left: { contents: "" },
      right: reviewFile,
    },
    selectedLines: {
      left: [],
      right: [],
    },
    selectionTypes: {
      left: SELECTION_TYPES.none,
      right: SELECTION_TYPES.none,
    },
    versions: {
      // left: { value: "", label: "Select Version", ...fileVersionsByNewest[1] },
      // right: { value: "", label: "Latest Edit", ...fileVersionsByNewest[0] },
      left: versionDropdownOptions[1],
      right: versionDropdownOptions[0],
    },
  };

  const [splitComments, setSplitComments] = useState(INIT.comments);
  const [splitReviewFiles, setSplitReviewFiles] = useState(INIT.reviewFiles);
  const [splitSelectedLines, setSplitSelectedLines] = useState(INIT.selectedLines);
  const [splitSelectionTypes, setSplitSelectionTypes] = useState(INIT.selectionTypes);
  const [splitVersions, setSplitVersions] = useState(INIT.versions);

  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [showDiffView, setShowDiffView] = useState(false);
  const [showDiffViewSplitMode, setShowDiffViewSplitMode] = useState(true);
  const [showDiffViewDarkMode, setShowDiffViewDarkMode] = useState(false);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [canComment, setCanComment] = useState(false);
  const [commentModalDirection, setCommentModalDirection] = useState("");

  const splitViewTitles = showDiffViewSplitMode
    ? {
      leftTitle: `${fileData.name} - ${splitVersions.left.label}`,
      rightTitle: `${fileData.name} - ${splitVersions.right.label}`,
    } : {};

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setSplitSelectedLines({ left: [], right: [] });
    setSplitSelectionTypes({ left: SELECTION_TYPES.none, right: SELECTION_TYPES.none });
  };

  const handleLineSelect = (selectedLines, editorDirection) => {
    if (!selectedLines.length) {
      const newSelectedLines = { ...splitSelectedLines };
      newSelectedLines[editorDirection] = [];
      setSplitSelectedLines(newSelectedLines);

      const newSelectionTypes = { ...splitSelectionTypes };
      newSelectionTypes[editorDirection] = SELECTION_TYPES.none;
      setSplitSelectionTypes(newSelectionTypes);

      setShowCommentModal(false);
    }
  };

  const handleHighlightLines = (selectedLines, selectionType, editorDirection) => {
    // if (editorDirection === "left") {
    if (selectionType !== SELECTION_TYPES.lineup) {
      const newSelectedLines = { ...splitSelectedLines };
      newSelectedLines[editorDirection] = selectedLines;
      setSplitSelectedLines(newSelectedLines);

      const newSelectionTypes = { ...splitSelectionTypes };
      newSelectionTypes[editorDirection] = selectionType;
      setSplitSelectionTypes(newSelectionTypes);
    }
  };

  const handleCommentStart = (selectedLines, editorDirection) => {

  };

  const handleCommentSelect = (commentData, editorDirection) => {
    setShowCommentModal(true);
    setCanComment(true);
    $$setCodeFragmentComments([commentData], COMMENT_LEVELS.reply);
    setCommentModalDirection(editorDirection);
  };

  const handleCommentSent = () => {
    handleCloseCommentModal();
  };

  const handleVersionSelect = (selectedVersion, editorDirection) => {
    console.log(`[VERSION] ${editorDirection}:`, selectedVersion);
    const newSelectedVersions = { ...splitVersions };
    newSelectedVersions[editorDirection] = selectedVersion;
    setSplitVersions(newSelectedVersions);

    const versionIndex = fileVersionsByNewest.findIndex((version) => (
      version._id === selectedVersion._id
    ));

    if (versionIndex > -1) {
      const beforeThisDate = versionIndex > 0
        ? fileVersionsByNewest[versionIndex - 1].created_at
        : Date.now();
      const editorDirectionComments = filterCommentsByDate(
        allFileComments,
        fileVersionsByNewest[versionIndex].created_at,
        beforeThisDate,
      );
      // console.log(`[NEW COMMENTS] ${editorDirection}:`, editorDirectionComments);

      const tempSplitComments = { ...splitComments };
      tempSplitComments[editorDirection] = editorDirectionComments;
      setSplitComments(tempSplitComments);
    }
  };

  useEffect(() => {
    console.log("[SPLIT COMMENTS]:", splitComments);
  }, [splitComments]);

  // useEffect(() => {
  //   const comments = { left: [], right: [] };
  //   const leftIndex = fileVersionsByNewest.findIndex((version) => (
  //     version._id === splitVersions.left._id
  //   ));
  //
  //   const rightIndex = fileVersionsByNewest.findIndex((version) => (
  //     version._id === splitVersions.right._id
  //   ));
  //
  //   if (leftIndex > -1) {
  //     const beforeThisDate = leftIndex > 0
  //       ? fileVersionsByNewest[leftIndex - 1].created_at
  //       : Date.now();
  //
  //     comments.left = filterCommentsByDate(
  //       allFileComments,
  //       splitVersions.left.created_at,
  //       beforeThisDate,
  //     );
  //   }
  //
  //   if (rightIndex > -1) {
  //     const beforeThisDate = rightIndex > 0
  //       ? fileVersionsByNewest[rightIndex - 1].created_at
  //       : Date.now();
  //
  //     comments.left = filterCommentsByDate(
  //       allFileComments,
  //       splitVersions.right.created_at,
  //       beforeThisDate,
  //     );
  //   }
  //
  //   setSplitComments(comments);
  // }, [allFileComments]);

  return (
    <div className="CodeReviewEditorFull d-flex flex-column">
      <div className="CodeReviewEditorFull__header py-4 px-5">
        <img src={zeedaslogo} className="light-logo" alt="zeedas logo" />

        <div className="CodeReviewEditorFull__versions-navbar">
          {/* earlier version selector */}
          <SelectOption
            placeholder="Select Version"
            // value={splitVersions.left}
            options={versionDropdownOptions.slice(1)}
            // defaultValue={versionDropdownOptions[1]}
            onChange={(version) => handleVersionSelect(version, "left")}
            width="205px"
            height="30px"
            borderless
            color="#fff"
          />

          {/* later version selector */}
          <SelectOption
            placeholder="Latest Edit"
            // value={splitVersions.right}
            options={versionDropdownOptions}
            // defaultValue={versionDropdownOptions[0]}
            onChange={(version) => handleVersionSelect(version, "right")}
            width="205px"
            height="30px"
            borderless
            color="#fff"
          />
        </div>

        <div className="text-right ml-auto">
          <a
            className="CodeReviewEditorFull__settings font-24 position-relative"
            style={{ color: "#fff" }}
            onClick={() => setIsControlsOpen(!isControlsOpen)}
          >
            <SettingsIcon className="CodeReviewEditorFull__settings__icon" />
          </a>
        </div>
      </div>

      { isControlsOpen && (
        <div className="CodeReviewEditorFull__controls">
          <label
            htmlFor="show-diff-checkbox"
            className="CodeReviewEditorFull__controls__control"
          >
            Show Differences
            {/* CustomInput from ReactStrap */}
            <CustomInput
              inline
              checked={showDiffView}
              onChange={(e) => setShowDiffView(!showDiffView)}
              id="show-diff-checkbox"
              type="checkbox"
              className="square m-0"
            />
          </label>

          { showDiffView && (
            <>
              <label
                htmlFor="diff-split-view-checkbox"
                className="CodeReviewEditorFull__controls__control diff-view-option"
              >
                Split View
                {/* CustomInput from ReactStrap */}
                <CustomInput
                  inline
                  checked={showDiffViewSplitMode}
                  onChange={(e) => setShowDiffViewSplitMode(!showDiffViewSplitMode)}
                  id="diff-split-view-checkbox"
                  type="checkbox"
                  className="square m-0"
                />
              </label>

              <label
                htmlFor="diff-dark-mode-checkbox"
                className="CodeReviewEditorFull__controls__control diff-view-option"
              >
                Dark Mode
                {/* CustomInput from ReactStrap */}
                <CustomInput
                  inline
                  checked={showDiffViewDarkMode}
                  onChange={(e) => setShowDiffViewDarkMode(!showDiffViewDarkMode)}
                  id="diff-dark-mode-checkbox"
                  type="checkbox"
                  className="square m-0"
                />
              </label>
            </>
          )}

          <div
            className="CodeReviewEditorFull__controls__control exit-fullscreen-control"
            onClick={onCloseFullscreen}
          >
            Exit Fullscreen
          </div>
        </div>
      )}

      <div className="row no-gutters h-100">
        {!showDiffView
          ? (
            <>
              <div className="col-md-6 h-100">
                <div
                  className="CodeReviewEditorFull__column h-100"
                  style={{ overflowY: "auto" }}
                >
                  <CodeReviewEditor
                    fullScreen
                    comments={splitComments.left}
                    reviewFile={splitReviewFiles.left}
                    selectedLines={splitSelectedLines.left}
                    selectionType={splitSelectionTypes.left}
                    onSelectLine={(selectedLines) => handleLineSelect(selectedLines, "left")}
                    onHighlightLines={(selectedLines, selectionType) => {
                      handleHighlightLines(selectedLines, selectionType, "left");
                    }}
                    onCommentStart={(selectedLines) => handleCommentStart(selectedLines, "left")}
                    onCommentSelect={(commentData) => handleCommentSelect(commentData, "left")}
                  />
                </div>
              </div>
              <div className="col-md-6 h-100">
                <div
                  className="CodeReviewEditorFull__column h-100"
                  style={{ overflowY: "auto" }}
                >
                  <CodeReviewEditor
                    fullScreen
                    comments={splitComments.right}
                    reviewFile={splitReviewFiles.right}
                    selectedLines={splitSelectedLines.right}
                    selectionType={splitSelectionTypes.right}
                    onSelectLine={(selectedLines) => handleLineSelect(selectedLines, "right")}
                    onHighlightLines={(selectedLines, selectionType) => {
                      handleHighlightLines(selectedLines, selectionType, "right");
                    }}
                    onCommentStart={(selectedLines) => handleCommentStart(selectedLines, "right")}
                    onCommentSelect={(commentData) => handleCommentSelect(commentData, "right")}
                  />
                </div>
              </div>
            </>
          ) : (
            <ReactDiffViewer
              {...splitViewTitles}
              newValue={splitReviewFiles.right.contents}
              oldValue={splitReviewFiles.left.contents}
              splitView={showDiffViewSplitMode}
              useDarkTheme={showDiffViewDarkMode}
              renderContent={(str) => {
                if (str) {
                  return (
                    <pre
                      style={{ display: "inline" }}
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(str, Prism.languages.javascript),
                      }}
                    />
                  );
                }
              }}
            />
          )}
      </div>

      { showCommentModal && (
        <div
          className={`CodeReviewEditorFull__comment-modal ${commentModalDirection}`}
          // ref={commentModalRef}
        >
          <div
            className="CodeReview__comments h-100"
            style={{ overflowY: "auto" }}
          >
            <CodeReviewComments
              onCommentSent={handleCommentSent}
              appId={appId}
              moduleId={moduleId}
              canComment={canComment}
              setCanComment={setCanComment}
              onCancelComment={handleCloseCommentModal}
              hideNavigation
            />
          </div>
        </div>
      )}

    </div>
  );
};

CodeReviewEditorFull.propTypes = {
  allFileComments: PropTypes.array.isRequired,
  initFileComments: PropTypes.array.isRequired,
  reviewFile: PropTypes.object.isRequired,
  fileData: PropTypes.object.isRequired,
  onCloseFullscreen: PropTypes.func.isRequired,
};

CodeReviewEditorFull.defaultProps = {
};

const mapDispatch = {
  $$setCodeFragmentComments: commentActions.setCodeFragmentComments,
};

export default connect(null, mapDispatch)(CodeReviewEditorFull);
