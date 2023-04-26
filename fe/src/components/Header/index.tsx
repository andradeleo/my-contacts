import { Container } from "./styles";

import Logo from "../../assets/images/logo.svg";

export default function Header() {
	return (
		<Container>
			<img src={Logo} alt="MyContacts" width={"201px"} />
		</Container>
	);
}
