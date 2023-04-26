import HttpClient from "./utils/HttpClient";

interface FormData {
	name: string;
	email?: string;
	phone?: string;
	categoryId?: string;
}

class ContactsServices {
	httpClient;

	constructor() {
		this.httpClient = new HttpClient("http://localhost:3001");
	}

	listContacts(orderBy = "asc") {
		return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
	}

	getContactById(id : string) {
		return this.httpClient.get(`/contacts/${id}`);
	}

	createContact(contact: FormData) {
		return this.httpClient.post("/contacts", { body: contact });
	}

	updateContact(id: string, contact:FormData) {
		return this.httpClient.put(`/contacts/${id}`, { body: contact });
	}

	deleteContact(id: string | undefined) {
		return this.httpClient.delete(`/contacts/${id}`);
	}
}

export default new ContactsServices();
