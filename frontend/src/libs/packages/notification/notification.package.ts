import { toast } from 'react-toastify';

import { type ValueOf } from '~/libs/types/types.js';

import { NotificationType } from '../notification/libs/enums/enums.js';

type NotificationOptions = {
  type: ValueOf<typeof NotificationType>;
};

class Notification {
  public error(message: string): void {
    this.show(message, {
      type: 'error',
    });
  }

  public info(message: string): void {
    this.show(message, {
      type: 'info',
    });
  }

  public success(message: string): void {
    this.show(message, {
      type: 'success',
    });
  }

  public warning(message: string): void {
    this.show(message, {
      type: 'warning',
    });
  }

  private show(message: string, parameters: NotificationOptions): void {
    toast(message, parameters);
  }
}

export { Notification };
