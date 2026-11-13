// Keep native form submission and existing phone-click tracking intact.
document.querySelectorAll('.landing-form').forEach(form => {
  const photo = form.querySelector('[name="attachment"]');
  const error = form.querySelector('.form-error');
  function validatePhoto() {
    const file = photo.files[0];
    let message = '';
    if (file && file.size > 10 * 1024 * 1024) message = 'Please choose a photo smaller than 10 MB.';
    if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) message = 'Please choose a JPG, PNG or WebP photo.';
    photo.setCustomValidity(message);
    error.textContent = message;
    return !message;
  }
  photo.addEventListener('change', validatePhoto);
  form.addEventListener('submit', event => {
    if (!validatePhoto()) { event.preventDefault(); photo.reportValidity(); }
    // No conversion is fired on a submit click: delivery is not yet confirmed.
  });
});
