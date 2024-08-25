let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productcategory");
let productDescription = document.getElementById("productdescription");
let productCounter = document.getElementById("productCounter");
let tableBody = document.getElementById("tableBody");
let btnAdd = document.getElementById("btn_add");
let deleteAll = document.getElementById("deletAll");
let arrayProducts = [];
let mode = -1;

let editStart = document.getElementById("editStart");
let editEnd = document.getElementById("editEnd");
let isEdit = false;

let deleteStart = document.getElementById("deleteStart");
let deleteEnd = document.getElementById("deleteEnd");

// this fucntion add new products
btnAdd.onclick = function addProducts() {
  let products = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  if (mode > -1) {
    if (isEdit == true) {
      for (let i = editStart.value - 1; i < editEnd.value; i++) {
        arrayProducts[i] = products;
      }
      mode = -1;
      isEdit = false ;
      editStart.value = "";
      editEnd.value = "";
    } else {
      arrayProducts[mode] = products;
      mode = -1;
    }
  } else {
    if (
      productName.value != "" ||
      productPrice.value != "" ||
      productCategory.value != "" ||
      productDescription.value != ""
    ) {
      for (let i = 0; i < productCounter.value; i++) {
        arrayProducts.push(products);
      }
    } else {
      window.alert(
        `the value is empty
 please Eneter products
 القيم فارغه من فضلك ادخل المنتجات `
      );
    }
  }

  display();
  clearInput();
};

// this fuction print the products in html
function display() {
  let data = "";
  for (let i = 0; i < arrayProducts.length; i++) {
    data += `
         <tr>
                <td>${i + 1}</td>
                <td>${arrayProducts[i].name}</td>
                <td>${arrayProducts[i].price}</td>
                <td>${arrayProducts[i].category}</td>
                <td>${arrayProducts[i].description}</td>
                <td>
                <button class="btn btn-warning" onclick="edit(${i})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteOneProduct(${i})"><i class="bi bi-trash"></i></button>
                </td>
        </tr>
        `;
  }

  tableBody.innerHTML = data;
}

// this fuction delete all products of page
deleteAll.onclick = function () {
  arrayProducts.splice(0);
  display();
};

// this function delete one product in page
function deleteOneProduct(i) {
  arrayProducts.splice(i, 1);
  display();
}

// this fuction clear input in page
function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productCounter.value = 1;
}

// this function edit in the tabel body
function edit(i) {
  productName.value = arrayProducts[i].name;
  productPrice.value = arrayProducts[i].price;
  productCategory.value = arrayProducts[i].category;
  productDescription.value = arrayProducts[i].description;
  mode = i;
}

// this fuction edit in the vlaue of all products
function editAll() {
  if (arrayProducts.length == 0) {
    window.alert(`I am sorry there are no products to modify 
    لا يوجد منتجات للتعديل عليها `);
  } else if (editStart.value == "") {
    window.alert(`Please Enetr product start
    من فضلك ادخل بداية التعديل  `);
  } else if (editEnd.value == "") {
    window.alert(`Please Enetr product End
    من فضلك ادخل نهاية التعديل `);
  } else {
    productName.value = arrayProducts[editStart.value - 1].name;
    productPrice.value = arrayProducts[editStart.value - 1].price;
    productCategory.value = arrayProducts[editStart.value - 1].category;
    productDescription.value = arrayProducts[editStart.value - 1].description;
    isEdit = true;
    mode = editStart.value;
  }
}

// this fuction delete form start to end
function deleteFrom() {
  if (arrayProducts.length == 0) {
    window.alert(`I am sorry there are no products to Delete 
    لا يوجد منتجات لحذفها` );
  } else if (deleteStart.value == "") {
    window.alert(`Please Enetr product start
    من فضلك ادخل بداية الحذف  `);
  } else if (deleteEnd.value == "") {
    window.alert(`Please Enetr product End
    من فضلك ادخل نهاية الحذف `);
  } else {
    arrayProducts.splice(deleteStart.value - 1, deleteEnd.value);
    display();
  }

  deleteStart.value = "";
  deleteEnd.value = "";
}
