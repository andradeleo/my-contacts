import { Container } from "./styles";

import Error from "../../../assets/icons/error.svg";
import Sucess from "../../../assets/icons/sucess.svg";
import { useEffect } from "react";

interface ToastMessageProps {
	message: {
		id: number,
		text: string,
		type: string
		duration?: number;
	},
	onRemoveMessage: (id : number) => void;
}

export default function ToastMessage({
	message,
	onRemoveMessage,
}: ToastMessageProps) {

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			onRemoveMessage(message.id);
		}, message.duration || 7000);

		return () => {
			clearTimeout(timeoutID);
		};

	}, [message, onRemoveMessage]);

	function handleRemoveToast() {
		onRemoveMessage(message.id);
	}

	return (
		<Container tabIndex={0} role="button" type={message.type} onClick={handleRemoveToast}>
			{message.type == "danger" && <img src={Error} alt="X" />}
			{message.type == "sucess" && <img src={Sucess} alt="Check" />}
			<strong>{message.text}</strong>
		</Container>
	);
}
