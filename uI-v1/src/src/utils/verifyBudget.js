export const verifySessionBudget = (budget) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-based
  const currentYear = now.getFullYear();
  if (budget) {
    const dateSplitted = budget.date.split('-');
    return currentMonth == dateSplitted[1] && currentYear == dateSplitted[0];
  }
  return false;
};
