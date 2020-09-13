export const idIsValid = (id: string): boolean => {
  if(typeof(id) !== "string" || id.length !== 24) {
    return false;
  }

  return true;
};