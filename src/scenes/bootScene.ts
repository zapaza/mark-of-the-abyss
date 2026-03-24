import { Scene } from '@/engine/scene/scene.ts';
import { LoadingScene } from '@/scenes/loadingScene.ts';
import type { Renderer2D } from '@/engine/renderer/renderer2D.ts';

/**
 * Начальная сцена загрузки
 * Служит для первичной инициализации и быстрого перехода к загрузочному экрану.
 */
export class BootScene extends Scene {
  /** Таймер для искусственной задержки или ожидания инициализации */
  private timer = 0;

  /**
     * Вызывается при входе в сцену. Сбрасывает таймер.
     */
  public override enter(): void {
    this.timer = 0;
  }

  /**
     * Обновляет логику сцены. Через небольшой промежуток времени переключает на LoadingScene.
     * @param dt - Дельта времени
     */
  public update(dt: number): void {
    this.timer += dt;

    if (this.timer >= 0.35) {
      this.game.scenes.changeScene(new LoadingScene(this.game));
    }
  }

  /**
     * Отрисовывает текст состояния загрузки.
     * @param renderer - Экземпляр рендерера
     */
  public render(renderer: Renderer2D): void {
    renderer.drawText('Booting...', 20, 30);
  }
}