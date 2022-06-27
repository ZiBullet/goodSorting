// __________________Modal close_____________________
function closeModalAdder (modal, modal__bg) {
    document.body.style.overflowY = 'scroll'
    modal__bg.style.opacity = '0'
    modal.style.right = '-100%'
    setTimeout(() => {
        modal.style.display = 'none'
        modal__bg.style.display = 'none'
    }, 300);
}
// __________________Modal open_____________________
function openModalAdder (modal, modal__bg) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    document.body.style.overflowY = 'hidden'
    modal__bg.style.display = 'block'
    modal.style.display = 'flex'
    setTimeout(() => {
        modal.style.right = '0%'
        modal__bg.style.opacity = '1'
    }, 200);
}
// ______________________________________Export area____________________________
export {closeModalAdder, openModalAdder}