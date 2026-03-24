import type { Renderer2D } from '@/engine/renderer/renderer2D.ts';
import type { Game } from '@/engine/core/game.ts';

/**
 * Абстрактный класс сцены.
 * Служит основой для создания различных игровых состояний и уровней.
 */
export abstract class Scene {

  /** Ссылка на основной экземпляр игры для доступа к глобальным сервисам */
  protected readonly game: Game;

  /**
     * @param game - Экземпляр игры
     */
  public constructor(game: Game) {
    this.game = game;
  }

  /**
     * Метод, вызываемый при входе в сцену (активации).
     */
  public enter(): void {}

  /**
     * Метод, вызываемый при выходе из сцены (деактивации).
     */
  public exit(): void {}

    /**
     * Обновление логики сцены.
     * @param dt - Дельта времени (время, прошедшее с прошлого кадра)
     */
    public abstract update(dt: number): void;

    /**
     * Отрисовка содержимого сцены.
     * @param renderer - Экземпляр рендерера
     * @param alpha - Коэффициент интерполяции для плавного рендеринга
     */
    public abstract render(renderer: Renderer2D, alpha: number): void;
}