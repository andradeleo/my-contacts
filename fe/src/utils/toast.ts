import EventManager from "../lib/EventManager";

export const toastEventManager = new EventManager();

interface ToastProps {
	type: string,
	text: string,
	duration?: number
}

export default function toast({type, text, duration} : ToastProps) {
	toastEventManager.emit("addtoast", {type, text, duration});
}