import React, { useState } from 'react';
import ITask from '../interfaces/ITask';


type Props = {
  taskRow: ITask;
  deleteTaskInComponentTasks: (id: string) => void;
  setTaskrow: React.Dispatch<React.SetStateAction<string>>;
  updateTaskCheckbox: (taskRow: ITask) => void;
  updateTaskRow: (isModified: boolean, taskRow: ITask) => void;
}

const Taskrow: React.FC<any> = (props: Props) => {
  //récupérer le props.taskRow pour ensuite pouvoir modifier le checkebox
  const [taskRow, setTaskRow] = useState(props.taskRow);

  const updateTaskCheckbox = async (doneValue: boolean) => {
    const taskRowForDone = { ...taskRow, done: doneValue }
    setTaskRow(taskRowForDone);
    console.log("change done value of task");
    //taskRow.done = doneValue;
    props.updateTaskCheckbox(taskRowForDone);
}

  const deleteTaskInComponent = (value: string) => {
    props.deleteTaskInComponentTasks(taskRow._id!)
  }
//rajouter appel de la fonction updateTaskRow sur le bouton modifier dnas TaskRow.tsx
const updateTaskRow = async (value: string) => {
  //aeguments
  //isModified:boolean 
  //task:Itask
  props.updateTaskRow(true, taskRow);
}


  //  <div className="header"><p >Liste des tâches</p></div>

  return (
    <tr>
      <td>
        <input type="checkbox" id="done" checked={props.taskRow.done}
          onChange={(event) => updateTaskCheckbox(event.target.checked)}
          name="done"/>
      </td>
      <td>
        {taskRow.title}
      </td>
      <td>
        {taskRow.description}
      </td>
      <td>
        {taskRow.date}
      </td>
      <td>
        {taskRow.priority}
      </td>

      <td><button onClick={() => updateTaskRow('updateRow')} className="otherButtonValidate">Modifier</button></td>
      <td><button onClick={() => deleteTaskInComponent('remove')} className="otherButtonValidate">Supprimer</button></td>

    </tr>



  );
}

export default Taskrow;