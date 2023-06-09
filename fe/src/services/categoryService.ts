import HttpClient from "./utils/HttpClient";

class CategoryService {
	httpClient;

	constructor() {
		this.httpClient = new HttpClient("http://localhost:3001");
	}

	listCategories() {
		return this.httpClient.get("/categories");
	}
}

export default new CategoryService();
