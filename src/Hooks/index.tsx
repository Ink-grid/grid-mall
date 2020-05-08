/** @format */

import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number) {
	const intervalRef = useRef<number>();
	const callbackRef = useRef(callback);

	// Remember the latest callback.
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		if (typeof delay === 'number') {
			intervalRef.current = window.setInterval(
				() => callbackRef.current(),
				delay
			);
			return () => window.clearInterval(intervalRef.current);
		}
	}, [delay]);
}
