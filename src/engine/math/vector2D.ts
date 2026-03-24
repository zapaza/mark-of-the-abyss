/**
 * 2D векторный класс для математических операций.
 */

export class Vector2 {
  public x: number;
  public y: number;

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }


  /**
     * Устанавливает значения координат x и y.
     * @param x - Координата X
     * @param y - Координата Y
     */
  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
     * Копирует значения из другого вектора.
     * @param other - Вектор для копирования
     */
  public copy(other: Vector2): this {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  /**
     * Создает новый экземпляр вектора с теми же координатами.
     */
  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
     * Складывает текущий вектор с другим вектором.
     * @param other - Вектор для сложения
     */
  public add(other: Vector2): this {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  /**
     * Вычитает другой вектор из текущего.
     * @param other - Вычитаемый вектор
     */
  public subtract(other: Vector2): this {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  /**
     * Умножает координаты вектора на число (скаляр).
     * @param value - Множитель
     */
  public scale(value: number): this {
    this.x *= value;
    this.y *= value;
    return this;
  }

  /**
     * Возвращает новый вектор с нулевыми координатами (0, 0).
     */
  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }
}