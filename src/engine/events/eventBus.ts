export type EventHandler<T = unknown> = (payload: T) => void;

/**
 * Шина событий для обмена сообщениями между компонентами системы.
 * Позволяет реализовывать слабосвязанную архитектуру.
 */
export class EventBus {
  /** Карта слушателей, где ключ — имя события, а значение — набор обработчиков */
  private readonly listeners = new Map<string, Set<EventHandler>>();


  /**
     * Подписывает обработчик на событие.
     * @param eventName - Имя события
     * @param handler - Функция-обработчик
     * @returns Функция для отписки
     */
  public subscribe<T = unknown>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

        this.listeners.get(eventName)!.add(handler as EventHandler);

        return () => {
          this.unsubscribe(eventName, handler);
        };
  }

  /**
     * Отписывает обработчик на событие.
     * @param eventName - Имя события
     * @param handler - Функция-обработчик
     * @returns Функция для отписки
     */
  public unsubscribe<T = unknown>(eventName: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(eventName);

    if (!handlers) {
      return;
    }

    handlers.delete(handler as EventHandler);

    if (handlers.size === 0) {
      this.listeners.delete(eventName);
    }
  }

  /**
     * Генерирует событие, вызывая все подписанные на него обработчики.
     * @param eventName - Имя события
     * @param payload - Данные, передаваемые в обработчик
     */
  public emit<T = unknown>(eventName: string, payload?: T): void {
    const handlers = this.listeners.get(eventName);

    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      handler(payload);
    }
  }

  /**
     * Полная очистка всех подписок.
     */
  public clear(): void {
    this.listeners.clear();
  }
}

/**
    * Отдельный экспорт, если нужен будет глобальная шина событий
    */
export const globalBus = new EventBus();