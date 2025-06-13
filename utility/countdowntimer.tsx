// Renderer callback with condition
const renderer = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
    return <span>Hours: {hours} Minutes: {minutes} Seconds: {seconds}</span>;
};


                <td className="py-3 px-6 text-sm">   <Countdown
    date={Date.now() + 50000}
    renderer={renderer}
  /></td>