import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
  error(message: string, data: any, title?: string) {
    toastr.error(message, title);
    console.error(`Error: ${message}`, data);
  }

  info(message: string, data: any, title: string) {
    toastr.info(message, title);
    console.log(`Info: ${message}`, data);
  }

  success(message: string, data: any, title: string) {
    toastr.success(message, title);
    console.log(`Success: ${message}`, data);
  }

  warning(message: string, data: any, title: string) {
    toastr.warning(message, title);
    console.warn(`Warning: ${message}`, data);
  }
}
