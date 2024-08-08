import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { deleteContact, setCurrentContact } from '../features/contactsSlice';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch<AppDispatch>();

  // Set current contact for editing
  const handleEditClick = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      dispatch(setCurrentContact(contact));
    }
  };

  return (
    <div className="p-4">
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <>
          <h1 className="px-2 py-1 bg-green-500 text-white rounded">View Contacts</h1>
          <ul>
            {contacts.map(contact => (
              <li
                key={contact.id}
                className="mb-2 p-2 border border-gray-300 rounded flex flex-col md:flex-row md:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p className="text-sm">{contact.email}</p>
                  <p className="text-sm">Status: {contact.status}</p>
                </div>
                <div className="mt-2 md:mt-0 flex justify-end md:justify-start">
                  <button
                    onClick={() => dispatch(deleteContact(contact.id))}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(contact.id)}
                    className="ml-4 px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ContactList;

