#!/usr/bin/env node
// ^ That "shebang" line makes it runnable as an executable if you chmod +x it.

import { Program } from './commands';

new Program().run();
