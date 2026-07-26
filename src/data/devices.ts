// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	redmi: [
		{
			name: "Redmi turbo4 Pro",
			image: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/redmiTrubo4Pro/images/14932.png",
			specs: "black / 12G + 512GB",
			description:
				"呼吸灯, 7500MA battery, 90W SuperVOOC，unlockbootloader, root, custom rom.",
			link: "https://www.mi.com/prod/redmi-turbo-4-pro",
		},
		{
			name: "Redmi watch6",
			image: "https://cdn.cnbj1.fds.api.mi-img.com/product-images/new-product-images/redmi-watch-6_57896/images/27.png",
			specs: "black",
			description: "长续航, 大屏, BES27101BP，强大的第三方社区ASTROBX。",
			link: "https://www.mi.com/prod/redmi-watch-6",
		},
	],
	Router: [
		{
			name: "GL-MT3000",
			image: "/images/device/mt3000.png",
			specs: "1000Mbps / 2.5G",
			description:
				"Portable WiFi 6 router suitable for business trips and home use.",
			link: "https://www.gl-inet.cn/products/gl-mt3000/",
		},
	],
};
