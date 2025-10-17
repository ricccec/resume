import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTime from './date-time.js'
import { formatURL } from './link.js'
// @ts-expect-error ellipsize types not properly exported
import ellipsize from 'ellipsize'

/**
 * @returns {string | false}
 */
export default function Gdpr() {
  return (
    html`
      <section id="gdpr" class="section-header">
        <hr>
        <div class="section-inner">
              <article class="section-item">
              <div class="section-content small-text">
                <i>Autorizzo il trattamento dei miei dati personali ai sensi dell'art. 13 Dlgs 196 del 30 giugno 2003 e dell'art. 13 GDPR (Regolamento UE 2016/679) ai fini della ricerca e selezione del personale.</i>
              </div>
              <div class="section-content small-text">
              ${DateTime(new Date().toISOString())}
              </div>
              </article>
        </div>
      </section>
    `
  )
}
