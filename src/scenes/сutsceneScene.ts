import { Scene } from '@/engine/scene/scene.ts';
import { InputAction } from '@/engine/input/inputActions.ts';
import { LevelScene } from '@/scenes/levelScene.ts';
import type { Renderer2D } from '@/engine/renderer/renderer2D.ts';

/**
 * Сцена кат-сцены. 
 * Используется для отображения диалогов и сюжетных событий.
 */
export class CutsceneScene extends Scene {
  /**
     * Обновляет логику кат-сцены. 
     * При нажатии клавиши взаимодействия переходит обратно на уровень.
     */
  public update(): void {
    if (this.game.input.isPressed(InputAction.Interact)) {
      this.game.scenes.changeScene(new LevelScene(this.game));
    }
  }

  /**
     * Отрисовывает текст и инструкции кат-сцены.
     * @param renderer - Экземпляр рендерера
     */
  public render(renderer: Renderer2D): void {
    renderer.drawText('CutsceneScene', 20, 30);
    renderer.drawText('Here will be dialogues and story events', 20, 60);
    renderer.drawText('Press E to return', 20, 90);
  }
}