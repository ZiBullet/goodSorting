// _______________________________________Import area____________________________
import { arr } from "./scripts/arrs.js"
import { closeModalAdder, openModalAdder } from "./scripts/functions.js"
// ______________________________________________________________________________

// _______The container where my items would be shown/appeared__________
const container = document.querySelector('.container__content')
// ________Forms_________
let forms = document.forms
const formSorter = document.forms.sort
const formAdder = document.forms.adder
// __________Sorter set uping_______
let formAdderInputs = formAdder.querySelectorAll('input')
let min = formSorter.querySelector('#fr')
let max = formSorter.querySelector('#to')
max.placeholder = ''
min.placeholder = ''
// ________________Modal windows______________________
let modalAdder = document.querySelector('.modal__adder__container')
let modalAdderBg = document.querySelector('.modal__adder__bg')
let changerModal = document.querySelector('.modal__changer')
let modalChangerBg = document.querySelector('.modal__changer__bg')
// ___________Buttons: (Adder), (Sort by alphabet, by price and show all)____________
let sortByAlphabetBtn = document.querySelector('.alphabet')
let showAll = document.querySelector('.showAll')
let adderBtn = document.querySelector('.goods__adder')
let changerCloser = document.querySelectorAll('.changerCloser')
let closers = document.querySelectorAll('.closer')
// __________Extra variables_____________
let currentItem = document.querySelector('.itemForChange')
// ______________Function which creates my items______________
function reload(arr) {
    container.innerHTML = ''
    for (let item of arr) {
        // __________Creating items_____________
        let box = document.createElement('div')
        let boxHeading = document.createElement('h4')
        let price = document.createElement('span')
        // __________Decorating them________________
        box.classList.add('box')
        boxHeading.innerHTML = item.title
        price.innerHTML = '$' + item.price
        // _________Appending each of them/connecting_____________
        container.append(box)
        box.append(boxHeading, price)
        // ________Changing inner box____________
        box.onclick = () => {
            currentItem.innerHTML = ''
            // _____________Creating box shower_________
            let myItem = document.createElement('div')
            let myItemTitle = document.createElement('h4')
            let myItemPrice = document.createElement('span')
            let currentName = document.querySelector('.current__name')
            let currentPrice = document.querySelector('.current__price')
            let saveChanges = document.querySelector('.save')
            //__________Decorating it_______________
            myItem.classList.add('box')
            myItemTitle.innerHTML = item.title
            myItemPrice.innerHTML = item.price
            currentName.value = item.title
            currentPrice.value = item.price
            // ________Appending it to my modal_________
            currentItem.append(myItem)
            myItem.append(myItemTitle, myItemPrice)
     // ________________________________________Events____________________________________________
            openModalAdder(changerModal, modalChangerBg)
            saveChanges.onclick = () => {
                item.title = currentName.value
                item.price = currentPrice.value
                closeModalAdder(changerModal, modalChangerBg)
                reload(arr)
            }           
        }
        // ________________Max and min prices________________
        if (max.placeholder < item.price) {
            max.placeholder = item.price
        } else {
            min.placeholder = item.price
        }
    }
    
    // __________________Alphabet sorter function________________
    sortByAlphabetBtn.onclick = () => {
        let sortedByAlp = arr.sort(sortArray)
        reload(sortedByAlp)
    }
    function sortArray(x, y){
        return x.title.localeCompare(y.title, 'fr', {ignorePunctuation: true});
    }
}
// ____________Adder items function__________________
adderBtn.onclick = () => {
    openModalAdder(modalAdder, modalAdderBg)
}
// ____________Modal closer functions__________________
closers.forEach(closer => {
    closer.onclick = () => {
        closeModalAdder(modalAdder, modalAdderBg)
    }
})
changerCloser.forEach(closer => {
    closer.onclick = () => {
        closeModalAdder(changerModal, modalChangerBg)
    }
});
// _________________Manipultions with form__________________
for (let form of forms) {
    form.onsubmit = (event) => {
        event.preventDefault()
        submit(form, arr)
        reload(arr)
    }
}
function submit (form, arr) {
    let item = {}
    let fm = new FormData(form)
    fm.forEach((value, key) => {
        item[key] = value
    })
    if (form.name === 'adder') {
        let errs = []
        formAdderInputs.forEach(input => {
            if (input.value.length === 0) {
                errs.push('error')
            }
        })
        errs.length === 0 ? arr.push(item) : console.log('Fill the missed fields!')
    } else if (form.name === 'sort') {
        let filtered = arr.filter(arrItem => arrItem.price <= item.to && arrItem.price >= item.from)
        reload(filtered)
    }   
    // __________________Show all items button___________reload Events
    showAll.onclick = () => {
        reload(arr)
    }
}
// _____________End of the page (reload is called zone)__________________
reload(arr)