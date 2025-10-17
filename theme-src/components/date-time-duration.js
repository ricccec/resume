import { html } from '@rbardini/html'
import DateTime from './date-time.js'
import Duration from './duration.js'

/**
 * @param {string} startDate
 * @param {string} [endDate]
 * @returns {string}
 */
export default function DateTimeDuration(startDate, endDate) {
  if (endDate === startDate) return DateTime(endDate)
  return html`${DateTime(startDate)} &nbsp;—&nbsp;  ${endDate ? DateTime(endDate) : 'Present'}`
}
