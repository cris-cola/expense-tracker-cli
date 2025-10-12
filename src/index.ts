#! /usr/bin/env node
// ^ That “shebang” line makes it runnable as an executable if you chmod +x it.

import buildCommands from './commands';
import { initStore } from './store';
import { consoleError } from './utils';

initStore();

class App {
  static start () {
    try {
      buildCommands().parse();
    } catch (err) {
      consoleError((err as Error).message);
      process.exit(1);
    }
  }
}

App.start();
