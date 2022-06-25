
function closeModalAdder (modal, modal__bg) {
    document.body.style.overflowY = 'scroll'
    modal__bg.style.opacity = '0'
    modal.style.right = '-100%'
    setTimeout(() => {
        modal.style.display = 'none'
        modal__bg.style.display = 'none'
    }, 300);
}
function openModalAdder (modal, modal__bg) {
    document.body.style.overflowY = 'hidden'
    modal__bg.style.display = 'block'
    modal.style.display = 'flex'
    setTimeout(() => {
        modal.style.right = '0%'
        modal__bg.style.opacity = '1'
    }, 200);
}
export {closeModalAdder, openModalAdder}