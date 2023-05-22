import React, {useState} from "react";
import PropTypes from "prop-types";

import css from './ContactForm.module.css';


export const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const hendleInputChange = ({ target: { name, value } }) => {

        if (name === 'name')
            setName(value);
        if (name === 'number')
            setNumber(value);
    };

    const hendleSubmit = event => {
        event.preventDefault();
        onSubmit({
            name,
            number
        });
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setNumber('');
    };

    return (

        <form className={css.phonebookForm} onSubmit={hendleSubmit}>
            <label className={css.phonebookLable}>Name
                <input className={css.phonebookInput}
                    value={name}
                    onChange={hendleInputChange}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required />
            </label>
            <label className={css.phonebookLable}>Phone
                <input className={css.phonebookInput}
                    value={number}
                    onChange={hendleInputChange}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required />
            </label>
            <button className={css.addButton} type="submit">Add contact</button>
        </form>
    );

}


ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}