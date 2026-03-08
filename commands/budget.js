import chalk from 'chalk';
import api from '../services/api.js';

export default function registerBudget(program) {
    const budgetCmd = program
        .command('budget')
        .description('Manage budgets');

    budgetCmd
        .command('set <category> <amount>')
        .description('Set a budget for a category')
        .action(async (category, amount) => {
            try {
                const message = `Set my budget for ${category} to $${amount}`;
                console.log(chalk.blue(`Setting budget: ${message}...`));

                const response = await api.post('/chat', {
                    message
                });

                console.log(chalk.green('Response from AI:'));
                console.log(chalk.white(response.data.message || 'Budget set successfully!'));
            } catch (error) {
                console.error(chalk.red('Failed to set budget:'), error.response?.data?.message || error.response?.data?.error || error.message);
            }
        });

    budgetCmd
        .command('view')
        .description('Request to view budgets')
        .action(async () => {
            try {
                const message = `What are my current budgets?`;
                console.log(chalk.blue('Asking AI for budgets...'));
                const response = await api.post('/chat', {
                    message
                });

                console.log(chalk.green('\n--- Budgets (via AI) ---'));
                console.log(chalk.white(response.data.message || JSON.stringify(response.data)));
                console.log('');
            } catch (error) {
                console.error(chalk.red('Failed to fetch budgets:'), error.response?.data?.message || error.response?.data?.error || error.message);
            }
        });
}
