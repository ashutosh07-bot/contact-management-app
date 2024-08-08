import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact, Contact, clearCurrentContact } from '../features/contactsSlice';
import { RootState, AppDispatch } from '../store';

interface ContactFormProps {
  onClose?: () => void; 
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentContact = useSelector((state: RootState) => state.contacts.currentContact);

  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  // Effect to populate form with current contact data when editing
  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setStatus(currentContact.status);
    } else {
      // Reset form if no contact is being edited
      setName('');
      setEmail('');
      setStatus('Active');
    }
  }, [currentContact]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentContact) {
      // Editing existing contact
      const updatedContact: Contact = {
        ...currentContact,
        name,
        email,
        status,
      };
      dispatch(editContact(updatedContact));
      dispatch(clearCurrentContact());
    } else {
      // Adding new contact
      const newContact: Contact = {
        id: new Date().toISOString(),
        name,
        email,
        status,
      };
      dispatch(addContact(newContact));
    }
    // Reset form fields
    setName('');
    setEmail('');
    setStatus('Active');
    // Close the form if a callback is provided
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="block mb-2 p-2 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block mb-2 p-2 border border-gray-300 rounded w-full"
        required
      />
      <div className="mb-2">
        <label>
          <input
            type="radio"
            value="Active"
            checked={status === 'Active'}
            onChange={() => setStatus('Active')}
            className="mr-2"
          />
          Active
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="Inactive"
            checked={status === 'Inactive'}
            onChange={() => setStatus('Inactive')}
            className="mr-2"
          />
          Inactive
        </label>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {currentContact ? 'Save Edited Contact' : 'Save Contact'}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default ContactForm;

