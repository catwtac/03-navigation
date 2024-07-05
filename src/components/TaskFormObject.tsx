import React, { useState, useEffect } from 'react';
import ITask from '../interfaces/ITask';


type Props = {
    task: ITask;
    addTaskInComponentTasks: (taskRow: ITask) => void;
    isModified: Boolean;
}



const TaskFormObject: React.FC<Props> = ({ addTaskInComponentTasks, isModified, task }) => {


    const [titleVisible, setTitleVisible] = useState('titleErrorHidden');
    const [dateVisible, setDatVisible] = useState('dateErrorHidden');

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [dateTask, setDateTask] = useState('');
    // const [done, setDone] = useState(false);

    const [taskForm, setTaskForm] = useState<ITask>({ title: '', date: '' });

    const [showButtonCreateOrModify, setShowButtonCreateOrModify] = useState('');

    enum FormFields {
        StringField,
        TextAreaField,
        DateField,
        CheckBoxField,
    }

    useEffect(() => {
        //state pour les champs
        if (!isModified) {
            setTaskForm({ title: '', description: '', date: '', done: false });
            setShowButtonCreateOrModify("Créer")
        } else {
            setTaskForm(task);
            setShowButtonCreateOrModify("Modifier")
        }
    }, [isModified]);



    function handleChange<T>(value: T, typefield: number): void {
        if (typefield === FormFields.StringField) {
            // setTitle(value as string);
            setTaskForm({ ...taskForm, title: value as string })
        }
        if (typefield === FormFields.TextAreaField) {
            // setDescription(value as string);
            setTaskForm({ ...taskForm, description: value as string })
        }
        if (typefield === FormFields.DateField) {
            // setDateTask(value as string);
            setTaskForm({ ...taskForm, date: value as string })
        }
        if (typefield === FormFields.CheckBoxField) {
            //setDone(value as boolean);
            setTaskForm({ ...taskForm, done: value as boolean })
        }
    }

    function modifyTask(event: any) {
        event.preventDefault();
        setTitleVisible('titleErrorHidden');
        setTitleVisible('titleErrorVsible');

        setDatVisible('dateErrorHidden');
        setDatVisible('dateErrorVsible');

        let fieldsValidated = true;

        if (taskForm.title === '') {
            setTitleVisible('titleErrorVisible');
            fieldsValidated = false;
        }
        if (taskForm.date === '') {
            setDatVisible('dateErrorVisible');
            fieldsValidated = false;
        }
        if (fieldsValidated) {
            addTaskInComponentTasks(taskForm)
        }
        return fieldsValidated;



    }

    return (
        <div className="formTask">
            <form onSubmit={modifyTask}>
                <div><input onChange={(event) => handleChange(event.target.value, FormFields.StringField)}
                    type="text" value={taskForm.title} placeholder="Intitulé *" /></div>
                <div className={titleVisible}>Veuillez renseigner le champ</div>
                <div><textarea onChange={(event) => handleChange(event.target.value, FormFields.TextAreaField)}
                    value={taskForm.description} placeholder="Description" rows={10}></textarea></div>
                <div><input onChange={(event) => handleChange(event.target.value, FormFields.DateField)}
                    type="date" value={taskForm.date} placeholder="Date jj/mm/aaaa" /></div>
                <div className={dateVisible}>Veuillez mettre la date</div>
                <div className="checkboxContainer">
                    <label htmlFor="done">
                        <input onChange={(event) => handleChange(event.target.checked, FormFields.CheckBoxField)}
                            type="checkbox" checked={taskForm.done} id="done" name="done" />
                        Done
                    </label>
                </div>
                <div><input type="submit" value={showButtonCreateOrModify} /></div>
            </form>
        </div>
    );
}

export default TaskFormObject;
