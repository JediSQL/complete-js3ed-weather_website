const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Searching for your weather...';
    messageTwo.textContent = '';
    const location = encodeURIComponent(search.value);
    fetch(`/weather?address=${location}`)
    .then((response) => {
        response.json()
        .then((data) => {
            if (data.error)
                return messageOne.textContent = data.error;
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
});
