// import { useUserStore } from '../store/user.js';

const getMonthlyData = (values) => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Aggregate the amounts for each month
    return values.reduce((acc, row) => {
        const datePart = row.date.split(" ")[0]; // Extract the date part (before the time)
        const [day, month] = datePart.split("/"); // Split date to get the month
        const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
        const label = monthLabels[monthIndex]; // Get month label

        const amount = parseFloat(row.amount); // Parse amount as a number

        // Find or create the month object in the accumulator
        const monthEntry = acc.find(item => item.label === label);
        if (monthEntry) {
            monthEntry.amount += isNaN(amount) ? 0 : amount; // Accumulate amount
        } else {
            acc.push({ label, amount: isNaN(amount) ? 0 : amount }); // Add new entry for the month
        }
        return acc;
    }, []);
};

export default getMonthlyData;
