import chalk from 'chalk';
import api from '../services/api.js';

export default function registerHistory(program) {
    program
        .command('history')
        .description('View recent transaction history')
        .action(async () => {
            try {
                console.log(chalk.blue('Fetching recent history...'));
                const response = await api.get('/history');
                const history = response.data;

                console.log(chalk.bold.green('\n--- Recent History ---'));

                let combinedEvents = [];
                if (Array.isArray(history.transactions)) {
                    combinedEvents = history.transactions;
                } else if (history.expenses || history.incomes) {
                    const expenses = history.expenses || [];
                    const incomes = history.incomes || [];
                    expenses.forEach(e => e.type = 'Expense');
                    incomes.forEach(i => i.type = 'Income');
                    combinedEvents = [...expenses, ...incomes].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
                } else if (Array.isArray(history)) {
                    combinedEvents = history;
                }

                if (combinedEvents.length > 0) {
                    combinedEvents.slice(0, 15).forEach(t => {
                        const date = new Date(t.date || t.createdAt).toLocaleDateString();
                        const desc = t.description ? ` (${t.description})` : '';
                        const typeLabel = t.type ? `[${t.type}] ` : '';
                        const color = typeLabel.includes('Income') ? chalk.green : chalk.yellow;
                        console.log(color(`[${date}] ${typeLabel}${t.category || t.source || 'General'}: $${t.amount}${desc}`));
                    });
                } else {
                    console.log(chalk.yellow('No history found.'));
                }
                console.log('');
            } catch (error) {
                console.error(chalk.red('Failed to fetch history:'), error.response?.data?.message || error.response?.data?.error || error.message);
            }
        });
}
