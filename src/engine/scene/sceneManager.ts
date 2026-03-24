import type { Scene } from '@/engine/scene/scene.ts';
import type { Renderer2D } from '@/engine/renderer/renderer2D.ts';

/**
 * Менеджер сцен, отвечающий за переключение и управление жизненным циклом текущей сцены.
 */
export class SceneManager {
  /** Текущая активная сцена */
  private currentScene: Scene | null = null;

  /**
     * Меняет текущую сцену на новую. 
     * Вызывает exit() у старой сцены и enter() у новой.
     * @param scene - Экземпляр новой сцены
     */
  public changeScene(scene: Scene): void {
    if (this.currentScene) {
      this.currentScene.exit();
    }

    this.currentScene = scene;
    this.currentScene.enter();
  }

  /**
     * Обновляет логику текущей сцены.
     * @param dt - Дельта времени
     */
  public update(dt: number): void {
    this.currentScene?.update(dt);
  }

  /**
     * Отрисовывает текущую сцену.
     * @param renderer - Экземпляр рендерера
     * @param alpha - Коэффициент интерполяции
     */
  public render(renderer: Renderer2D, alpha: number): void {
    this.currentScene?.render(renderer, alpha);
  }

  /**
     * Возвращает текущую активную сцену.
     */
  public getCurrentScene(): Scene | null {
    return this.currentScene;
  }
}