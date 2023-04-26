import { Overlay, Container, Footer } from "./styles";
import Button from "../Button";

import ReactPortal from "../ReactPortal";

interface ModalProps {
	danger?: boolean;
	title: string;
	children?: React.ReactNode;
	cancelLabel?: string;
	confirmLabel?: string;
	onCancel: () => void;
	onConfirm: () => void;
	visible: boolean;
	isLoading: boolean;
}

export default function Modal({
	danger = false,
	title,
	children,
	cancelLabel = "Cancelar",
	confirmLabel = "Confirmar",
	onCancel,
	onConfirm,
	visible,
	isLoading = false,
}: ModalProps) {
	if (!visible) {
		return null;
	}

	return (
		<ReactPortal containerId="modal-root">
			<Overlay>
				<Container danger={danger}>
					<h1>{title}</h1>
					<div className="modal-body">{children}</div>
					<Footer>
						<button
							type="button"
							className="cancel-button"
							onClick={onCancel}
							disabled={isLoading}
						>
							{cancelLabel}
						</button>
						<Button
							danger={danger}
							type="button"
							onClick={onConfirm}
							isLoading={isLoading}
						>
							{confirmLabel}
						</Button>
					</Footer>
				</Container>
			</Overlay>
		</ReactPortal>
	);
}
