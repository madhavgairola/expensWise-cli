import chalk from 'chalk';
import { clearToken, getToken } from '../utils/storage.js';

export default function registerLogout(program) {
    program
        .command('logout')
        .description('Log out of Expenswise')
        .action(() => {
            if (getToken()) {
                clearToken();
                console.log(chalk.green('Successfully logged out.'));
            } else {
                console.log(chalk.yellow('You are not currently logged in.'));
            }
        });
}
