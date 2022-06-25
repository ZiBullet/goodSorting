// Import area
import { arr } from "./scripts/arrs.js"
import { closeModalAdder, openModalAdder } from "./scripts/functions.js"
// The container where my items would be shown/appeared
const container = document.querySelector('.container__content')
// Forms
let forms = document.forms
const formSorter = document.forms.sort
// Sorter set uping
let min = formSorter.querySelector('#fr')
let max = formSorter.querySelector('#to')
max.placeholder = ''
min.placeholder = ''

let changerModal = document.querySelector('.modal__changer')
let currentItem = document.querySelector('.itemForChange')
// Function which creates my items
function reload(arr) {
    container.innerHTML = ''
    for (let item of arr) {
        // Creating items
        let box = document.createElement('div')
        let boxHeading = document.createElement('h4')
        let price = document.createElement('span')
        // Decorating them
        box.classList.add('box')
        boxHeading.innerHTML = item.title
        price.innerHTML = '$' + item.price
        // Appending each of them/connecting
        container.append(box)
        box.append(boxHeading, price)
        // Events, fitches
        if (max.placeholder < item.price) {
            max.placeholder = item.price
        } else {
            min.placeholder = item.price
        }
        box.onclick = () => {
            currentItem.append(box)
            openModalAdder(changerModal, modalAdderBg)
        }
    }
}
reload(arr)
let closers = document.querySelectorAll('.closer')
let modalAdder = document.querySelector('.modal__adder__container')
let modalAdderBg = document.querySelector('.modal__adder__bg')
let adderBtn = document.querySelector('.goods__adder')

adderBtn.onclick = () => {
    openModalAdder(modalAdder, modalAdderBg)
}

closers.forEach(closer => {
    closer.onclick = () => {
        closeModalAdder(modalAdder, modalAdderBg)
    }
})
for (let form of forms) {
    form.onsubmit = (event) => {
        event.preventDefault()
        submit(form)
        reload(arr)
    }
}
function submit (form) {
    let item = {}
    let fm = new FormData(form)
    fm.forEach((value, key) => {
        item[key] = value
    })
    arr.push(item)
    console.log(item);
}