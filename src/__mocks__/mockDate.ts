export const fixedDate = new Date("2025-07-17T12:00:00Z");

export const mockDateNow = () => {
  jest.useFakeTimers().setSystemTime(fixedDate);
};
