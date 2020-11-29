/* Instantiate jQuery variables */
const $document = $(document);
const $inputSearch = $('#input-search');
const $tableBody = $('#table-body');

/* Load HTML templates */
let templateProductRows;
loadProductsTemplate();

/* Declare events */
$document.on('click', '#button-search', () => {
    searchData();
});

$document.on('keyup', '#input-search', (key) => {
    searchData();
});

/**
 * Function to search products
 */
function searchData() {
    const search = $inputSearch.val();

    console.log({search});

    if(search) {
        $.get('/search?search=' + search, (products) => {
            $tableBody.html(templateProductRows({ products }));
        });
    } else {
        document.location = '';
    }
}

/**
 * Function that loads the HTML products template
 */
function loadProductsTemplate() {
    $.get('/template/table-products.html', (html) => {
        templateProductRows = Handlebars.compile(html);
    });
}