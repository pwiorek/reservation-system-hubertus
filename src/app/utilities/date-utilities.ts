interface Date {
  toLocalISOString: () => string;
}

Date.prototype.toLocalISOString = function(): string {
  const date = new Date(this.valueOf());
  const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  return isoDateTime.split('.')[0];
};
