// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	{
		id: "66毕业相册",
		title: "2025届初中1班的毕业相册",
		description:
			"一个纪念初中班级的网站,可惜的是原github仓库被删了，所以现在只能放个空仓库了",
		image: "",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "completed",
		liveDemo: "https://cn66website.pages.dev/",
		sourceCode: "https://github.com/sxd91/cn66website-master/", // 更改为GitHub链接
		visitUrl: "https://cn66website.pages.dev/", // 添加前往项目链接
		startDate: "2025-01-01",
		endDate: "2025-06-01",
		featured: true,
		tags: ["66", "毕业相册"],
	},
	{
		id: "66毕业相册2",
		title: "2025届高中5班的毕业相册",
		description: "一个纪念高中班级的网站",
		image: "",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "completed",
		liveDemo: "https://6615.pages.dev/",
		sourceCode: "https://github.com/sxd91/66202505/", // 更改为GitHub链接
		visitUrl: "https://6615.pages.dev/", // 添加前往项目链接
		startDate: "2025-01-01",
		endDate: "2025-06-01",
		featured: false,
		tags: ["66", "相册"],
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
