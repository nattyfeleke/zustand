import "./Column.css";
import PropTypes from "prop-types";
import Task from "./Task";
import { useStore } from "../store";
// import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import classNames from "classnames";

const Column = ({ state }) => {
  const [drop, setDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const draggedTask = useStore((store) => store.draggedTask);
  //   const filterdTasks = useMemo(
  //     () => tasks.filter((task) => task.state === state),
  //     [state, tasks]
  //   );
  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDrop={(e) => {
        console.log(draggedTask);
        moveTask(draggedTask, state);
        setDraggedTask(null);
        setDrop(false);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;

Column.propTypes = {
  state: PropTypes.string.isRequired,
};
