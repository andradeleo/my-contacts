export default class EventManager {
	listeners;

	constructor() {
		this.listeners = new Map();
	}

	on(event: string, listener) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}

		this.listeners.get(event).push(listener);
	}

	emit(event: string, payload: { type: string; text: string, duration?: number }) {
		if (!this.listeners.has(event)) {
			return;
		}

		this.listeners.get(event).forEach((listener) => {
			listener(payload);
		});
	}

	removeListener(event: string, listenerToRemove) {
		const listener = this.listeners.get(event);

		if (!listener) {
			return;
		}

		const filteredListeners = listener.filter(
			(listener) => listener != listenerToRemove
		);
		this.listeners.set(event, filteredListeners);
	}
}
