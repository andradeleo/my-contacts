import { ThemeProvider } from "styled-components";

import { defaultTheme } from "../../assets/styles/themes/default";
import GlobalStyles from "../../assets/styles/global";

import Header from "../Header";
import ToastContainer from "../Toast/ToastContainer";
import { RouterProvider } from "react-router-dom";
import { router } from "../../routes/routes";

import { Container } from "./styles";

export default function App() {


	return (
		<ThemeProvider theme={ defaultTheme }>
			<GlobalStyles />
			<ToastContainer />
			<Container>
				<Header />
				<RouterProvider router={router} />
			</Container>
		</ThemeProvider>
	);
}
