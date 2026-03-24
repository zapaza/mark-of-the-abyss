/**
 * Класс 2D камеры для управления обзором в пространстве.
 */
export class Camera2D {
  public x = 0;
  public y = 0;

  /**
     * Устанавливает новую позицию камеры.
     * @param x - Новая координата X
     * @param y - Новая координата Y
     */
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}