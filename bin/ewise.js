#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Commands
import registerLogin from '../commands/login.js';
import registerSignup from '../commands/signup.js';
import registerLogout from '../commands/logout.js';
import registerSpend from '../commands/spend.js';
import registerStats from '../commands/stats.js';
import registerBudget from '../commands/budget.js';
import registerHistory from '../commands/history.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const program = new Command();

program
    .name('ewise')
    .description('Expenswise CLI client')
    .version(packageJson.version);

// Register commands
registerLogin(program);
registerSignup(program);
registerLogout(program);
registerSpend(program);
registerStats(program);
registerBudget(program);
registerHistory(program);

program.parse(process.argv);

// Output help by default if no arguments provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
