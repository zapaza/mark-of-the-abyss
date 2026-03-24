type UpdateCallback = (dt: number) => void;
type RenderCallback = (alpha: number) => void;

/**
 * Класс игрового цикла, обеспечивающий фиксированную частоту обновлений
 * и переменную частоту отрисовки с интерполяцией.
 */
export class GameLoop {
  private readonly fixedDeltaMs: number;
  private readonly maxFrameTimeMs: number;
  private readonly onUpdate: UpdateCallback;
  private readonly onRender: RenderCallback;

  private accumulator = 0;
  private lastTime = 0;
  private frameId = 0;
  private running = false;
  private paused = false;

  /**
     * @param onUpdate - Функция обновления логики
     * @param onRender - Функция отрисовки
     * @param fixedDeltaMs - Желаемый шаг времени для логики (по умолчанию 60 FPS)
     * @param maxFrameTimeMs - Максимальный порог времени кадра (защита от лагов)
     */
  public constructor(
    onUpdate: UpdateCallback,
    onRender: RenderCallback,
    fixedDeltaMs = 1000 / 60,
    maxFrameTimeMs = 100,
  ) {
    this.onUpdate = onUpdate;
    this.onRender = onRender;
    this.fixedDeltaMs = fixedDeltaMs;
    this.maxFrameTimeMs = maxFrameTimeMs;
  }

  /**
     * Запускает игровой цикл.
     */
  public start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  /**
     * Останавливает игровой цикл.
     */
  public stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  /**
     * Ставит цикл на паузу.
     */
  public pause(): void {
    this.paused = true;
  }

  /**
     * Возобновляет работу цикла после паузы.
     */
  public resume(): void {
    this.paused = false;
    this.lastTime = performance.now();
  }

  /**
     * Основной метод тика, вызываемый через requestAnimationFrame.
     * Реализует алгоритм "Fixed Update, Variable Render".
     */
  private tick = (currentTime: number): void => {
    if (!this.running) {
      return;
    }

    const rawDelta = currentTime - this.lastTime;
    this.lastTime = currentTime;

    const frameTime = Math.min(rawDelta, this.maxFrameTimeMs);

    if (!this.paused) {
      this.accumulator += frameTime;

      while (this.accumulator >= this.fixedDeltaMs) {
        this.onUpdate(this.fixedDeltaMs / 1000);
        this.accumulator -= this.fixedDeltaMs;
      }

      const alpha = this.accumulator / this.fixedDeltaMs;
      this.onRender(alpha);
    }

    this.frameId = requestAnimationFrame(this.tick);
  };
}