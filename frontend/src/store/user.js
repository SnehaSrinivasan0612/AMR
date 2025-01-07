import { create } from "zustand";
export const useUserStore = create((set) => ({
	values: [],
    setSpreadsheetData: (data) => {
        set({ values: data }); // Set 'values' to the entire spreadsheet data
        console.log("Spreadsheet data updated in Zustand: ", data);
    },
    
    getSpreadsheetData: () => {
        return get().values; // Return the current 'values' state
    }
}))