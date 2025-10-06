// frontend/utils/kolamExporter.ts

import { KolamPattern } from '~/types/kolam';
import { SVGGenerator } from './svgGenerator';

// A utility to trigger a download in the browser
const downloadFile = (filename: string, content: string, mimeType: string) => {
	const blob = new Blob([content], { type: mimeType });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
};

export class KolamExporter {
	/**
	 * Exports the kolam pattern as an SVG string.
	 */
	static async exportAsSVG(pattern: KolamPattern): Promise<string> {
		const { svg } = SVGGenerator.createSVG(pattern, {
			animationEnabled: false,
		});
		return svg;
	}

	/**
	 * Triggers a browser download of the kolam pattern as an SVG file.
	 */
	static async downloadSVG(pattern: KolamPattern): Promise<void> {
		const svgContent = await this.exportAsSVG(pattern);
		downloadFile(`${pattern.name}.svg`, svgContent, 'image/svg+xml');
	}

	/**
	 * Triggers a browser download of the kolam pattern as a PNG file.
	 * This function requires an HTML element containing the rendered SVG.
	 */
	static async downloadPNG(kolamElement: HTMLElement, fileName: string): Promise<void> {
		const svgElement = kolamElement.querySelector('svg');
		if (!svgElement) {
			throw new Error('SVG element not found for PNG export.');
		}

		const svgData = new XMLSerializer().serializeToString(svgElement);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Canvas context could not be created.');
		}

		const img = new Image();
		const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf--8' });
		const url = URL.createObjectURL(svgBlob);

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			URL.revokeObjectURL(url);
			const pngUrl = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = `${fileName}.png`;
			link.href = pngUrl;
			link.click();
		};

		img.src = url;
	}

    /**
	 * Triggers a browser download of an animated GIF.
	 * Note: This is a placeholder for a complex feature.
	 * In a real implementation, this would require a library like GIF.js or a server-side process.
	 */
	static async downloadAnimatedGIF(
		kolamElement: HTMLElement,
		pattern: KolamPattern,
		fileName: string,
		options: { frameCount: number; delay: number; format: 'gif' }
	): Promise<void> {
		// This is a complex feature that requires a dedicated library or server-side rendering.
		// The following is a conceptual placeholder.
		alert('Animated GIF export is not implemented yet.');
		console.warn('Animated GIF export functionality requires a specialized library (e.g., GIF.js) and is not implemented.');
	}
}