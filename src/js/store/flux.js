const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: []
		},
		actions: {
			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/javier/contacts");
					if (!response.ok) {
						getActions().createAgenda();
						return;
					}

					const data = await response.json();

					if (data) setStore({ contactList: data.contacts });

					return data;

				} catch (error) {
					console.log(error);
				}
			},

			createAgenda: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/javier", {
						method: "POST",
					})

					if (!response.ok) throw new Error(response.statusText);

					const data = await response.json();
					console.log(data);

				} catch (error) {
					console.log(error);
				}
			},

			addContact: (contact) => {
				const store = getStore();
				setStore({ ...store, contactList: [...store.contactList, contact] });
			},

			createContact: async (contact) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/javier/contacts", {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact),
					})

					if (!response.ok) throw new Error(response.statusText);

					const data = await response.json();
					getActions().addContact(data);
					
				} catch (error) {
					console.log(error);
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/javier/contacts/${id}`, {
						method: "DELETE",
					})

					if (!response.ok) throw new Error(response.statusText);

					const store = getStore();
					const newContactList = store.contactList.filter(contact => contact.id !== id);
					setStore({ contactList: newContactList });

				} catch (error) {
					console.log(error);
				}
			},

			editContact: async (id, contact) => {
				try {

					const response = await fetch(`https://playground.4geeks.com/contact/agendas/javier/contacts/${id}`, {
						method: "PUT",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					})

					if (!response.ok) throw new Error(response.statusText);

					const data = await response.json();

					if (data) {
						const store = getStore();
						const newContactList = store.contactList.map(contact => 
							contact.id == id ? data : contact // Si el id del contacto coincide con el id editado se reemplaza con la data
						);
			
						setStore({ contactList: newContactList });
					}

				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
