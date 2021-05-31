/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import colors from "utils/colors";
import CodeReviewComments from "./_components/code-review-comments/index";
import { ClockIcon } from "../../../../zeedas-assets/icons/icon-clock";
import CodeReviewEditor from "./_components/code-review-editor";
import CodeReviewEditorFull from "./_components/code-review-editor-full/index";

import { configActions, configSelectors } from "../../../../state/redux/config/actions";
import { comment as commentActions } from "../../../../state/redux/comment/actions";
import * as moduleActions from "../../../../state/redux/modules/actions";
import {COMMENT_TYPES, MODULE_PHASES, MODULE_STATUS} from "../../../../utils/constants";
import { COMMENT_LEVELS, SELECTION_TYPES } from "../../../../state/redux/comment/types";

const iconProps = {
  dimension: {
    width: 10.08,
    height: 10.08,
  },
  color: "rgba(3, 41, 61, 0.5)",
  strokeWidth: 1.4,
};

const CodeReviewSnippet = ({ className, snippet, active, onClick }) => (
  <div
    className={`CodeReviewSnippet d-block py-2 px-3 w-100 ${className} ${
      active ? "active" : ""
    }`}
    onClick={onClick}
  >
    <div className="row align-items-center no-gutters mb-1">
      <div className="col-md-10 pr-2">
        <div className="CodeReviewSnippet__name font-12 font-weight-bold">
          { snippet.name }
        </div>
      </div>

      {/* TODO: Use badge for notification count and not number of versions - Mel */}
      {/* <div className="col-md-2 d-flex justify-content-end">
        <a className="CodeReviewSnippet__badge font-8 ml-2">
          { snippet.versions.length }
        </a>
      </div> */}
    </div>

    <div className="row">
      <div className="col-md-10">
        <div className="d-flex align-items-center">
          <ClockIcon {...iconProps} />
          <span className="CodeReviewSnippet__duedate font-10 ml-2">
            { moment(snippet.versions[0].created_at).format("DD/MM/YYYY") }
          </span>
        </div>
      </div>
      <div className="col-md-2">
        {/* TODO: insert user avatars here */}
        <span className="CodeReviewSnippet__avatar" />
      </div>
    </div>
  </div>
);

