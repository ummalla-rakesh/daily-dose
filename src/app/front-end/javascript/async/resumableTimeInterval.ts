/**
 * A class that allows creating an interval that can be started, paused, resumed, and stopped.
 * It tracks the elapsed time and ensures that the interval can be resumed from the correct point
 * after being paused.
 */

type TimerCallback = () => void;
export class ResumableInterval {
  private timer: NodeJS.Timeout | null = null;
  private startTime: number | null = null;
  private pauseTime: number | null = null;

  // Constructor to initialize the callback and intervalTime
  constructor(
    private callback: TimerCallback,
    private intervalTime: number
  ) {}

  // Start the interval
  start(): void {
    if (this.timer !== null) return; // If already running, do nothing
    this.startTime = Date.now(); // Record the start time
    this.timer = setInterval(this.callback, this.intervalTime); // Start the interval
  }

  // Pause the interval
  pause(): void {
    if (this.timer === null) return; // If not running, do nothing
    clearInterval(this.timer); // Stop the interval
    this.timer = null;
    this.pauseTime = Date.now(); // Record when the interval was paused
  }

  // Resume the interval
  resume(): void {
    if (this.timer !== null) return; // If already running, do nothing
    if (this.startTime === null || this.pauseTime === null) return; // No valid start or pause time

    // Calculate the elapsed time since the interval was started
    const elapsedDuration = this.pauseTime - this.startTime;

    // Find the remaining time before the next callback
    const remainingTime =
      this.intervalTime - (elapsedDuration % this.intervalTime);

    // Schedule the next callback after the remaining time
    setTimeout(() => {
      this.callback(); // Execute the callback after the remaining time

      // Restart the interval
      this.startTime = Date.now(); // Reset the start time
      this.timer = setInterval(this.callback, this.intervalTime);
    }, remainingTime);
  }

  // Stop the interval
  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.startTime = null;
    this.pauseTime = null; // Clear tracking
  }
}


