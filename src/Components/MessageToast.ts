import { Toast } from "phaser3-rex-plugins/templates/ui/ui-components";
import Game from "../Game/Game";

export class MessageToast extends Toast {
  constructor(scene: Phaser.Scene, config?: Toast.IConfig | undefined) {
    super(scene, config);
    scene.add.existing(this);
  }
  showMessage(message: string | ((toast: Toast) => void)): this {
    if (!Game.Core.isGameOver) {
      return super.showMessage(message);
    }
    return this;
  }
}
