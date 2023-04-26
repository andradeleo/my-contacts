import styled, { css } from "styled-components";

interface ContainerProps {
  danger?: boolean;
}

export const StyledButton = styled.button<ContainerProps>`
	height: 52px;
	border-radius: 4px;
	border: 0;
	padding: 0px 16px;
	background: ${({ theme }) => theme.colors.primary.main};
	font-size: 16px;
	font-weight: bold;
	border-radius: 4px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
	color: #FFF;
	transition: background  0.2s ease-in;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: ${({ theme }) => theme.colors.primary.light};
	}

	&:active {
		background: ${({ theme }) => theme.colors.primary.dark};
	}

	&[disabled] {
		background: #ccc !important;
		cursor: default !important;
	}

	${({ theme, danger}) => danger && css`
		background: ${ theme.colors.danger.main};

			&:hover {
			background: ${theme.colors.danger.light};
		}

			&:active {
				background: ${theme.colors.danger.dark};
		}
	`}

`;