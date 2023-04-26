import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import contactsService from "../../services/contactsService";
import toast from "../../utils/toast";
import { useRef } from "react";

interface FormData {
	name: string;
	email?: string;
	phone?: string;
	categoryId?: string;
}

export default function NewContact() {
	const contactFormRef = useRef(null);

	async function handleSubmit(data: FormData) {
		try {
			const contact = {
				name: data.name,
				email: data.email,
				phone: data.phone,
				category_id: data.categoryId,
			};
			await contactsService.createContact(contact);
			contactFormRef.current.resetFields();

			toast({ type: "sucess", text: "Contato cadastrado com sucesso" });
		} catch {
			toast({ type: "danger", text: "Ocorreu um erro ao cadastrar o contato" });
		}
	}

	return (
		<>
			<PageHeader title="Novo contato" />
			<ContactForm
				buttonLabel="Cadastrar"
				onSubmit={handleSubmit}
				ref={contactFormRef}
			/>
		</>
	);
}
