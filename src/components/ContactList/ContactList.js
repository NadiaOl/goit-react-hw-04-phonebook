import React from "react";
import PropTypes from "prop-types";

import css from './ContactList.module.css';

export const ContactList = ({contacts, onDeliteContact}) =>{ 
    return (
        <ul className={css.contactLists}>
            {contacts.map(({id, name, number}) =>
                <li className={css.contactListItem}
                    key={id}>
                    <div className={css.contactListConteiner}>
                        <p className={css.userName}>{name}: </p>
                        <p>{number}</p>
                        <button className={css.listButton} type="button" onClick={() => onDeliteContact(id) }> 
                        <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2"/>
                    </svg> </button>
                    </div>
                </li>
            )  }
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    onDeliteContact: PropTypes.func.isRequired,
}