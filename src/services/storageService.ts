import { CaseItem } from '../types';
import { INITIAL_CASES } from './mockData';

const STORAGE_KEY = 'uniops_ai_cases_v1';

export const storageService = {
  loadCases(): CaseItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
        return INITIAL_CASES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading cases from localStorage', e);
      return INITIAL_CASES;
    }
  },

  saveCases(cases: CaseItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    } catch (e) {
      console.error('Error saving cases to localStorage', e);
    }
  },

  resetToDefault(): CaseItem[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
    return INITIAL_CASES;
  }
};
