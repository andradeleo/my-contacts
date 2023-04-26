/* eslint-disable react/no-unescaped-entities */
import {
	Container,
	Header,
	ListHeader,
	Card,
	ErrorContainer,
	EmptyListContainer,
	SearchNotFoundContainer,
} from "./styles";
import { InputSearchContainer } from "./styles";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

import Loader from "../../components/Loader";

import Sad from "../../assets/images/sad.svg";
import Arrow from "../../assets/icons/arrow.svg";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/Delete.svg";
import { FormEvent, useEffect, useState, useMemo, useCallback } from "react";
import ContactsService from "../../services/contactsService";
import Button from "../../components/Button";
import Box from "../../assets/images/box.svg";
import Magnifier from "../../assets/images/magnifier-question.svg";
import toast from "../../utils/toast";

interface Contacts {
	category_id: string;
	category_name: string;
	email: string;
	id: string;
	name: string;
	phone: string;
}

export default function Home() {
	const [contacts, setContacts] = useState<Contacts[]>([]);
	const [orderBy, setOrderBy] = useState("asc");
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [contactBeingDeleted, setContactBeingDeleted] = useState<Contacts | null>(null);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const filteredContacts = useMemo(() => {
		return contacts.filter((contacts) =>
			contacts.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [contacts, searchTerm]);

	const loadContacts = useCallback(async () => {
		try {
			setIsLoading(true);
			const contactsList = await ContactsService.listContacts(orderBy);
			setHasError(false);
			setContacts(contactsList);
		} catch {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	}, [orderBy]);

	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	function handleToggleOrderBy() {
		setOrderBy((prevState) => (prevState == "asc" ? "desc" : "asc"));
	}

	function handleChangeSearchTerm(e: FormEvent<HTMLInputElement>) {
		setSearchTerm(e.currentTarget.value);
	}

	function handleTryAgain() {
		loadContacts();
	}

	function handleDeleteContact(contact: Contacts) {
		setContactBeingDeleted(contact);
		setIsDeleteModalVisible(true);
	}
	function handleCloseDeleteModal() {
		setIsDeleteModalVisible(false);
		setContactBeingDeleted(null);
	}

	async function handleConfirmDeleteContact() {
		try {
			setIsLoadingDelete(true);
			await ContactsService.deleteContact(contactBeingDeleted?.id);
			handleCloseDeleteModal();
			setContacts((prevState) => prevState.filter((contact) => (
				contact.id != contactBeingDeleted?.id
			)));

			toast({type: "sucess", text: "Contato deletado com sucesso"});

		} catch {
			toast({type: "danger", text: "Ocorreu um erro ao deletar o contato"});
		} finally {
			setIsLoadingDelete(false);
		}
	}

	return (
		<Container>
			<Loader isLoading={isLoading} />

			<Modal
				isLoading={isLoadingDelete}
				danger
				visible={isDeleteModalVisible}
				title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
				confirmLabel="Deletar"
				onCancel={handleCloseDeleteModal}
				onConfirm={handleConfirmDeleteContact}
			>
				<p>Esta ação não poderá ser desfeita!</p>
			</Modal>

			{contacts.length > 0 && (
				<InputSearchContainer>
					<input
						type="text"
						placeholder="Pesquisar contato"
						value={searchTerm}
						onChange={handleChangeSearchTerm}
					/>
				</InputSearchContainer>
			)}

			<Header
				justifyContent={
					hasError
						? "flex-end"
						: contacts.length > 0
							? "space-between"
							: "center"
				}
			>
				{!hasError && contacts.length > 0 && (
					<strong>
						{filteredContacts.length}
						{filteredContacts.length == 1 ? " contato" : " contatos"}
					</strong>
				)}
				<Link to="/new">Novo contato</Link>
			</Header>

			{hasError && (
				<ErrorContainer>
					<img src={Sad} alt="Sad" />
					<div className="details">
						<strong>Ocorreu um erro ao obter os seus contatos!</strong>

						<Button type="button" onClick={handleTryAgain}>
							{" "}
							Tentar novamente{" "}
						</Button>
					</div>
				</ErrorContainer>
			)}

			{!hasError && (
				<>
					{contacts.length < 1 && !isLoading && (
						<EmptyListContainer>
							<img src={Box} alt="Empty box" />

							<p>
								Você ainda não tem nenhum contato cadastrado! Clique no botão
								<strong>"Novo contato"</strong> à cima para cadastrar o seu
								primeiro!
							</p>
						</EmptyListContainer>
					)}

					{contacts.length > 0 && filteredContacts.length < 1 && (
						<SearchNotFoundContainer>
							<img src={Magnifier} alt="Magnifier question" />
							<span>
								Nenhum resultado foi encontrado para{" "}
								<strong>{searchTerm}</strong>
							</span>
						</SearchNotFoundContainer>
					)}

					{filteredContacts.length > 0 && (
						<ListHeader orderBy={orderBy}>
							<button type="button" onClick={handleToggleOrderBy}>
								<span>Nome</span>
								<img src={Arrow} alt="Arrow" />
							</button>
						</ListHeader>
					)}

					{filteredContacts.map((contact) => (
						<Card key={contact.id}>
							<div className="info">
								<div className="contact-name">
									<strong>{contact.name}</strong>
									{contact.category_name && (
										<small>{contact.category_name}</small>
									)}
								</div>
								<span>{contact.email}</span>
								<span>{contact.phone}</span>
							</div>

							<div className="actions">
								<Link to={`/edit/${contact.id}`}>
									<img src={Edit} alt="Edit" />
								</Link>
								<button type="button" onClick={() => handleDeleteContact(contact)}>
									<img src={Delete} alt="Delete" />
								</button>
							</div>
						</Card>
					))}
				</>
			)}
		</Container>
	);
}
