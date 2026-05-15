/**
 * 批量生成相册缩略图
 * 使用方法: node scripts/generate-thumbnails.js
 */

import fs from "fs";
import path from "path";

// 获取脚本所在目录（修复 Windows 路径）
const __dirname = path
	.dirname(new URL(import.meta.url).pathname)
	.replace(/^\/([A-Za-z]):\//, "$1:/");
const albumsDir = path.join(__dirname, "../public/images/albums");
const thumbnailSize = 400;

async function generateThumbnails() {
	console.log("=== 开始生成相册缩略图 ===");

	if (!fs.existsSync(albumsDir)) {
		console.error("相册目录不存在:", albumsDir);
		return;
	}

	const albumFolders = fs
		.readdirSync(albumsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	for (const folder of albumFolders) {
		console.log(`处理相册: ${folder}`);
		const albumPath = path.join(albumsDir, folder);
		const files = fs.readdirSync(albumPath);

		const imageFiles = files.filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext);
		});

		for (const file of imageFiles) {
			const filePath = path.join(albumPath, file);
			const ext = path.extname(file).toLowerCase();
			const thumbnailPath = path.join(
				albumPath,
				file.replace(ext, `_thumb${ext}`),
			);

			if (fs.existsSync(thumbnailPath)) {
				continue;
			}

			try {
				const sharp = await import("sharp");
				await sharp
					.default(filePath)
					.resize(thumbnailSize, thumbnailSize, {
						fit: "inside",
						withoutEnlargement: true,
					})
					.jpeg({ quality: 80 })
					.toFile(thumbnailPath);

				console.log(`  生成缩略图: ${file}`);
			} catch (error) {
				console.error(`  生成缩略图失败: ${file}`, error.message);
			}
		}
	}

	console.log("=== 缩略图生成完成 ===");
}

generateThumbnails().catch(console.error);
