// The observer functionality
/* const observer = useRef();
	const lastWordElementRef = useCallback(
		(node) => {
			if (loading) return;
			//sd
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && limit < itemsCount) {
					setLimit((prev) => prev + DEFAULT_WORD_LIST_LIMIT);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, itemsCount]
	); */

// loading words progress
/* 
<IF condition={loading}>
					<h2 className="mt-3 text-center">
						<CircularProgress size={30} color="primary" />
					</h2>
				</IF>
*/

// list item in a list (ref)
/* 			if (list.length - 1 === index) {
				return (
					<Grid ref={lastWordRef} {...gridProps}>
						<WordCard wordData={word} id={id} />
					</Grid>
				);
			}
 */
