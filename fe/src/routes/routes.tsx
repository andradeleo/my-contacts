import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import NewContact from "../pages/NewContact";
import AddContact from "../pages/EditContact";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/new",
		element: <NewContact />,
	},
	{
		path: "/edit/:id",
		element: < AddContact />,
	},
]);
