import { Renderer2D } from '@/engine/renderer/renderer2D.ts';
import { InputManager } from '@/engine/input/InputManager.ts';
import { SceneManager } from '@/engine/scene/sceneManager.ts';
import { EventBus } from '@/engine/events/eventBus.ts';
import { AssetManager } from '@/engine/assets/assetManager.ts';
import { GameLoop } from '@/engine/core/gameLoop.ts';

/**
 * Основной класс игры, объединяющий все подсистемы и управляющий игровым циклом.
 */
export class Game {
  public readonly renderer: Renderer2D;
  public readonly input: InputManager;
  public readonly scenes: SceneManager;
  public readonly events: EventBus;
  public readonly assets: AssetManager;

  private readonly loop: GameLoop;

  /**
     * Создает экземпляр игры и инициализирует основные системы.
     * @param parent - HTML-элемент, в который будет вставлен canvas
     */
  public constructor(parent: HTMLElement) {
    this.renderer = new Renderer2D(1920, 1080);
    this.input = new InputManager();
    this.scenes = new SceneManager();
    this.events = new EventBus();
    this.assets = new AssetManager();

    parent.appendChild(this.renderer.canvas);
    this.renderer.resizeDisplay(parent);

    window.addEventListener('resize', () => {
      this.renderer.resizeDisplay(parent);
    });

    this.loop = new GameLoop(
      (dt) => this.update(dt),
      (alpha) => this.render(alpha),
    );
  }

  /**
     * Запускает игровой цикл.
     */
  public start(): void {
    this.loop.start();
  }

  /**
     * Останавливает обновления и рендеринг.
     */
  public pause(): void {
    this.loop.pause();
  }

  /**
     * Возобновляет игру после паузы.
     */
  public resume(): void {
    this.loop.resume();
  }

  /**
     * Внутренний метод обновления логики всех систем.
     * @param dt - Дельта времени в секундах
     */
  private update(dt: number): void {
    this.scenes.update(dt);
    this.input.beginFrame();
  }

  /**
     * Внутренний метод отрисовки текущего кадра.
     * @param alpha - Коэффициент интерполяции для плавного движения
     */
  private render(alpha: number): void {
    this.renderer.clear('#111111');
    this.scenes.render(this.renderer, alpha);
  }
}