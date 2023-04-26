import { useState, useCallback } from "react";
import useIsMounted from "./useIsMounted";


export default function useSafeAsyncaState(initialState) {
	const [state, setState] = useState(initialState);

	const isMounted = useIsMounted();

	const setSafeAsyncState = useCallback((data) => {
		if (isMounted()) {
			setState(data);
		}
	}, [isMounted]);

	return [state, setSafeAsyncState];
}