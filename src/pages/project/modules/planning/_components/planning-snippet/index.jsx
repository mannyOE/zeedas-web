import React, { useEffect, useRef, useState } from "react";
import PlanningMethod from "../planning-method";
import PlanningTag from "../planning-tag/index";
import "./style.scss";
import { planningService } from "services/planning-service";
import { useSelector, useDispatch } from "react-redux";
import { comment } from "state/redux/comment/actions";
import { COMMENT_TYPES } from "utils/constants";

const PlanningSnippet = ({ task }) => {
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState({});
  const [formattedDependencies, setFormattedDependencies] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const activePlan = useSelector((state) => state.planning.activePlan);
  const ref = useRef(null);
  const snippet = useSelector((state) => state.planning.activeSnippet);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const formatDependencies = () => {
    const formattedDeps = snippet.dependencies.map((snippetDep) => {
      snippetDep.snippet = dependencies.find(
        (dep) => dep._id === snippetDep.class,
      );
      if (!snippetDep.snippet) snippetDep.snippet = [];
      if (snippetDep.snippet.length) {
        snippetDep.methodData = snippetDep.snippet.methods.find(
          (method) => method === snippetDep.method,
        );
      } else snippetDep.methodData = [];
      return snippetDep;
    });
    setFormattedDependencies(formattedDeps);
  };

  const setCommentTarget = ({ id, type, name }) => {
    dispatch(
      comment.setCommentTarget({
        app: activePlan.app,
        module: activePlan.module,
        id,
        type,
        name,
      }),
    );
  };

  const setDependencyTarget = (dependency) => {
    const payload = {
      id: dependency._id,
      type: COMMENT_TYPES.dependency,
      name: dependency.snippet.name,
    };
    setCommentTarget(payload);
  };

  const setMethodTarget = (method) => {
    setSelectedMethod(method);
    const payload = {
      id: method._id,
      type: COMMENT_TYPES.method,
      name: method.name,
    };
    setCommentTarget(payload);
  };

  useEffect(() => {
    planningService.fetchDependencies(task.app).then((response) => {
      setDependencies(response.data);
    });
  }, []);

  useEffect(() => {
    if (dependencies.length && snippet.dependencies) {
      formatDependencies();
    }
  }, [dependencies, snippet]);

  return (
    <>
      {snippet && snippet.methods
    && (
    <div className="PlanningSnippet px-5 py-5 h-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="PlanningSnippet__header font-18">{snippet.name}</h3>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <label htmlFor="task">Snippet Description</label>
          <textarea
            value={snippet.description}
            name=""
            id=""
            placeholder=""
            className="w-100 p-3"
            disabled
          />
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="task">Dependencies</label>
          <div className="position-relative px-2">
            <a
              className="PlanningSnippet__caret left position-absolute"
              onClick={() => scroll(-100)}
            >
              ◀
            </a>
            <div
              className="PlanningSnippet__dependencies d-flex flex-nowrap w-100"
              ref={ref}
            >
              {/* task.dependentModules.map((dep) => (
                <PlanningTag title={dep[0].name} className="mr-3" />
              ))} */}
              {formattedDependencies.map((dep, index) => (
                <PlanningTag onSelectTag={() => setDependencyTarget(dep)} title={`${dep.snippet.name}:${dep.method}`} key={index} className="mr-3" />
              ))}
            </div>
            <a
              className="PlanningSnippet__caret right position-absolute"
              onClick={() => scroll(100)}
            >
              ▶
            </a>
          </div>

          <hr />
        </div>
        <div>
          <label htmlFor="task">Methods</label>
          <div className="position-relative px-2">
            <a
              className="PlanningSnippet__caret left position-absolute"
              onClick={() => scroll(-100)}
            >
              ◀
            </a>
            <div
              className="PlanningSnippet__dependencies d-flex flex-nowrap w-100"
              ref={ref}
            >
              {snippet.methods.map((method, index) => (
                <PlanningTag
                  key={index}
                  title={method.name}
                  className="mr-3"
                  active={
                    !!(selectedMethod._id
                    && method._id === selectedMethod._id)
                  }
                  onSelectTag={() => setMethodTarget(method)}
                />
              ))}
            </div>
            <a
              className="PlanningSnippet__caret right position-absolute"
              onClick={() => scroll(100)}
            >
              ▶
            </a>
          </div>
        </div>
        <hr />
        {selectedMethod._id && <PlanningMethod method={selectedMethod} />}
      </div>
    </div>
    )}
    </>
  );
};

export default PlanningSnippet;
