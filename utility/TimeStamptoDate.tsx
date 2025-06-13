const TimeStamptoDate = (timestamp: { seconds: number; nanoseconds: number }) => { 
    if (!timestamp || typeof timestamp !== 'object' || !timestamp.seconds) {
      return "Invalid date";
    }
    const date = new Date(timestamp.seconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options).replace(/ /, ', ');
}
export default TimeStamptoDate;