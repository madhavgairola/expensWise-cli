import chalk from 'chalk';
import api from '../services/api.js';

export default function registerSpend(program) {
    program
        .command('spend <amount> <category> [description]')
        .description('Record a new expense')
        .action(async (amount, category, description) => {
            try {
                const descText = description ? ` for ${description}` : '';
                const chatMessage = `I spent $${amount} on ${category}${descText}`;

                console.log(chalk.blue(`Recording expense: ${chatMessage}...`));

                const response = await api.post('/chat', {
                    message: chatMessage
                });

                console.log(chalk.green('Response from AI:'));
                console.log(chalk.white(response.data.message || 'Expense recorded successfully!'));
            } catch (error) {
                console.error(chalk.red('Failed to record expense:'), error.response?.data?.message || error.response?.data?.error || error.message);
            }
        });
}
