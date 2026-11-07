(() => {
  const button = document.querySelector('[data-copy-contact]');
  const status = document.querySelector('[data-copy-status]');
  if (!button || !status) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('support@creet.in');
      status.textContent = 'Email address copied. Paste it into your email app.';
    } catch {
      status.textContent = 'Copy support@creet.in from the address above.';
    }
  });
})();
