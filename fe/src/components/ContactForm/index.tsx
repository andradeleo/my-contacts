/* eslint-disable no-empty */
import { Form, ButtonContainer } from "./styles";
import FormGroup from "../FormGroup";
import { Select } from "../Select/styles";
import { Input } from "../Input/styles";
import Button from "../Button";
import {
	useState,
	useEffect,
	FormEvent,
	forwardRef,
	useImperativeHandle,
} from "react";
import CategoryService from "../../services/categoryService";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErros from "../../hooks/useErrors";
import useSafeAsyncaState from "../../hooks/useSafeAsyncState";

interface FormData {
	name: string;
	email?: string;
	phone?: string;
	categoryId?: string;
}

interface ContactFormProps {
	buttonLabel: string;
	onSubmit: (data: FormData) => Promise<void>;
}

interface Category {
	id: string;
	name: string;
}

const ContactForm = forwardRef(
	({ buttonLabel, onSubmit }: ContactFormProps, ref) => {
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const [phone, setPhone] = useState("");
		const [categoryId, setCategoryId] = useState("");
		const [categories, setCategories] = useSafeAsyncaState([]);
		const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncaState(true);
		const [isSubmitting, setIsSubmitting] = useState(false);

		const { errors, removeError, getErrorMessageByFieldName, setError } =
			useErros();

		const isFormValid = name && errors.length == 0;

		useImperativeHandle(
			ref,
			() => ({
				setFieldsValues: (contact: FormData) => {
					setName(contact.name ?? "");
					setEmail(contact.email ?? "");
					setPhone(formatPhone(contact.phone) ?? "");
					setCategoryId(contact.category_id ?? "");
				},

				resetFields: () => {
					setName("");
					setEmail("");
					setPhone(formatPhone(""));
					setCategoryId("");
				},
			}),
			[]
		);

		useEffect(() => {
			async function loadCategories() {
				try {
					const categoriesList = await CategoryService.listCategories();
					setCategories(categoriesList);
				} catch {
				} finally {
					setIsLoadingCategories(false);
				}
			}

			loadCategories();
		}, [setCategories, setIsLoadingCategories]);

		function handleNameChange(e: FormEvent<HTMLInputElement>) {
			setName(e.currentTarget.value);

			if (!e.currentTarget.value) {
				setError({ field: "name", message: "Nome é obrigatório." });
			} else {
				removeError("name");
			}
		}

		function handleEmailChange(e: FormEvent<HTMLInputElement>) {
			setEmail(e.currentTarget.value);

			if (e.currentTarget.value && !isEmailValid(e.currentTarget.value)) {
				setError({ field: "email", message: "E-mail inválido" });
			} else {
				removeError("email");
			}
		}

		function handlePhoneChange(e: FormEvent<HTMLInputElement>) {
			setPhone(formatPhone(e.currentTarget.value));
		}

		async function handleSubmit(e: FormEvent) {
			e.preventDefault();
			setIsSubmitting(true);
			await onSubmit({ name, email, phone, categoryId });
			setIsSubmitting(false);
		}

		return (
			<Form onSubmit={handleSubmit} noValidate>
				<FormGroup error={getErrorMessageByFieldName("name")}>
					<Input
						error={getErrorMessageByFieldName("name")}
						placeholder="Nome *"
						type="text"
						value={name}
						onChange={handleNameChange}
						disabled={isSubmitting}
					/>
				</FormGroup>

				<FormGroup error={getErrorMessageByFieldName("email")}>
					<Input
						error={getErrorMessageByFieldName("email")}
						placeholder="E-mail"
						type="email"
						value={email}
						onChange={handleEmailChange}
						disabled={isSubmitting}
					/>
				</FormGroup>

				<FormGroup>
					<Input
						placeholder="Telefone"
						type="text"
						value={phone}
						onChange={handlePhoneChange}
						disabled={isSubmitting}
					/>
				</FormGroup>

				<FormGroup isLoading={isLoadingCategories}>
					<Select
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						disabled={isLoadingCategories || isSubmitting}
					>
						<option value="">Sem Categoria</option>

						{categories.map((category : Category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				</FormGroup>

				<ButtonContainer>
					<Button
						type="submit"
						disabled={!isFormValid}
						isLoading={isSubmitting}
					>
						{buttonLabel}
					</Button>
				</ButtonContainer>
			</Form>
		);
	}
);

ContactForm.displayName = "ContactForm";
export default ContactForm;
