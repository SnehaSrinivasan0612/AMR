import { create } from "zustand";
export const useUserStore = create((set) => ({
	values: [],
    history: [],
    setSpreadsheetData: (data) => {
        set({ values: data }); // Set 'values' to the entire spreadsheet data
        console.log("Spreadsheet data updated in Zustand: ", data);
    },

    payBill: (billno) => {
        set((state) => {
            const updatedValues = state.values.filter(bill => bill.billno !== billno); // Remove from unpaid list
            const paidBill = state.values.find(bill => bill.billno === billno); // Find the bill
            
            if (!paidBill) return state; // If not found, return unchanged state

            paidBill.status = "Paid"; // Update status

            return {
                values: updatedValues, // Remove from unpaid bills
                history: [...state.history, paidBill], // Move to history
            };
        });
    },
    
    getSpreadsheetData: () => {
        return get().values; // Return the current 'values' state
    }
}))