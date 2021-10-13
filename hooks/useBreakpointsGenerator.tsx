/**
 * Custom hook to generate breakpoints responsible for changing active menu entry
 *
 * @param stateFunction - function that will get executed after active section change
 * @param menuElementWrapper - id of the element with menu entries
 * @param sectionsWrapper - id of the element parent to all the sections
 */

export const useBreakpointsGenerator = (
	stateFunction: (value: number) => void,
    menuElementWrapper: string,
    sectionsWrapper: string
) => {
	const handleScroll = (breakpoints: number[]) => {
		const menu = document.getElementById(menuElementWrapper) as HTMLElement;
		const offsetTop = window.pageYOffset;
		if (menu) {
			const menuOffset = menu.offsetTop;
			breakpoints?.forEach((b, i) => {
				if (
					offsetTop + menuOffset >= b &&
					offsetTop + menuOffset < breakpoints[i + 1]
				) {
					stateFunction(i + 1);
				}
			});
		}
	};

	const generateBreakpoints = () => {
		const newBreakpoints: number[] = [];
		window.removeEventListener('scroll', () => handleScroll(newBreakpoints));
		const wrapper = document.getElementById(sectionsWrapper);
		wrapper?.childNodes.forEach((n) => {
			if (n.nodeName === 'SECTION') {
				newBreakpoints.push((n as HTMLDivElement).offsetTop);
			}
		});
		newBreakpoints.push(document.body.scrollHeight);
		window.addEventListener('scroll', () => handleScroll(newBreakpoints));
		return newBreakpoints;
	};

	useEffect(() => {
		const newBreakpoints = generateBreakpoints();
		// Execute once after website reload
		handleScroll(newBreakpoints);

		return () => {
			window.removeEventListener('scroll', () => handleScroll(newBreakpoints));
		};
	}, []);
};
