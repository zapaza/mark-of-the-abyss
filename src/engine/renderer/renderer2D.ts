import { Camera2D } from '@/engine/renderer/camera2D.ts';

/**
 * Основной класс рендеринга, отвечающий за отрисовку 2D на Canvas.
 */
export class Renderer2D {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public readonly camera: Camera2D;

  /**
     * @param width - Внутренняя ширина холста в пикселях
     * @param height - Внутренняя высота холста в пикселях
     */
  public constructor(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Не удалось получить 2D-контекст canvas');
    }

    this.canvas = canvas;
    this.ctx = ctx;
    this.camera = new Camera2D();

    this.ctx.imageSmoothingEnabled = false;
  }

  /**
     * Очищает холст заданным цветом.
     * @param color - Цвет заливки (по умолчанию темно-серый)
     */
  public clear(color = '#111111'): void {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  /**
     * Начинает режим отрисовки с учетом трансформации камеры.
     * Все объекты, нарисованные после этого метода и до endCamera(), будут смещены на позицию камеры.
     */
  public beginCamera(): void {
    this.ctx.save();
    this.ctx.translate(-Math.floor(this.camera.x), -Math.floor(this.camera.y));
  }

  /**
     * Завершает режим отрисовки с камерой и восстанавливает состояние контекста.
     */
  public endCamera(): void {
    this.ctx.restore();
  }

  /**
     * Рисует закрашенный прямоугольник.
     */
  public drawRect(x: number, y: number, width: number, height: number, color = '#ffffff'): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(width), Math.floor(height));
  }


  /**
     * Рисует текст на холсте.
     */
  public drawText(
    text: string,
    x: number,
    y: number,
    color = '#ffffff',
    font = '16px monospace',
  ): void {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, Math.floor(x), Math.floor(y));
  }

  /**
     * Рисует изображение или часть другого холста.
     */
  public drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    width?: number,
    height?: number,
  ): void {
    if (width !== undefined && height !== undefined) {
      this.ctx.drawImage(image, Math.floor(x), Math.floor(y), width, height);
      return;
    }

    this.ctx.drawImage(image, Math.floor(x), Math.floor(y));
  }

  /**
     * Изменяет визуальный размер (CSS) холста, чтобы он соответствовал размерам родительского элемента.
     * При этом внутреннее разрешение холста (width/height) остается прежним.
     */
  public resizeDisplay(parent: HTMLElement): void {
    const rect = parent.getBoundingClientRect();
    this.canvas.style.width = `${Math.floor(rect.width)}px`;
    this.canvas.style.height = `${Math.floor(rect.height)}px`;
  }
}