const domain = 'http://35.225.243.133';
$(document).ready(function() {
    var card_product = document.getElementsByClassName('card');

    for (var i = 0; i < card_product.length; i++) {
        card_product[i].addEventListener('click', function() {
            var parentElement = this.closest('.card');
            var card_image = parentElement.getElementsByClassName('card-img-top')[0];
            var image_src = card_image.getAttribute('src');
            var card_name = parentElement.getElementsByClassName("card-title")[0].innerHTML;

            var card_lb = parentElement.getElementsByClassName('cartcenter')[0].innerHTML;

            // var card_price = parentElement.getElementsByClassName('price')[0].innerHTML;
            var card_price = parentElement.querySelector('.price').innerHTML;

            document.querySelector('.popproducts').style.display = "block";


            document.getElementById('inpop-product').innerHTML += `<img src="${image_src}" class"pop-image">`
            document.querySelector('#name-input').value = card_name;
            document.querySelector('#unit-input').value = card_lb;
            document.querySelector('#price-input').value = card_price;



        })
    }
    document.querySelector('.uploadimg').addEventListener('click', function() {
        document.querySelector('.hideupload').click()
    })
    document.querySelector('#create-product').addEventListener('submit', function(event) {
        event.preventDefault();
        let form_data = $('#create-product').serializeArray();
        $.ajax({
            url: `${domain}/api/products/`,
            data: form_data,
            headers: {
                'Autorization': `Token ${localStorage.getItem('token')}`
            },
            method: 'POST',
            success: function(response) {

                alert('mehsul yaradildi');

            },
            error: function(error_response) {
                alert('ERROR')
                console.log(error_response);
                let error_messages = error_response.responseJSON;
                if (error_messages.hasOwnProperty('non_field_errors')) {
                    document.querySelector('#non_field_errors')
                }
                for (let message_name in error_messages) {

                    let input = document.querySelector(`#register-form [name="${message_name}"`);
                    let small_tag = input.parentElement.querySelector('small');
                    small_tag.innerText = error_messages[message_name];
                }
            }

        })


        $.ajax({
            url: `${domain}/api/own-products/`,
            headers: {
                'Autorization': `Token ${localStorage.getItem('token')}`
            },
            method: 'GET',
            success: function(response) {
                console.log(response);

                for (let product of response) {
                    $('.forsale').append(`
                                    <div class=" col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                        <div class="card h-100">
                                            <img src="${product.main_image}" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h3 class="card-title">${product.title}</h3>
                                                <span class="cartcenter">${product.unit}</span>
                                                <p class="card-text">${product.description} <br> Category: ${product.category.title} Owner: ${product.owner.username}</p>
                                                <div class="cartdown">
                                                    <span class="price">${product.price}</span>

                                                </div>

                                            </div>
                                        </div>
                                    </div> `

                    )

                }
            },
            error: function(error_response) {
                alert('ERROR')
            },
        })


    })
})