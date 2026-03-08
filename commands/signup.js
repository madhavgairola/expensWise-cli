import inquirer from 'inquirer';
import chalk from 'chalk';
import api from '../services/api.js';
import { saveToken } from '../utils/storage.js';

export default function registerSignup(program) {
    program
        .command('signup')
        .description('Create a new Expenswise account')
        .action(async () => {
            try {
                const answers = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Full Name:'
                    },
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

                console.log(chalk.blue('Creating account...'));

                // Assumes backend signup endpoint is POST /signup or POST /auth/signup
                const response = await api.post('/auth/register', {
                    name: answers.name,
                    email: answers.email,
                    password: answers.password
                });

                // Some backends return the token immediately upon signup
                const token = response.data.token || response.data.accessToken;
                if (token) {
                    saveToken(token);
                    console.log(chalk.green('Account created and logged in successfully!'));
                } else {
                    console.log(chalk.green('Account created successfully! Please run `ewise login` to log in.'));
                }

            } catch (error) {
                console.error(chalk.red('Signup failed:'), error.response?.data?.message || error.message);
            }
        });
}
