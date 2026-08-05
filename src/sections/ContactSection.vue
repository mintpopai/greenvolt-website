<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import { useReveal } from '@/composables/useReveal'
import { CONTACT, ENQUIRY_TOPICS, LEGAL_PAGE_PATH } from '@/data/site'

/**
 * 联系表单：目前只做前端校验与提交反馈。
 * 接后端时把 submitEnquiry 换成真实请求即可，其余逻辑不用动。
 */

const root = ref<HTMLElement | null>(null)
useReveal(() => root.value)

interface EnquiryForm {
  company: string
  name: string
  role: string
  email: string
  phone: string
  topic: string
  message: string
  consent: boolean
}

const form = reactive<EnquiryForm>({
  company: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
  consent: false,
})

const errors = reactive<Record<string, string>>({})
const status = ref<'IDLE' | 'SENDING' | 'SENT'>('IDLE')
/** 是否已经提交过一次：之前不打扰用户，之后随输入实时复验，改对了提示立刻消失 */
const submitted = ref(false)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  for (const key of Object.keys(errors)) delete errors[key]

  if (!form.company.trim()) errors.company = 'Company name is required'
  if (!form.name.trim()) errors.name = 'Your name is required'
  if (!form.email.trim()) errors.email = 'Work email is required'
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'That does not look like an email'
  if (!form.topic) errors.topic = 'Pick what you need help with'
  if (!form.consent) errors.consent = 'Please accept the Legal & Privacy notice to continue'

  return Object.keys(errors).length === 0
}

watch(form, () => {
  if (submitted.value) validate()
})

/** 提交出口：后端就绪后在这里发请求 */
async function submitEnquiry(payload: EnquiryForm): Promise<void> {
  // eslint-disable-next-line no-console -- 占位实现：先把内容留在控制台，接口就绪后替换
  console.info('[greenvolt] enquiry submitted', payload)
  await new Promise((resolve) => setTimeout(resolve, 600))
}

async function onSubmit() {
  if (status.value === 'SENDING') return
  submitted.value = true
  if (!validate()) return

  status.value = 'SENDING'
  await submitEnquiry({ ...form })
  status.value = 'SENT'
}
</script>

<template>
  <section id="contact" ref="root" class="contact">
    <div class="gv-shell contact__inner">
      <div class="contact__intro">
        <p class="gv-eyebrow gv-reveal">Contact</p>
        <h2 class="contact__title gv-reveal" style="--reveal-delay: 80ms">
          Tell us the market.<br />
          <span class="gv-grad-text">We will tell you the plan.</span>
        </h2>
        <p class="contact__lead gv-reveal" style="--reveal-delay: 160ms">
          Send us where you want to sell and what you have tried. You will get a specific read on
          channel mix, creative approach and realistic first-quarter economics — not a deck.
        </p>

        <dl class="contact__facts gv-reveal" style="--reveal-delay: 220ms">
          <div>
            <dt>Contact</dt>
            <dd><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></dd>
          </div>
        </dl>
      </div>

      <div class="card gv-reveal" style="--reveal-delay: 120ms">
        <form v-if="status !== 'SENT'" class="form" novalidate @submit.prevent="onSubmit">
          <div class="field field--wide">
            <label for="company">Company name</label>
            <input id="company" v-model="form.company" type="text" autocomplete="organization" />
            <p v-if="errors.company" class="field__error">{{ errors.company }}</p>
          </div>

          <div class="field">
            <label for="name">Your name</label>
            <input id="name" v-model="form.name" type="text" autocomplete="name" />
            <p v-if="errors.name" class="field__error">{{ errors.name }}</p>
          </div>

          <div class="field">
            <label for="role">Role</label>
            <input id="role" v-model="form.role" type="text" autocomplete="organization-title" />
          </div>

          <div class="field">
            <label for="email">Work email</label>
            <input id="email" v-model="form.email" type="email" autocomplete="email" />
            <p v-if="errors.email" class="field__error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="phone">Phone</label>
            <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" />
          </div>

          <div class="field field--wide">
            <label for="topic">How can we support your expansion?</label>
            <select id="topic" v-model="form.topic">
              <option value="" disabled>Select an option</option>
              <option v-for="topic in ENQUIRY_TOPICS" :key="topic" :value="topic">{{ topic }}</option>
            </select>
            <p v-if="errors.topic" class="field__error">{{ errors.topic }}</p>
          </div>

          <div class="field field--wide">
            <label for="message">Anything else we should know?</label>
            <textarea id="message" v-model="form.message" rows="3" />
          </div>

          <label class="consent field--wide">
            <input v-model="form.consent" type="checkbox" />
            <span>
              I have read and agree to the GreenVolt
              <!-- 链接在 label 内：不 stop 的话点链接会连带勾上复选框 -->
              <a
                class="consent__link"
                :href="LEGAL_PAGE_PATH"
                target="_blank"
                rel="noopener"
                @click.stop
              >Legal &amp; Privacy notice</a>.
            </span>
          </label>
          <p v-if="errors.consent" class="field__error field--wide">{{ errors.consent }}</p>

          <button class="submit field--wide" type="submit" :disabled="status === 'SENDING'">
            {{ status === 'SENDING' ? 'Sending…' : 'Submit enquiry' }}
          </button>
        </form>

        <div v-else class="done" role="status">
          <span class="done__mark" aria-hidden="true">✓</span>
          <h3>Thanks — we have it.</h3>
          <p>
            A strategist will come back to you within one business day at
            <strong>{{ form.email }}</strong
            >.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding-block: var(--gv-section-y);
  background:
    radial-gradient(70% 60% at 85% 20%, rgb(0 224 138 / 14%), transparent 62%),
    radial-gradient(80% 70% at 10% 90%, rgb(45 212 191 / 10%), transparent 60%),
    var(--gv-ink);
  border-top: 1px solid var(--gv-border);
}

