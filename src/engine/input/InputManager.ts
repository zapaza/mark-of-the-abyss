import { InputAction } from '@/engine/input/inputActions.ts';

type ActionMap = Record<InputAction, string[]>;


/**
 * Менеджер ввода, отвечающий за обработку клавиатурных событий
 * и сопоставление их с игровыми действиями.
 */
export class InputManager {
  private readonly pressedKeys = new Set<string>();
  private readonly justPressedKeys = new Set<string>();
  private readonly justReleasedKeys = new Set<string>();

  private readonly actionMap: ActionMap = {
    [InputAction.MoveLeft]: ['ArrowLeft', 'KeyA'],
    [InputAction.MoveRight]: ['ArrowRight', 'KeyD'],
    [InputAction.Jump]: ['Space', 'KeyW', 'ArrowUp'],
    [InputAction.Attack]: ['KeyJ'],
    [InputAction.Skill1]: ['KeyK'],
    [InputAction.Skill2]: ['KeyL'],
    [InputAction.DemonToggle]: ['KeyQ'],
    [InputAction.Interact]: ['KeyE'],
  };

  public constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
  }

  /**
     * Сбрасывает состояния "только что нажато/отпущено".
     * Должен вызываться в начале каждого игрового кадра.
     */
  public beginFrame(): void {
    this.justPressedKeys.clear();
    this.justReleasedKeys.clear();
  }

  /**
     * Проверяет, удерживается ли клавиша для указанного действия.
     * @param action - Игровое действие
     */
  public isDown(action: InputAction): boolean {
    return this.actionMap[action].some((key) => this.pressedKeys.has(key));
  }

  /**
     * Проверяет, было ли действие активировано именно в текущем кадре.
     * @param action - Игровое действие
     */
  public isPressed(action: InputAction): boolean {
    return this.actionMap[action].some((key) => this.justPressedKeys.has(key));
  }

  /**
     * Проверяет, было ли действие прекращено (клавиша отпущена) в текущем кадре.
     * @param action - Игровое действие
     */
  public isReleased(action: InputAction): boolean {
    return this.actionMap[action].some((key) => this.justReleasedKeys.has(key));
  }

  /**
     * Удаляет слушатели событий и очищает ресурсы.
     */
  public destroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.pressedKeys.has(event.code)) {
      this.justPressedKeys.add(event.code);
    }

    this.pressedKeys.add(event.code);
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
    this.justReleasedKeys.add(event.code);
  };

  private handleBlur = (): void => {
    this.pressedKeys.clear();
    this.justPressedKeys.clear();
    this.justReleasedKeys.clear();
  };
}