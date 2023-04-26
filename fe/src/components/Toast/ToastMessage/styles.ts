import styled, {css} from "styled-components";

interface ContainerProps {
	type: string
}

const containerVariants = {
	default: css` background: ${({theme}) => theme.colors.primary.main};`,
	sucess: css` background: ${({theme}) => theme.colors.sucess.main};`,
	danger: css` background: ${({theme}) => theme.colors.danger.main};`
};

export const Container = styled.div<ContainerProps>`
	padding: 16px 32px;
	color: #FFF;
	border-radius: 4px;
	box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	${({ type }) => containerVariants[type] || containerVariants.default}

	& + & {
		margin-top: 12px;
	}

	img {
		margin-right: 8px;
	}
`;