/**
 * Custom hook to detect wheter a click appeared outside of passed element
 *
 * @param ref - ref to the element being watched for click
 * @param stateFunction - state function to execute after clicking outside of the element
 */

export const useClickOutsideHandler = (
	ref: React.MutableRefObject<HTMLDivElement>,
	stateFunction: () => void,
) => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				stateFunction();
			}
		}

		document.addEventListener('mouseup', handleClickOutside);
		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
		};
	}, [ref]);
};
