import React, { useState } from 'react';

const TaskForm: React.FC = () => {
    const [titleVisible, setTitleVisible] = useState('titleErrorHidden');
    const [dateVisible, setDatVisible] = useState('dateErrorHidden')

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTask, setDateTask] = useState('');
    const [done, setDone] = useState(false);

    enum FormFields {
        StringField,
        TextAreaField,
        DateField,
        CheckBoxField,
    }


    function handleChange<T>(value: T, typefield: number): void {
        if (typefield === FormFields.StringField) {
            setTitle(value as string);
        }
        if (typefield === FormFields.TextAreaField) {
            setDescription(value as string);
        }
        if (typefield === FormFields.DateField) {
            setDateTask(value as string);
        }
        if (typefield === FormFields.CheckBoxField) {
            setDone(value as boolean);
        }
    }

    function modifyTask(event: any) {
        event.preventDefault();
        setTitleVisible('titleErrorHidden');
        setTitleVisible('titleErrorVsible');

        setDatVisible('dateErrorHidden');
        setDatVisible('dateErrorVsible');

        let validate = true;

        if (title === '') {
            setTitleVisible('titleErrorVisible');
            validate = false;
        }
        if (dateTask === '') {
            setDatVisible('dateErrorVisible');
            validate = false;
        }

        return validate;



    }

    return (
        <div className="formTask">
            <form onSubmit={modifyTask}>
                <div><input onChange={(event) => handleChange(event.target.value, FormFields.StringField)}
                    type="text" value={title} placeholder="Intitulé *" /></div>
                <div className={titleVisible}>Veuillez renseigner le champ</div>
                <div><textarea onChange={(event) => handleChange(event.target.value, FormFields.TextAreaField)}
                    value={description} placeholder="Description" rows={10}></textarea></div>
                <div><input onChange={(event) => handleChange(event.target.value, FormFields.DateField)}
                    type="date" value={dateTask} placeholder="Date jj/mm/aaaa" /></div>
                <div className={dateVisible}>Veuillez mettre la date</div>
                <div className="checkboxContainer">
                    <label htmlFor="done">
                        <input onChange={(event) => handleChange(event.target.checked, FormFields.CheckBoxField)}
                            type="checkbox" checked={done} id="done" name="done" />
                        Done
                    </label>
                </div>
                <div><input type="submit" value="Envoyer le formulaire" /></div>
            </form>
        </div>
    );
}

export default TaskForm;
