// import { useUserStore } from '../store/user.js';

const getMonthlyData = (values) => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Aggregate the amounts for each month
    return values.reduce((acc, row) => {
        let date;
        try {
            // Try parsing as Date object first
            date = new Date(row.date);
            if (isNaN(date.getTime())) {
                // If that fails, try DD/MM format
                const [day, month] = row.date.split("/");
                date = new Date(2024, parseInt(month, 10) - 1, parseInt(day, 10));
            }
        } catch (error) {
            console.error('Error parsing date:', row.date, error);
            return acc;
        }

        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const label = `${monthLabels[monthIndex]} ${year}`; // Include year in label
        const amount = parseFloat(row.amount);

        // Find or create the month object in the accumulator
        const monthEntry = acc.find(item => item.label === label);
        if (monthEntry) {
            monthEntry.amount += isNaN(amount) ? 0 : amount;
        } else {
            acc.push({ label, amount: isNaN(amount) ? 0 : amount });
        }
        return acc;
    }, []);
};

export default getMonthlyData;
