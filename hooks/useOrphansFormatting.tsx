/**
 * Custom hook that will format polish text and move orphans (e.g. 'i', 'w', etc.) to the next line
 *
 * @param language - current language from i18n
 * @param appWrapper - wrapper containing all the DOM elements
 */

export const useOrphansFormatting = (language: string, appWrapper: string) => {
	const applyTextFormatting = () => {
		const wrapper = document.getElementById(appWrapper);
		if (wrapper && language === 'pl') {
			recursiveChildFinder(wrapper);
		}
	};

	const recursiveChildFinder = (node: HTMLElement) => {
		const nodes = node.children;
		if (nodes.length > 0) {
			for (let i = 0; i < nodes.length; i++) {
				const item = nodes.item(i) as HTMLElement;
				recursiveChildFinder(item);
			}
		} else if (node.innerText) {
			node.innerHTML = formatText(node.innerText);
		}
	};

	useEffect(() => {
		applyTextFormatting();
	}, [language]);
};

export const formatText = (text: string) => {
	return text.replace(/(\s)([\S])[\s]+/g, '$1$2&nbsp;');
};
