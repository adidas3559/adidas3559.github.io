// this is a vanilla JS script to submit the form
// lots of ways to do this
// but i would recommend Vue :)


// grab your form
let form = document.getElementById('contact-form')

// if it exists, add the event listener
if (form) {

    form.addEventListener('submit', function (event) {

        event.preventDefault()

        let data = new FormData(form)
        let inputs = form.elements
        let fields = {}

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== "hidden" && inputs[i].name !== "") {
                fields[inputs[i].name] = inputs[i].value
            }
        }

        data.append('fields', JSON.stringify(fields))

        //https://myprimitive.cloud/api/forms/store
        axios.post('http://cms-api.test/api/forms/store', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    })
}