.contact__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.contact__title {
  margin-top: 1.5rem;
  font-size: var(--gv-size-h2);
}

.contact__lead {
  max-width: 46ch;
  margin-top: 1.5rem;
  color: var(--gv-text-soft);
}

.contact__facts {
  display: grid;
  gap: 1.5rem;
  margin: 3rem 0 0;
  padding-top: 2rem;
  border-top: 1px solid var(--gv-border);
}

.contact__facts dt {
  font-size: var(--gv-size-micro);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gv-text-faint);
}

.contact__facts dd {
  margin: 0.5rem 0 0;
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
}

.contact__facts a:hover {
  color: var(--gv-volt);
}

/* —— 表单卡 —— */

.card {
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-lg);
  background: linear-gradient(165deg, var(--gv-glass-strong), rgb(232 255 246 / 2%));
  backdrop-filter: blur(20px);
}

.form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field--wide {
  grid-column: 1 / -1;
}

.field label {
  font-size: var(--gv-size-micro);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gv-text-mute);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--gv-border);
  border-radius: var(--gv-radius-sm);
  background: rgb(5 13 11 / 45%);
  font-size: var(--gv-size-small);
  transition: border-color var(--gv-dur-fast) var(--gv-ease);
}

.field textarea {
  resize: vertical;
  min-height: 84px;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--gv-border-lit);
}

.field select option {
  background: var(--gv-ink);
}

.field__error {
  font-size: var(--gv-size-micro);
  color: #ff9f8a;
}

.consent {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: var(--gv-size-small);
  color: var(--gv-text-soft);
  cursor: pointer;
}

.consent__link {
  color: var(--gv-volt);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.consent input {
  margin-top: 0.3rem;
  width: 16px;
  height: 16px;
  flex: none;
  accent-color: var(--gv-volt);
}

.submit {
  margin-top: 0.25rem;
  padding: 0.95rem 1.5rem;
  border-radius: var(--gv-radius-pill);
  background: var(--gv-grad-volt);
  color: var(--gv-ink-deep);
  font-weight: 600;
  transition:
    transform var(--gv-dur-fast) var(--gv-ease),
    box-shadow var(--gv-dur-fast) var(--gv-ease),
    opacity var(--gv-dur-fast) var(--gv-ease);
}

.submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 32px rgb(0 224 138 / 30%);
}

.submit:disabled {
  opacity: 0.6;
  cursor: progress;
}

/* —— 提交成功 —— */

.done {
  display: grid;
  justify-items: start;
  gap: 0.75rem;
  padding-block: 2rem;
}

.done__mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--gv-grad-volt);
  color: var(--gv-ink-deep);
  font-weight: 700;
}

.done h3 {
  font-size: var(--gv-size-h3);
}

.done p {
  color: var(--gv-text-soft);
  font-size: var(--gv-size-small);
}

@media (max-width: 979.98px) {
  .contact__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 559.98px) {
  .form {
    grid-template-columns: 1fr;
  }
}
</style>
