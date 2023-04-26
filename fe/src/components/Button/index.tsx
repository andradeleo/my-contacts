import Spinner from "../Spinner";
import { StyledButton } from "./styles";

interface ButtonProps {
	type?: "button" | "submit";
	disabled?: boolean;
	isLoading?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
	danger?: boolean
}

export default function Button({
	type = "button",
	disabled = false,
	isLoading = false,
	children,
	onClick,
	danger
}: ButtonProps) {
	return (
		<StyledButton
			danger={danger}
			type={type}
			disabled={disabled || isLoading}
			onClick={onClick}
		>
			{!isLoading && children}
			{isLoading && <Spinner size={16}/> }
		</StyledButton>
	);
}
