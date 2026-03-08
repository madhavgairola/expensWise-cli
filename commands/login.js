import inquirer from 'inquirer';
import chalk from 'chalk';
import api from '../services/api.js';
import { saveToken } from '../utils/storage.js';

export default function registerLogin(program) {
    program
        .command('login')
        .description('Log into Expenswise')
        .action(async () => {
            try {
                const loginStrategy = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'type',
                        message: 'How would you like to log in?',
                        choices: [
                            { name: 'With Email and Password', value: 'credentials' },
                            { name: 'As a Guest', value: 'guest' }
                        ]
                    }
                ]);

                let email, password;

                if (loginStrategy.type === 'guest') {
                    console.log(chalk.blue('Logging in as Guest...'));
                    // You might need to adjust this depending on how your backend handles guest logins.
                    // For example, it might expect a POST to /auth/guest, or standard credentials for a guest user.
                    // We'll hit a hypothetical `/login/guest` endpoint or fallback format here:
                    const response = await api.post('/auth/guest-login');
                    return handleLoginSuccess(response);
                } else {
                    const answers = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'email',
                            message: 'Email:'
                        },
                        {
                            type: 'password',
                            name: 'password',
                            message: 'Password:',
                            mask: '*'
                        }
                    ]);

                    console.log(chalk.blue('Logging in...'));
                    const response = await api.post('/auth/login', {
                        email: answers.email,
                        password: answers.password
                    });

                    return handleLoginSuccess(response);
                }
            } catch (error) {
                console.error(chalk.red('Login failed:'), error.response?.data?.message || error.message);
            }
        });
}

function handleLoginSuccess(response) {
    const token = response.data.token || response.data.accessToken;
    if (token) {
        saveToken(token);
        console.log(chalk.green('Successfully logged in!'));
    } else {
        console.log(chalk.red('Login failed: No token received.'));
    }
}
