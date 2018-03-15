var baseUrl = window.location.protocol.indexOf('http') !== -1
  ? window.location.protocol + '//' + window.location.hostname
  : 'http://localhost'
$('#login-form').submit(function (event) {
  // Stop the default form submit flow
  event.preventDefault();

  var username = $('#username').val();
  var password = $('#password').val();
  var getAddressUrl =  baseUrl + '/bloc/v2.2/users/' + username;
  var errorWrapper = $('#error');
  errorWrapper.text('');
  $('.login-btn').prop('disabled', true);
  $('.login-btn').val('Processing...');

  $.get(getAddressUrl)
    .done(function (response) {
      if (!response[0]) {
        errorWrapper.text('Invalid credentials.');
        $('.login-btn').prop('disabled', false);
        $('.login-btn').val('Submit');
      } else {
        var validateUrl = baseUrl + '/bloc/v2.2/users/' + username + '/' + response[0] +
          '/send?resolve';
        var validateBody = {
          password: password,
          toAddress: response[0],
          value: 0
        };

        $.post({
            url: validateUrl,
            data: JSON.stringify(validateBody),
            contentType: 'application/json',
            dataType: 'json'
          })
          .done(function () {
            $('.login-btn').prop('disabled', false);
            $('.login-btn').val('Submit');
            $('#user-address').val(response[0]);
            $('#login-form').hide();
            $('#dapp-form').show();
            $('.back-icon').show();
          })
          .fail(function (error) {
            $('.login-btn').prop('disabled', false);
            $('.login-btn').val('Submit');
            if (error.responseJSON === "incorrect password")
              errorWrapper.text('Invalid credentials.');
            else
              errorWrapper.text('There was an error. Please try again after some time.');
          });
      }
    })
    .fail(function () {
      $('.login-btn').prop('disabled', false);
      $('.login-btn').val('Submit');
      errorWrapper.text('There was an error. Please try again after some time.');
    });
});

// Show/hide fields depending on the operation type
$('#submit-type').change(function () {
  $('#result-wrapper').text('');
  var submitType = $(this).val();
  switch (submitType) {
    case 'deploy':
      $('#contract-address, #set-value').hide().prop('required', false);
      break;
    case 'set':
      $('#contract-address, #set-value').show().prop('required', true);
      break;
    case 'get':
      $('#contract-address').show().prop('required', true);
      $('#set-value').hide().prop('required', false);
      break;
  }
});

// On form submit
$('#dapp-form').submit(function (event) {
  // Stop the default form submit flow
  event.preventDefault();

  var resultWrapper = $('#result-wrapper');

  $('.dapp-submit-btn').prop('disabled', true);
  $('.dapp-submit-btn').val('Processing...');
  resultWrapper.text('');

  // Get values from the form:
  var $form = $(this);
  var username = $('#username').val();
  var userAddress = $('#user-address').val();
  var password = $('#password').val();
  var submitType = $('#submit-type').val();

  //The urls to bloc API's upload-contract and call-contract-method endpoints
  var uploadContractUrl = baseUrl + '/bloc/v2.2/users/' + username + '/' + userAddress +
    '/contract?resolve';
  var callContractMethodUrl = baseUrl + '/bloc/v2.2/users/' + username + '/' + userAddress +
    '/contract/SimpleStorage/' + $('#contract-address').val() + '/call?resolve';

  switch (submitType) {

    case 'deploy':
      $.get('contracts/SimpleStorage.sol')
        .done(function (contractContent) {

          var uploadContractBody = {
            password: password,
            contract: 'SimpleStorage',
            src: contractContent
          };

          $.post({
              url: uploadContractUrl,
              data: JSON.stringify(uploadContractBody),
              contentType: 'application/json',
              dataType: 'json'
            })
            .done(function (response) {
              // Fill-in the contract-address field and show it
              $('#contract-address').val(response['txResult']['contractsCreated']).show();
              resultWrapper.text('Contract deployed successfully for the user');
              $('.dapp-submit-btn').prop('disabled', false);
              $('.dapp-submit-btn').val('Submit');
            })
            .fail(function (error) {
              resultWrapper.text('Error: Bloc API is not reachable');
              $('.dapp-submit-btn').prop('disabled', false);
              $('.dapp-submit-btn').val('Submit');
            })
        })
        .fail(function (error) {
          resultWrapper.text('Error: Contract file not found');
          $('.dapp-submit-btn').prop('disabled', false);
          $('.dapp-submit-btn').val('Submit');
        });
      break;

    case 'set':

      var value = $form.find('#set-value').val();

      var callSetBody = {
        "args": {
          x: value
        },
        "method": "set",
        "password": password
      };

      $.post({
          url: callContractMethodUrl,
          data: JSON.stringify(callSetBody),
          contentType: 'application/json',
          dataType: 'json'
        })
        .done(function (response) {
          resultWrapper.text('The value has been set. New Value: ' + value);
          $('.dapp-submit-btn').prop('disabled', false);
          $('.dapp-submit-btn').val('Submit');
        })
        .fail(function (error) {
          resultWrapper.text('Error: wrong user credentials provided or Bloc API is not reachable');
          $('.dapp-submit-btn').prop('disabled', false);
          $('.dapp-submit-btn').val('Submit');
        });
      break;

    case 'get':
      var callSetBody = {
        "args": {},
        "method": "get",
        "password": password
      };

      $.post({
          url: callContractMethodUrl,
          data: JSON.stringify(callSetBody),
          contentType: 'application/json',
          dataType: 'json'
        })
        .done(function (response) {
          resultWrapper.text('The value in storage is: ' + response.data.contents[0]);
          $('.dapp-submit-btn').prop('disabled', false);
          $('.dapp-submit-btn').val('Submit');
        })
        .fail(function (error) {
          resultWrapper.text('Error: wrong user credentials provided or Bloc API is not reachable');
          $('.dapp-submit-btn').prop('disabled', false);
          $('.dapp-submit-btn').val('Submit');
        });
      break;
  }
});

$('.back-icon').click(function () {
  $('#password').val('');
  $('#dapp-form').hide();
  $('.back-icon').hide();
  $('#login-form').show();
});