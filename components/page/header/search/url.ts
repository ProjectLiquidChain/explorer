/**
 * Returns the URL to navigate to, by trying to match @param query to a valid
 * route (e.g. account's address or block's height)
 */
export const getSearchUrl = (query: string): string => {
	// Block's height: Integer
	if (parseInt(query, 10).toString(10) === query) {
		return `/block/${query}`;
	}
	// Account's address: LBGLLK7WVV...
	if (query.startsWith("L")) {
		return `/account/${query}`;
	}
	// Transaction's hash: all else
	return `/transaction/${query}`;
};
