const domain = 'http://35.225.243.133';
$(document).ready(function() {

    let category_svg = ` <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18">
                        <g fill="currentColor">
                            <path data-name="Path 36"
                                d="M2.109 5.274H12.66a1.055 1.055 0 000-2.11h-.1a1.67 1.67 0 00-1.5-1.054 2.626 2.626 0 00-1.854-1.044 2.1 2.1 0 00-3.653 0 2.626 2.626 0 00-1.85 1.045h-.011a1.577 1.577 0 00-1.481 1.055h-.1a1.055 1.055 0 100 2.11z">
                            </path>
                            <path data-name="Path 37" d="M7.956 15.891l.863-9.562H5.946l.862 9.562z"></path>
                            <path data-name="Path 38"
                                d="M2.884 12.881a2.118 2.118 0 011.253 1.378 2.626 2.626 0 011.07 1.633h.542L4.887 6.33H2.164z">
                            </path>
                            <path data-name="Path 39" d="M12.601 6.329H9.877l-.862 9.562h2.059a.527.527 0 00.524-.469z">
                            </path>
                            <path data-name="Path 40"
                                d="M1.054 16.946a.876.876 0 00.091-.019 1.577 1.577 0 102-2c0-.031.019-.058.019-.091a1.055 1.055 0 00-2.11 0 1.055 1.055 0 100 2.109z">
                            </path>
                        </g>
                    </svg>`


    $.ajax({
        url: 'http://35.225.243.133/api/categories/',
        method: 'GET',
        success: function(response) {

            for (let categories of response) {

                let kindsCatg = $(`<div class="kinds"><div>`);
                let kindsSvg = $(`<svg>${category_svg}</svg>`);
                let kindsSpan = $(`<span>${categories.title}</span>`);
                kindsCatg.append(kindsSvg);
                kindsCatg.append(kindsSpan);
                $('.leftprdcts').append(kindsCatg);
                $(kindsCatg).click(function() {
                    sameId(categories.id);
                    $('.forsale').empty();

                })
            }


        },
        error: function(error_response) {
            alert('error')
        }
    })


    function sameId(id) {
        var requestUrl;
        if (typeof id == 'undefined') {
            requestUrl = `http://35.225.243.133/api/products/`
        } else {
            requestUrl = `http://35.225.243.133/api/products/?category=${id}`
        }
        $.ajax({

            url: requestUrl,
            method: "GET",
            success: function(response) {

                for (let product of response) {

                    $('.forsale').append(`<div class=" col-lg-3 col-md-4 col-sm-6 col-12 mb-4 h-100 w-100">
                <div class="card">
                    <img class="card-img-top w-100 h-100" src="${product.main_image}" alt="...">
                    <div class="card-body ">
                        <h5 class="card-title">${product.title}</h5>

                        <span class="cartcenter">${product.amount_by_unit}${product.unit}</span>
                        <div class="cartdown" >
                            <span class="card-price">${product.price}</span>
                            <div class="downright add_cart">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg " width="14.4 " height="12 "
                                        viewBox="0 0 14.4 12 ">
                                        <g data-name="Group 120 " transform="translate(-288 -413.89) ">
                                            <path data-name="Path 154 " fill="currentColor "
                                                d="M298.7,418.289l-2.906-4.148a.835.835,0,0,0-.528-.251.607.607,0,0,0-.529.251l-2.905,4.148h-3.17a.609.609,0,0,0-.661.625v.191l1.651,5.84a1.336,1.336,0,0,0,1.255.945h8.588a1.261,1.261,0,0,0,1.254-.945l1.651-5.84v-.191a.609.609,0,0,0-.661-.625Zm-5.419,0,1.984-2.767,1.98,2.767Zm1.984,5.024a1.258,1.258,0,1,1,1.319-1.258,1.3,1.3,0,0,1-1.319,1.258Zm0,0 ">
                                            </path>
                                        </g>
                                    </svg>
                                </span>
                                <span class="btn-text">Cart</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>`)
                }
            },
            error: function(error_response) {
                alert('error');

            }

        });

    }
    document.querySelector('#register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // console.log('dadas')
        let form_data = $('#register-form').serializeArray();
        document.querySelectorAll('#register-form small').forEach((small_tag) => {
            small_tag.innetHTML = ''
        });
        $.ajax({
            url: `${domain}/accounts/api/register/`,
            data: form_data,
            method: 'POST',
            success: function(response) {

                alert('Istifadeci yaradildi');
                // $.ajax({
                //     url: 'login_small.html',
                //     success: function(html_page) {
                //         document.querySelector('form').innerHTML = html_page;
                //     }
                // })
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
    })
    document.querySelector('#login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let second_form_data = new Object();
        document.querySelectorAll('#login-form input').forEach((input) => {
            second_form_data[input.getAttribute('name')] = input.value;
        });
        document.querySelectorAll('#login-form small').forEach((small_tag) => {
            small_tag.innerHTML = '';
        })
        $.ajax({
            url: `${domain}/accounts/api/login/`,
            method: 'POST',
            data: second_form_data,
            success: function(response) {
                console.log(response);
                localStorage.setItem('user', response.username);
                localStorage.setItem('token', response.token);
                console.log(response.token);
                window.location = 'secondpage.html';

            },
            error: function(error_response) {
                if (error_response.status == '401') {
                    window.location = 'allpickbazar.html'
                }
                alert('Sehvlik var');
                console.log('error_response', error_response)
                let error_messages = error_response.responseJSON;
                if (error_messages.hasOwnProperty('non_field_errors')) {
                    document.querySelector('#non_field_errors').innerText = error_messages['non_field_errors'];
                }
                for (let message_name in error_messages) {
                    let input = document.querySelector(`#login-form [name="${message_name}"`);
                    if (input) {
                        let small_tag = input.parentElement.querySelector('small');
                        small_tag.innerText = error_messages[message_name];
                    }
                }
            }
        })
    })
    $('.signbutton').click(function(click) {
        click.preventDefault()

        $('#register-form').css("display", "block");
        $('#login-form').css("display", "none");
        $('.signptag').css("display", "none");
        $('.signbutton').css("display", "none");
        $('.loginbutton').css("display", "block")
        $('.loginptag').css("display", "block")
        $('.forgotptag').css("display", "none");
        $('.forgotbutton').css("display", "none");
    })
    $('.loginbutton').click(function(click) {
        click.preventDefault()

        $('#register-form').css("display", "none");
        $('#login-form').css("display", "block");
        $('.signptag').css("display", "block");
        $('.signbutton').css("display", "block");
        $('.loginbutton').css("display", "none")
        $('.loginptag').css("display", "none")
        $('.forgotptag').css("display", "block");
        $('.forgotbutton').css("display", "block");

    })

    sameId();
});



$(document).on('click', '.card', function(event) {
    var clicked_element = event.target;
    cardClick(clicked_element, this);
})




function cardClick(clicked_element, cardElement) {
    console.log(clicked_element)
    console.log(cardElement)
        // console.log(clicked_element.closest('.add_cart'));
    if (clicked_element.closest('.add_cart') != null) {
        var card_image = cardElement.getElementsByClassName('card-img-top')[0].getAttribute("src");
        var card_title = cardElement.getElementsByClassName('card-title')[0].innerHTML;
        var card_price = cardElement.getElementsByClassName('card-price')[0].innerHTML;
        var card_pcs = cardElement.getElementsByClassName('cartcenter')[0].innerHTML;

        document.getElementsByClassName('no-products')[0].classList.add(`d-none`);



        var counter = 1;

        var card_count = document.querySelector(`[products-title="${card_title}"]`);



        if (card_count) {
            counter = parseInt(card_count.querySelector('.count').textContent);
            counter++;
            card_count.querySelector('.count').innerHTML = counter;

            var usd_price = card_price.replace('$', '');
            usd_price = parseInt(usd_price);



            var card_total = counter * usd_price;
            card_count.querySelector('.card-total').innerText = `$${card_total}`;
            var array_total = document.getElementById('card-products').querySelectorAll('.card-total');
            var first_sum = 0;
            for (var i = 0; i < array_total.length; i++) {
                first_sum += parseInt(array_total[i].textContent.replace('$', ''));
                console.log(parseInt(array_total[i].textContent.replace('$', '')));

            }
            document.getElementById('summa-2').innerHTML = `$${first_sum}`;
            document.getElementById('summa-1').innerHTML = `$${first_sum}`;


            return false;
        }










        document.getElementById('card-products').innerHTML += `<div class="card" products-title="${card_title}">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${card_image}"class="card-img" alt="..." >                
            </div>
            <div class="col-md-8">
                <div class="card-body row">
                    <div>
                        <h5 class="card-title jstitle">${card_title}</h5>
                        <p class="card-text jsprice">${card_price}</p>
                        <p class="card-text jspcs"><span class="count">${counter}</span>X ${card_pcs}</p>
                    </div>
                    <div class="fortotal row">
                        <span>$</span>
                        <span class="card-total">${card_price}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
        var array_total = document.getElementById('card-products').querySelectorAll('.card-total');
        var first_sum = 0;
        for (var i = 0; i < array_total.length; i++) {
            first_sum += parseInt(array_total[i].textContent.replace('$', ''));
            console.log(parseInt(array_total[i].textContent.replace('$', '')));

        }
        document.getElementById('summa-2').innerHTML = `$${first_sum}`;
        document.getElementById('summa-1').innerHTML = `$${first_sum}`;

        var inBacketArray = document.getElementById('card-products').children
        var itemCounter = 0
        for (var i = 0; i < inBacketArray.length; i++) {
            itemCounter++;
            console.log(itemCounter);
            document.getElementById('item-count-1').innerHTML = `${itemCounter}item`
            document.getElementById('item-count-2').innerHTML = `${itemCounter}item`

        }

        // let cardProducts = document.getElementById('card-products');
        // let firstDiv = document.createElement('div');
        // firstDiv.classList.add('card');
        // firstDiv.setAttribute('products-title');
        // cardProducts.appendChild(firstDiv);
        // let js_card = document.createElement('div');

        // let js = document.createElement('img');
        // jsImgCard.setAttribute('src');
        // jsImgCard.classList.add('card-img');
        // jsImgCard.classList.add('alt');
        // console.log(cardProducts);






    } else {
        document.getElementsByClassName('btn-primary')[0].click();
    }

}