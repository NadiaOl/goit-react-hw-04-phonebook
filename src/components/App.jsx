import React, {useEffect, useState} from "react";
import {ContactForm} from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import {Filter} from './Filter/Filter'
import css from './ContactForm/ContactForm.module.css';



export const App = () => {
const[contacts, setContacts] = useState(
  [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]
)
const [filter, setfilter] = useState('')


useEffect(() => {
  const contactsInLocalStorage = localStorage.getItem('contacts');
  const parsedContacrs = JSON.parse(contactsInLocalStorage)

  if(parsedContacrs) {
    setContacts(parsedContacrs)
  }
}, [])

useEffect(()=>{
  localStorage.setItem('contacts', JSON.stringify(contacts))
},[contacts])


const  deleteContact = contactId => {
  setContacts(prevState => prevState.filter(contact => contact.id !== contactId),
    );
  }

  const  onSubmitForm = ({name, number}) => {
    const newContact = {
      id: nanoid(),
      name,
      number
    }

      if (contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
        alert(`${name} is already in contacts`);
      } else { setContacts(prevState => ( [newContact, ...prevState]
      ))}
  }

  const  changeFilter = (event) => {
    setfilter(event.currentTarget.value)
  }

    const getVisibleContacts = () => {
      const normalizeFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizeFilter))
    }
  
    const visibleContacts = getVisibleContacts();
    
    return (
      <div className={css.phonebook}>
        <h2 className={css.phonebookTitle}>Phonebook</h2>
        <ContactForm onSubmit={onSubmitForm}/>
        <Filter value={filter} onChangeFilter={changeFilter}/>
        <h3 className={css.phonebookSubTitle}>Contacts</h3>
          <ContactList contacts={visibleContacts} onDeliteContact={deleteContact}/>
      </div>
    )
  }
