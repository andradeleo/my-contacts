import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import contactsService from "../../services/contactsService";

import Loader from "../../components/Loader";
import toast from "../../utils/toast";
import useSafeAsyncaAction from "../../hooks/useSafeAsyncAction";

interface FormData {
	name: string;
	email?: string;
	phone?: string;
	categoryId?: string;
}


export default function EditContact() {
	const [isLoading, setIsLoading] = useState(true);
	const [contactName, setContactName] = useState("");

	const contactFormRef = useRef(null);

	const { id } = useParams();
	const navigate = useNavigate();
	const safeAsyncAction = useSafeAsyncaAction();

	useEffect(() => {
		async function loadContact() {
			try {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const contact = await contactsService.getContactById(id!);

				safeAsyncAction(() => {
					contactFormRef.current.setFieldsValues(contact);
					setIsLoading(false);
					setContactName(contact.name);
				});

			} catch {
				safeAsyncAction(() => {
					navigate("/");
					toast({ type: "danger", text: "Contato não encontrado" });
				});
			}
		}

		loadContact();
	}, [id, navigate,safeAsyncAction]);

	async function handleSubmit(formData : FormData) {
		try {
			const contact = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				category_id: formData.categoryId,
			};
			const contactData = await contactsService.updateContact(id, contact);
			setContactName(contactData.name);

			toast({type: "sucess", text:"Contato editado com sucesso"});

		} catch {
			toast({type: "danger", text:"Ocorreu um erro ao editar o contato"});
		}
	}

	return (
		<>
			<Loader isLoading={isLoading} />
			<PageHeader title={isLoading ? "Carregando ..." : `Editar ${contactName}`} />
			<ContactForm
				buttonLabel="Salvar alterações"
				onSubmit={handleSubmit}
				ref={contactFormRef}
			/>
		</>
	);
}
