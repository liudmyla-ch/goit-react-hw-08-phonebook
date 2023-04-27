import { createSelector } from '@reduxjs/toolkit';
export const selectFilter = state => state.filter;
export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    )
);