const CodeReview = (props) => {
  const {
    onCloseModal,
    task,
    $config,
    $comments,
    $reviewFile,
    $reviewFileData,
    $selectedLines,
    $selectionType,
    //
    $$setReviewModule,
    $$setReviewFile,
    $$setReviewFileData,
    $$resetReviewFile,
    $$resetCodeReview,
    $$fetchComments,
    // $$setComments,
    $$setSelectedLines,
    $$setCodeFragmentComments,
    $$resetCodeFragment,
    $$resetComments,
    $$resetSelectedLines,
    //
    $$updateModule,
  } = props;

  const { reviewModule } = $config.codeReview;
  const [activeSnippetIndex, setActiveSnippetIndex] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedFileComments, setSelectedFileComments] = useState([]); // comments displayed in the editor
  const [canComment, setCanComment] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const reviewFileVersionsByNewest = $reviewFileData
    ? $reviewFileData.versions.sort((a, b) => {
      if (new Date(a.created_at).getTime() > new Date(b.created_at).getTime()) {
        return -1;
      }
      return 1;
    })
    : [];

  const latestFileComments = $comments && $comments.length
    ? $comments.map((singleComment) => {
      const tempSingleComment = { ...singleComment };

      if (reviewFileVersionsByNewest.length
        && new Date(tempSingleComment.createdAt).getTime()
        > new Date(reviewFileVersionsByNewest[0].created_at).getTime()
      ) {
        return tempSingleComment;
      }
    })
    : [];

  const appId = "5ffd5dbf6d6b35077625b7ab"; // TODO: use dynamic value task.app instead -MEL
  const moduleId = "5ffe8f55555bf1312290bb14"; // TODO: use dynamic value task._id instead - MEL

  const handleSnippetClick = (snippet) => {
    // $$resetComments();
    setSelectedFileComments([]);
    $$resetCodeFragment();
    $$resetReviewFile();

    setActiveSnippetIndex(snippet._id);
    // setSelectedFile(snippet); // remove
    $$setReviewFileData(snippet);

    const fileRequestConfig = { path: snippet.versions[0].path };
    $$setReviewFile(reviewModule.app, reviewModule.module, fileRequestConfig)
      .then(() => {
        const commentPayload = {
          app: reviewModule.app,
          module: reviewModule.module,
          target: snippet._id,
        };

        return $$fetchComments(commentPayload);
      });
  };

  const handleLineSelect = (selectedLines) => {
    if (!selectedLines.length) {
      setCanComment(false);

      commentActions.filterAndSetCommentsByType(
        $comments,
        COMMENT_TYPES.class,
        [$$setCodeFragmentComments],
      );
    }
  };

  const handleHighlightLines = (selectedCodeLines, lineSelectionType) => {
    $$setSelectedLines(selectedCodeLines, lineSelectionType);
  };

  const handleCommentStart = (selectedLines) => {
    if (selectedLines.length) {
      setCanComment(true);
      $$setCodeFragmentComments([], COMMENT_LEVELS.top);
    }
  };

  const handleCommentSelect = (updatedCommentData) => {
    $$setCodeFragmentComments([updatedCommentData], COMMENT_LEVELS.reply);
    setCanComment(true);
  };

  const handleCommentSent = (commentData) => {
    // $$setSelectedLines(commentData.target.description.split(","), SELECTION_TYPES.comment);
    // $$setCodeFragmentComments([commentData], COMMENT_LEVELS.reply);
  };

  const handleToggleFullscreen = () => {
    setFullScreen(!fullScreen);
  };

  const handleCloseFullscreen = () => {
    setFullScreen(false);
  };

  const handleApproveCodeReview = () => {
    setIsLoadingRequest(true);

    const updateModulePayload = {
      stage: MODULE_PHASES.qa_review.stage,
      status: MODULE_PHASES.qa_review.status,
      state: MODULE_PHASES.qa_review.state,
    };

    // $$updateModule(task._id, updateModulePayload)
    $$updateModule(moduleId, updateModulePayload)
      .then(() => onCloseModal())
      .finally(() => setIsLoadingRequest(false));
  };

  useEffect(() => {
    if ($comments.length) {
      // $$setSelectedLines([], SELECTION_TYPES.none); // safe to remove
      $$resetSelectedLines();

      commentActions.filterAndSetCommentsByType(
        $comments,
        COMMENT_TYPES.class,
        [setSelectedFileComments, $$setCodeFragmentComments],
      );
    }
  }, [$comments]);

  useEffect(() => {
    $$resetComments();
    $$resetCodeReview();
    // TODO: replace appId and moduleId with dynamic values - MEL
    $$setReviewModule(appId, moduleId);

    return (() => {
      $$resetComments();
      $$resetCodeReview();
    });
  }, []);

  return (
    <>
      {!fullScreen ? (
        <div className="CodeReview">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="CodeReview__header">{task.name}</h1>

            <div className="d-flex ml-auto">
              <button
                className="CodeReview__button approve mr-3"
                onClick={handleApproveCodeReview}
                disabled={isLoadingRequest}
              >
                Approve
              </button>
              <button
                className="CodeReview__button cancel"
              >
                Cancel
              </button>
            </div>

            <div className="text-right ml-5">
              <a
                className="CodeReview__close font-28 position-relative"
                style={{ top: "-30px", fontSize: "32px" }}
                onClick={onCloseModal}
              >
                &times;
              </a>
            </div>
          </div>

          <div className="row flex-grow-1" style={{ minHeight: "0px" }}>
            {/* SIDEBAR */}
            <div className="col-md-2 h-100 d-flex flex-column">
              <h2 className="CodeReview__title font-16 font-weight-bold">
                Snippets
              </h2>
              <div
                className="h-100 CodeReview__snippets"
                style={{ overflowY: "auto" }}
              >
                {reviewModule && reviewModule.changes.map((snippet, index) => (
                  <a
                    onClick={() => handleSnippetClick(snippet)}
                    className="mb-2 d-flex"
                    key={snippet._id}
                  >
                    <CodeReviewSnippet
                      snippet={snippet}
                      onClick={() => handleSnippetClick(snippet)}
                      active={activeSnippetIndex === snippet._id}
                      className=""
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* CODE EDITOR */}
            <div className="col-md-6 h-100 d-flex flex-column">
              <h2 className="CodeReview__title font-16">Code Editor</h2>
              <div
                className="CodeReview__editor h-100"
                style={{ overflowY: "auto" }}
              >
                <CodeReviewEditor
                  // comments={selectedFileComments}
                  /* inputs */
                  comments={latestFileComments}
                  reviewFile={$reviewFile}
                  selectedLines={$selectedLines}
                  selectionType={$selectionType}
                  /* handlers */
                  onSelectLine={handleLineSelect}
                  onHighlightLines={handleHighlightLines}
                  onCommentStart={handleCommentStart}
                  onCommentSelect={handleCommentSelect}
                  onToggleFullScreen={handleToggleFullscreen}
                />
              </div>
            </div>

            {/* COMMENTS */}
            <div className="col-md-4 h-100 d-flex flex-column">
              <h2 className="CodeReview__title font-16">Comments</h2>
              <div
                className="CodeReview__comments h-100"
                style={{ overflowY: "auto" }}
              >
                <CodeReviewComments
                  onCommentSent={handleCommentSent}
                  appId={appId}
                  moduleId={moduleId}
                  // selectedFile={selectedFile} // remove
                  canComment={canComment}
                  setCanComment={setCanComment}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CodeReviewEditorFull
          allFileComments={$comments}
          initFileComments={latestFileComments}
          reviewFile={$reviewFile}
          fileData={$reviewFileData}
          appId={appId}
          moduleId={moduleId}
          onCloseFullscreen={handleCloseFullscreen}
        />
      )}
    </>
  );
};

const mapState = (state) => ({
  $config: configSelectors.getConfig(state),
  $reviewFileData: configSelectors.getCodeReview(state).reviewFileData,
  $reviewFile: configSelectors.getCodeReview(state).reviewFile,
  $comments: state.comment.comments,
  $codeFragmentComments: state.comment.codeFragment.comments,
  $selectedLines: state.comment.codeFragment.selectedLines,
  $selectionType: state.comment.codeFragment.selectionType,
});

const mapDispatch = {
  $$fetchComments: commentActions.fetchComments,

  /* fetch and set module related files, and editor data */
  $$setReviewModule: configActions.setReviewModule,
  $$setReviewFile: configActions.setReviewFile,
  $$setReviewFileData: configActions.setReviewFileData,
  $$setSelectedLines: commentActions.setSelectedLines,
  $$setCodeFragmentComments: commentActions.setCodeFragmentComments,

  /* resets */
  $$resetComments: commentActions.reset,
  $$resetCodeFragment: commentActions.resetCodeFragment,
  $$resetCodeReview: configActions.resetCodeReview,
  $$resetReviewFile: configActions.resetReviewFile,
  $$resetSelectedLines: commentActions.resetSelectedLines,
  // $$setComments: commentActions.setComments,
  // $$setCommentTarget: commentActions.setCommentTarget,

  /* other */
  $$updateModule: moduleActions.updateModule,
};

export default connect(mapState, mapDispatch)(CodeReview);
