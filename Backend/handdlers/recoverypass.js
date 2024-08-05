export  const randomNumber =  () => {
  return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
}

export const keys = {};
export const newKeys = {};
export const timeout = {};