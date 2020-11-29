const $document = $(document);
const $inputSearch = $('#input-search');
const $tableBody = $('#table-body');

const templateProductRows = $('#template-rows').html();

$document.on('click', '#button-search', () => {
    searchData();
});

$document.on('keyup', '#input-search', (key) => {
    searchData();
});

function searchData() {
    const search = $inputSearch.val();

    console.log({search});

    if(search) {
        $.get('/search?search=' + search, (products) => {
            const template = Handlebars.compile(templateProductRows);
            // execute the compiled template and print the output to the console
            $tableBody.html(template({ products }));
        });
    } else {
        document.location = '';
    }
}