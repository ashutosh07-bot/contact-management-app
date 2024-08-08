import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

interface ContactsState {
  contacts: Contact[];
  currentContact: Contact | null;
}

const initialState: ContactsState = {
  contacts: [],
  currentContact: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    editContact(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    setCurrentContact(state, action: PayloadAction<Contact>) {
      state.currentContact = action.payload;
    },
    clearCurrentContact(state) {
      state.currentContact = null;
    },
  },
});

export const { addContact, editContact, deleteContact, setCurrentContact, clearCurrentContact } = contactsSlice.actions;
export default contactsSlice.reducer;
