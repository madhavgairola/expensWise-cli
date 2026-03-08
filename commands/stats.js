import chalk from 'chalk';
import api from '../services/api.js';

export default function registerStats(program) {
    program
        .command('stats')
        .description('View expense statistics')
        .action(async () => {
            try {
                console.log(chalk.blue('Fetching dashboard statistics...'));
                const response = await api.get('/dashboard');
                const data = response.data;

                console.log(chalk.bold.green('\n--- Dashboard Analytics ---'));

                if (data.totalExpenses !== undefined) {
                    console.log(chalk.white(`Total Expenses: $${data.totalExpenses.toFixed(2)}`));
                }
                if (data.totalIncome !== undefined) {
                    console.log(chalk.white(`Total Income: $${data.totalIncome.toFixed(2)}`));
                }
                if (data.balance !== undefined) {
                    const color = data.balance >= 0 ? chalk.green : chalk.red;
                    console.log(color(`Balance: $${data.balance.toFixed(2)}`));
                }

                if (data.expensesByCategory && data.expensesByCategory.length > 0) {
                    console.log(chalk.bold.yellow('\nExpenses By Category:'));
                    data.expensesByCategory.forEach(cat => {
                        console.log(chalk.white(`- ${cat.category}: $${cat.amount?.toFixed(2) || cat.total?.toFixed(2)}`));
                    });
                }
                console.log('');
            } catch (error) {
                console.error(chalk.red('Failed to fetch stats:'), error.response?.data?.message || error.response?.data?.error || error.message);
            }
        });
}
