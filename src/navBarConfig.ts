import { type NavBarConfig, LinkPreset } from "./types/config";

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		// 支持自定义导航栏链接，支持多级菜单
		{
			name: "链接",
			url: "/links/",
			icon: "material-symbols:link",
			children: [
				{
					name: "GitHub",
					url: "https://github.xyz/sxdhhh114514",
					external: true,
					icon: "fa6-brands:github",
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/1537249820",
					external: true,
					icon: "fa6-brands:bilibili",
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: false,
					icon: "mdi:git",
				},
			],
		},
		{
			name: "我的",
			url: "/content/",
			icon: "material-symbols:person",
			children: [
				{
					name: "Gallery",
					url: "/albums/",
					icon: "material-symbols:photo-library",
				},
				{
					name: "Devices",
					url: "devices/",
					icon: "material-symbols:devices",
					external: false,
				},
				{
					name: "个人站",
					icon: "material-symbols:person",
					external: true,
					url: "https://9166sxd.pages.dev/recode/sxd.html",
				},
			],
		},
		{
			name: "关于",
			url: "/content/",
			icon: "material-symbols:info",
			children: [
				{
					name: "关于",
					url: "/about/",
					icon: "material-symbols:person",
				},
				{
					name: "友链",
					url: "/friends/",
					icon: "material-symbols:group",
				},
			],
		},
		{
			name: "其他",
			url: "#",
			icon: "material-symbols:more-horiz",
			children: [
				{
					name: "Projects",
					url: "/projects/",
					icon: "material-symbols:work",
				},
				{
					name: "Skills",
					url: "/skills/",
					icon: "material-symbols:psychology",
				},
				{
					name: "Timeline",
					url: "/timeline/",
					icon: "material-symbols:timeline",
				},
			],
		},
	],
};
