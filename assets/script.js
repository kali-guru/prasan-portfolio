'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@prashantgrg.com.np');
      copyButton.textContent = 'Copied!';
      copyStatus.textContent = 'Email address copied to clipboard.';
      window.setTimeout(() => { copyButton.textContent = 'Copy email'; }, 2500);
    } catch {
      copyStatus.textContent = 'Could not copy. Select the email address to copy it, or click it to send an email.';
      copyButton.textContent = 'Select email to copy';
    }
  });
}
