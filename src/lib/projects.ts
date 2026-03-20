export interface Project {
	slug: string;
	title: string;
	eyebrow: string;
	description: string;
	cover: string;
	year: string;
}

export const projects: Project[] = [
	{
		slug: "landscape",
		title: "Against the Grain",
		eyebrow: "Landscape",
		year: "2024",
		cover: "/images/landscape/autumn-oak-leaves-macro.jpg",
		description:
			"These two frames were made weeks apart but arrived at the same conclusion — that the most arresting landscapes are the ones that refuse scale. A single oak leaf matte with autumn wax. A scarlet ibis in water the colour of iron. Neither wanted to be grand. Both insisted on being looked at slowly.",
	},
	{
		slug: "portraits",
		title: "The Quiet Room",
		eyebrow: "Portraits",
		year: "2023–24",
		cover: "/images/portraits/woman-white-sweater-autumn-forest.jpg",
		description:
			"Six portraits made over eighteen months across London and Paris. The brief was the same each time: no direction, no pose, just presence. What came back from the lab was less about the subjects than about the particular quality of silence a person carries when they forget they are being photographed.",
	},
	{
		slug: "street",
		title: "Available Light",
		eyebrow: "Street",
		year: "2024",
		cover: "/images/street/bw-man-glasses-street-reflection.jpg",
		description:
			"Two frames from two different nights. One was made in the glass of a shop front on a wet Tuesday in Soho; the other outside a night market somewhere in Southeast Asia. Both were available-light, both were instinctive, and both arrived at the same formal interest: the face doubled, the moment suspended between the real and its reflection.",
	},
	{
		slug: "travel",
		title: "Above the Seine",
		eyebrow: "Travel",
		year: "2024",
		cover: "/images/travel/paris-aerial-eiffel-tower-sunset-portrait.jpg",
		description:
			"Paris from a height, at the hour when the city stops performing and becomes itself. Four photographs made over two evenings from the same vantage point as the light changed. The Tower reads differently at every degree of dusk — monumental, then skeletal, then briefly golden, then just iron against ink.",
	},
];

export function getProjectBySlug(slug: string) {
	return projects.find((p) => p.slug === slug);
}
