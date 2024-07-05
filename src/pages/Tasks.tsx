import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskFormObject';
import { fetchTasks, addTask, deleteTask, updateTaskDone } from '../services/fetchTasks';
import ITask from '../interfaces/ITask';
import Taskrow from '../components/TaskRow';

const Tasks: React.FC = () => {
    const [listTasks, setListTasks] = useState<ITask[]>([]);

    const [modalDeleteStyle, setModalDeleteStyle] = useState('modalDeleteHidden');
    const [idTaskToDelete, setIdTaskToDelete] = useState('');

    const addTaskInComponentTasks = async (taskToAdd: ITask) => {
        let task = await addTask(taskToAdd);
        console.log(task);
        //maj de la liste
        await getAllTasks()
    }

    useEffect(() => {
        getAllTasks()
    }, []);

    //montre le modal de suppression
    const deleteTaskInComponentTasks = (idRowTask: string) => {
        //ouvrir modal de validation
        setModalDeleteStyle('modalDeleteVisible');
        setIdTaskToDelete(idRowTask);
    };
    //cache le modal de suppresion
    const hideModalDelete = () => {
        setModalDeleteStyle('modalDeleteHidden');
        setIdTaskToDelete('');
    }

    //supprimer la lignet 
    //affiche la liste maj
    //cache le modal
    const validateDeleteTaskInDb = async () => {
        let task = await deleteTask(idTaskToDelete);
        console.log(task);
        //afficher la liste 
        await getAllTasks();

        hideModalDelete();
    }

    const getAllTasks = async () => {
        let list = await fetchTasks();
        setListTasks(list);
    };

    //mise à jour de la valeur done de la tâche 
    const updateTaskCheckbox = async (taskRow: ITask) => {
        let taskResult = await updateTaskDone(taskRow);
        console.log(taskResult);
        //afficher la liste 
        await getAllTasks();
    }

    return (
        <div>
            <TaskForm addTaskInComponentTasks={(taskToAdd: ITask) => addTaskInComponentTasks(taskToAdd)} />
            <div id="supprimerflorian" className={modalDeleteStyle}>
                <div id="popup">
                    <div id="title">Etes-vous sûr de vouloir supprimer la tâche ?</div>
                    <button id="buttonannuler" onClick={() => hideModalDelete()}>
                        <div id="text">
                            <div id="clear">Annuler</div>
                        </div>
                    </button>
                    <button id="buttonsvalider" onClick={() => validateDeleteTaskInDb()}>
                        <div id="text2">
                            <div id="go">Valider</div>
                        </div>
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Done</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {listTasks.map((taskRow: ITask) => (
                        <Taskrow 
                            taskRow={taskRow} 
                            deleteTaskInComponentTasks={(id: string) => deleteTaskInComponentTasks(id)}
                            updateTaskCheckbox={(taskRow: ITask) => updateTaskCheckbox(taskRow)} 
                            key={taskRow._id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tasks;
//mongodb+srv://catwtac:password<>@cluster0.sikuble.mongodb.net/