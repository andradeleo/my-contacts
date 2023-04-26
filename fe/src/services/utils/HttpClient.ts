import delay from "../../utils/delay";
import APIError from "../../errors/apiErros";

interface Body {
	name:string,
	email?: string,
	phone?: string,
	categoryId?: string
}

interface Options {
	method: "POST" | "GET" | "PUT" | "DELETE"
	body?: Body,
	headers?: object
}

interface ConfigRequest {
	body?: Body,
	headers?: any
}

class HttpClient {

	baseURL : string;

	constructor(base : string) {
		this.baseURL = base;
	}

	get(path : string, config?: ConfigRequest) {
		return this.MakeRequest(path, {method : "GET", headers: config?.headers});
	}

	post(path : string, config?: ConfigRequest) {
		return this.MakeRequest(path, {
			method: "POST",
			body: config?.body,
			headers: config?.headers,
		});
	}

	put(path : string, config?: ConfigRequest) {
		return this.MakeRequest(path, {
			method: "PUT",
			body: config?.body,
			headers: config?.headers,
		});
	}

	delete(path : string, config?: ConfigRequest) {
		return this.MakeRequest(path, {
			method: "DELETE",
			headers: config?.headers,
		});
	}


	async MakeRequest(path : string, options: Options) {
		await delay(500);

		const headers = new Headers();
		if (options.body) {
			headers.append( "Content-Type", "application/json");
		}

		const response = await fetch(`${this.baseURL}${path}` , {
			method: options.method,
			body: JSON.stringify(options.body),
			headers
		});

		let responseBody = null;
		const contentType = response.headers.get("Content-type");
		if (contentType?.includes("application/json")) {
			responseBody = await response.json();
		}

		if (response.ok) {
			return responseBody;
		}

		throw new APIError(responseBody, response);

	}

}

export default HttpClient;