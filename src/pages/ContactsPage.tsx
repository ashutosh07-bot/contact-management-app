import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ContactForm from '../component/ContactForm';
import ContactList from '../component/ContactList';
import NoContactCard from '../component/NoContactCard';

const ContactsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  // Effect to show or hide the form based on the presence of contacts
  useEffect(() => {
    if (contacts.length > 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [contacts]);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  return (
    <div className="flex flex-col items-center mt-8 w-full px-4">
      {contacts.length === 0 && !showForm ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleShowForm}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          >
            Create Contact
          </button>
          <NoContactCard />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full mt-8">
          <div className="w-full md:w-1/4 p-4">
            {showForm && <ContactForm onClose={handleHideForm} />}
          </div>
          <div className="w-full md:w-3/4 p-4">
            <ContactList />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
