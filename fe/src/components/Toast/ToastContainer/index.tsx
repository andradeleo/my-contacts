import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { useState, useEffect, useCallback } from "react";

import { toastEventManager } from "../../../utils/toast";

interface Messages {
	id: number;
	type: string;
	text: string;
	duration?: number;
}

interface Payload {
	type: string;
	text: string;
	duration?: number;
}

export default function ToastContainer() {
	const [messages, setMessages] = useState<Messages[]>([]);

	useEffect(() => {
		function handleAddToast({ type, text, duration }: Payload) {
			setMessages((prevState) => [
				...prevState,
				{ id: Math.random(), type, text, duration },
			]);
		}

		toastEventManager.on("addtoast", handleAddToast);

		return () => {
			toastEventManager.removeListener("addtoast", handleAddToast);
		};
	}, []);

	const handleRemoveMessage = useCallback((id: number) => {
		setMessages((prevState) => prevState.filter((message) => message.id != id));
	}, []);

	return (
		<Container>
			{messages.map((message) => (
				<ToastMessage
					key={message.id}
					message={message}
					onRemoveMessage={handleRemoveMessage}
				/>
			))}
		</Container>
	);
}
