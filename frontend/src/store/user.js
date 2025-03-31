import { create } from "zustand";

export const useUserStore = create((set) => ({
	values: [],
    history: [],
    user: null,

    setUserData: (userData, bills) => {
        set({ 
            user: userData,
            values: bills 
        });
        console.log("User data and bills updated in Zustand:", { userData, bills });
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
    },

    clearStore: () => {
        set({ values: [], history: [], user: null });
    }
}))