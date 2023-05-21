import React, {Component, useEffect, useState} from "react";
import {ContactForm} from './ContactForm/ContactForm';
import {ContactList} from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import {Filter} from './Filter/Filter'
import css from './ContactForm/ContactForm.module.css';

// let contacts = [
//   {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//   {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//   {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//   {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
// ]

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
const [name, setName] = useState('')
const [number, setNumber] = useState('')

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
  setContacts(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

  const  onSubmitForm = ({name, number}) => {
    const newContact = {
      id: nanoid(),
      name,
      number
    }

      if (contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
        alert(`${name} is already in contacts`);
      } else { setContacts(prevState => ({
        contacts: [newContact, ...prevState.contacts]
      }))}
  }

  const  changeFilter = (event) => {
    setfilter(event.currentTarget.value)
  }


    const nornalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(nornalizeFilter)
    );
    
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


// export class App extends Component {
//   state = {
//     contacts: [
//       {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//       {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//       {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//       {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//     ],
//     filter: '',
//     name: '',
//     number: ''
//   }

//   componentDidMount() {
//     const contactsInLocalStorage = localStorage.getItem('contacts');
//     const parsedContacrs = JSON.parse(contactsInLocalStorage)

//     if(parsedContacrs) {
//       this.setState({contacts: parsedContacrs})
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   }

//   onSubmitForm = ({name, number}) => {
//     const newContact = {
//       id: nanoid(),
//       name,
//       number
//     }

//       if (this.state.contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
//         alert(`${name} is already in contacts`);
//       } else { this.setState(prevState => ({
//         contacts: [newContact, ...prevState.contacts]
//       }))}
//   }

//   changeFilter = (event) => {
//     this.setState({filter: event.currentTarget.value})
//   }

//   render() {
//     const {filter} = this.state
//     const nornalizeFilter = this.state.filter.toLowerCase();
//     const visibleContacts = this.state.contacts.filter(contact => 
//       contact.name.toLowerCase().includes(nornalizeFilter)
//     );
    
//     return (
//       <div className={css.phonebook}>
//         <h2 className={css.phonebookTitle}>Phonebook</h2>
//         <ContactForm onSubmit={this.onSubmitForm}/>
//         <Filter value={filter} onChangeFilter={this.changeFilter}/>
//         <h3 className={css.phonebookSubTitle}>Contacts</h3>
//           <ContactList contacts={visibleContacts} onDeliteContact={this.deleteContact}/>
//       </div>
//     )
//   }
// }