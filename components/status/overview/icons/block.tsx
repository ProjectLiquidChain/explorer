export const OverviewBlockIcon = (props: any): JSX.Element => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 3L20 7V17L12 21L4 17V7L12 3Z" fill="var(--highlight-3)" />
		<path
			d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M4 7L12 11M4 7V17L12 21M12 11V21"
			stroke="var(--highlight-9)"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
