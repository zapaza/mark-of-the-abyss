import { Scene } from '@/engine/scene/scene.ts';
import { InputAction } from '@/engine/input/inputActions.ts';
import { CutsceneScene } from '@/scenes/сutsceneScene.ts';
import type { Renderer2D } from '@/engine/renderer/renderer2D.ts';

/**
 * Сцена игрового уровня. 
 * Отвечает за логику игрока, перемещение и взаимодействие с игровым миром.
 */
export class LevelScene extends Scene {
  private playerX = 80;
  private playerY = 100;
  private readonly playerWidth = 16;
  private readonly playerHeight = 24;
  private readonly moveSpeed = 100;

  /**
     * Обновляет логику уровня: движение игрока и переходы по сценам.
     * @param dt - Дельта времени
     */
  public update(dt: number): void {
    if (this.game.input.isDown(InputAction.MoveLeft)) {
      this.playerX -= this.moveSpeed * dt;
    }

    if (this.game.input.isDown(InputAction.MoveRight)) {
      this.playerX += this.moveSpeed * dt;
    }

    if (this.game.input.isPressed(InputAction.Interact)) {
      this.game.scenes.changeScene(new CutsceneScene(this.game));
    }

    // Ограничение движения игрока пределами экрана
    this.playerX = Math.max(0, Math.min(this.playerX, 600 - this.playerWidth));

    // Сброс камеры
    this.game.renderer.camera.setPosition(0, 0);
  }

  /**
     * Отрисовывает игрока и элементы уровня.
     * @param renderer - Экземпляр рендерера
     */
  public render(renderer: Renderer2D): void {
    renderer.beginCamera();

    // Отрисовка пола
    renderer.drawRect(0, 140, 640, 40, '#2b2b2b');
    // Отрисовка игрока
    renderer.drawRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight, '#ffcc00');

    renderer.endCamera();

    // Отрисовка UI текста
    renderer.drawText('LevelScene', 10, 20);
    renderer.drawText('Move: A / D or arrows', 10, 42);
    renderer.drawText('Interact: E', 10, 64);
  }
}