import utils from 'packs/utils';

utils.whenPageReady(() => {
  // Display flash messages using toastr
  $('#flash-messages').hide();
  $('#flash-messages .message').each((index, element) => {
    element = $(element);
    toastr[element.hasClass('alert') ? 'error' : 'success'](element.html());
  });
});
