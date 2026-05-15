/**
 * 页面全局预加载器 - 在页面加载时预加载所有资源和页面
 */
export class PagePreloader {
	private loadedResources: Set<string> = new Set();
	private loadingPromises: Map<string, Promise<void>> = new Map();
	private preloadedPages: Set<string> = new Set();
	private progressCallback:
		| ((progress: number, status: string) => void)
		| null = null;

	setProgressCallback(
		callback: (progress: number, status: string) => void,
	): void {
		this.progressCallback = callback;
	}

	private updateProgress(
		current: number,
		total: number,
		status: string,
	): void {
		const progress = Math.min(Math.round((current / total) * 100), 95);
		if (this.progressCallback) {
			this.progressCallback(progress, status);
		}
	}

	private async preloadImage(url: string): Promise<void> {
		if (this.loadedResources.has(url)) return;
		if (this.loadingPromises.has(url)) {
			await this.loadingPromises.get(url);
			return;
		}

		const promise = new Promise<void>((resolve) => {
			const img = new Image();
			img.onload = () => {
				this.loadedResources.add(url);
				this.loadingPromises.delete(url);
				resolve();
			};
			img.onerror = () => {
				this.loadingPromises.delete(url);
				resolve();
			};
			img.src = url;
		});

		this.loadingPromises.set(url, promise);
		await promise;
	}

	private getImageResources(): string[] {
		return [
			...Array.from(
				{ length: 6 },
				(_, i) => `/assets/desktop-banner/${i + 1}.webp`,
			),
			...Array.from(
				{ length: 6 },
				(_, i) => `/assets/mobile-banner/${i + 1}.webp`,
			),
			"/assets/home/default-logo.png",
			"/assets/home/home.png",
			"/logo.png",
			"/images/albums/AcgExample/cover.jpg",
			"/images/albums/newphoto/cover.jpg",
			"/assets/images/avatar.webp",
			"/images/device/oneplus13t.png",
			"/images/device/mt3000.png",
			"/pio/static/avatar.jpg",
			"/assets/music/cover/xryx.jpg",
			"/assets/music/cover/hitori.jpg",
			"/assets/music/cover/cl.jpg",
			"/sakura.png",
			"/assets/anime/tz1.webp",
			"/assets/anime/rynh.webp",
			"/assets/anime/lkls.webp",
			"/assets/anime/laxxx.webp",
			"/assets/anime/cmmn.webp",
		];
	}

	private getPageUrls(): string[] {
		return [
			"/",
			"/about",
			"/projects",
			"/albums",
			"/friends",
			"/diary",
			"/timeline",
			"/anime",
			"/devices",
		];
	}

	async start(): Promise<void> {
		const allResources = this.getImageResources();
		const allPages = this.getPageUrls();
		const totalItems = allResources.length + allPages.length;
		let completedItems = 0;

		this.updateProgress(0, totalItems, "正在加载资源...");

		const imagePromises = allResources.map((url) =>
			this.preloadImage(url).then(() => {
				completedItems++;
				this.updateProgress(
					completedItems,
					totalItems,
					completedItems < allResources.length
						? "正在加载资源..."
						: "正在预加载页面...",
				);
			}),
		);

		await Promise.all(imagePromises);

		for (const url of allPages) {
			if (this.preloadedPages.has(url)) continue;
			try {
				if (window.swup && typeof window.swup.preload === "function") {
					await window.swup.preload(url);
				} else {
					await fetch(url, { method: "HEAD" });
				}
				this.preloadedPages.add(url);
			} catch {}
			completedItems++;
			this.updateProgress(
				completedItems,
				totalItems,
				"正在预加载页面...",
			);
		}

		if (this.progressCallback) {
			this.progressCallback(100, "加载完成");
		}
	}

	getLoadedCount(): number {
		return this.loadedResources.size;
	}
	getPreloadedPageCount(): number {
		return this.preloadedPages.size;
	}
}

export const pagePreloader = new PagePreloader();
