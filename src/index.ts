#!/usr/bin/env node
// ^ That "shebang" line makes it runnable as an executable if you chmod +x it.

import { Program } from './commands';
import { consoleError } from './utils';

try {
  new Program().run();
} catch (err) {
  consoleError((err as Error).message);
  process.exit(1);
}
