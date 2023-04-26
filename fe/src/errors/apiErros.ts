/* eslint-disable @typescript-eslint/no-explicit-any */

interface Body {
	error: string | null
}

interface Response {
	status: number,
	statusText: string
}

export default class APIError extends Error {
	name: string;
	response: any;
	body: Body;

	constructor(body : Body, response: Response) {
		super();

		this.name = "APIError";
		this.body = body;
		this.message = body?.error || `${response.status} - ${response.statusText}`;
	}
}
