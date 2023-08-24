import "./Task.css";
import trash from "../assets/trash-2.svg";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useStore } from "../store";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const removeTask = useStore((store) => store.removeTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  return (
    <div
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask(task.title);
      }}
    >
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div
          onClick={() => {
            removeTask(task.title);
          }}
        >
          <img src={trash} />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
};
