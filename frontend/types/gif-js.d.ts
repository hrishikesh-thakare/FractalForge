declare module 'gif.js' {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(
      element: HTMLCanvasElement | CanvasRenderingContext2D | HTMLImageElement,
      options?: object
    ): void;
    on(event: 'finished', cb: (blob: Blob) => void): void;
    render(): void;
  }

  export default GIF;
}
