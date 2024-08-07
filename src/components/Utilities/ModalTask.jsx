import React, { useRef, useState, useContext } from "react";
import Modal from "./Modal";
import { TasksContext } from "../../Context/Tasks/TasksContext";

const InputCheckbox = ({ isChecked, setChecked, label }) => {
  return (
    <label className="flex items-center mb-0 cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="block w-2 h-2 rounded-full bg-rose-500"></span>
        )}
      </div>
      <span className="flex-1 order-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask = ({ onClose, task, nameForm, onConfirm }) => {
  const { state } = useContext(TasksContext);

  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const todayDate = `${year}-${month}-${day}`;
  const maxDate = `${year + 1}-${month}-${day}`;

  const [description, setDescription] = useState(task ? task.description : "");
  const [title, setTitle] = useState(task ? task.title : "");
  const [date, setDate] = useState(task ? task.date : todayDate);
  const [end_date, setEndDate] = useState(task ? task.end_date : todayDate);

  const isTitleValid = useRef(false);
  const isDateValid = useRef(false);
  const isEndDateValid = useRef(false);

  const [isImportant, setIsImportant] = useState(task ? task.important : false);
  const [isCompleted, setIsCompleted] = useState(task ? task.completed : false);

  const [selectedDirectory, setSelectedDirectory] = useState(task ? task.dir : state.directories[0]);

  const addNewTaskHandler = (event) => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;
    isEndDateValid.current = end_date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current && isEndDateValid.current) {
      const newTask = {
        title: title,
        dir: selectedDirectory,
        description: description,
        date: date,
        end_date: end_date,
        completed: isCompleted,
        important: isImportant,
        id: task?.id ? task.id : Date.now().toString(),
      };
      onConfirm(newTask);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form className="flex flex-col stylesInputsField" onSubmit={addNewTaskHandler}>
        <label>
          Title
          <input
            type="text"
            placeholder="e.g., Task name"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Start Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            className="w-full"
            value={end_date}
            required
            onChange={({ target }) => setEndDate(target.value)}
            min={date}
            max={maxDate}
          />
        </label>
        <label>
          Description (optional)
          <textarea
            placeholder="e.g., Summarize the key points"
            className="w-full"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          ></textarea>
        </label>
        <label>
          Select a tag
          <select
            className="block w-full"
            value={selectedDirectory}
            onChange={({ target }) => setSelectedDirectory(target.value)}
          >
            {state.directories.map((dir) => (
              <option
                key={dir}
                value={dir}
                className="bg-slate-100 dark:bg-slate-800"
              >
                {dir}
              </option>
            ))}
          </select>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="mt-5 btn">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
