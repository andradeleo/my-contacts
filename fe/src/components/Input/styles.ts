import styled, {css} from "styled-components";

interface InputProps {
	error?: string
}

export const Input = styled.input<InputProps>`
	width: 100%;
	background: #FFF;
	border: 0;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
	height: 52px;
	border-radius: 4px;
	outline: none;
	padding: 0px 16px;
	font-size: 16px;
	border: 2px solid #FFF;
	transition: border-color 0.2s ease-in;
	appearance: none;

	&:focus {
		border-color: ${({ theme }) => theme.colors.primary.main};
	}

	${({ theme, error }) => error && css`
		color: ${theme.colors.danger.main};
		border-color: ${theme.colors.danger.main} !important;
	`}

	&[disabled] {
		background-color: ${({ theme }) => theme.colors.gray[100]};
		border-color: ${({ theme }) => theme.colors.gray[200]};
	}
`;