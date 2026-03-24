import type { Renderer2D } from '@/engine/renderer/renderer2D.ts';
import { Scene } from '@/engine/scene/scene.ts';
import { LevelScene } from '@/scenes/levelScene.ts';

/**
 * Сцена загрузки ресурсов или ожидания.
 * Реализует переход к игровому уровню через заданный промежуток времени.
 */
export class LoadingScene extends Scene {
  /** Таймер для отслеживания времени загрузки */
  private timer = 0;

  /**
     * Вызывается при входе в сцену. Обнуляет таймер.
     */
  public override enter(): void {
    this.timer = 0;
  }

  /**
     * Обновляет состояние загрузки. После завершения таймера переключает на уровень.
     * @param dt - Дельта времени
     */
  public update(dt: number): void {
    this.timer += dt;

    if (this.timer >= 0.75) {
      this.game.scenes.changeScene(new LevelScene(this.game));
    }
  }

  /**
     * Отрисовывает текст "Loading...".
     * @param renderer - Экземпляр рендерера
     */
  public render(renderer: Renderer2D): void {
    renderer.drawText('Loading...', 20, 30);
  }
}