/**
 * Insterface of switch state
 * - ON : a resource is on
 * - OFF: a resource is off
 */

export interface SwitchState {
  /**
   * Only 2 possible values
   * - ON
   * - OFF
   */

  state: 'ON' | 'OFF';
}
