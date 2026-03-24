import './style.css';
import { Game } from '@/engine/core/game.ts';
import { BootScene } from '@/scenes/bootScene.ts';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Контейнер #app не найден');
}

const game = new Game(app);
game.scenes.changeScene(new BootScene(game));
game.start();