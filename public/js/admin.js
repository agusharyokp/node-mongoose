const deleteProduct = (button) => {
    const productId = button.parentNode.querySelector('[name="productId"]').value;
    const token = button.parentNode.querySelector('[name="_csrf"]').value;
    const productElement = button.closest('article');

    const data = {
        productId,
        _csrf: token
    }

    console.log(data);
    
    fetch('/admin/product/' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'csrf-token': token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            productElement.parentNode.removeChild(productElement);
        }
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    })
}