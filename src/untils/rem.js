function refreshRem() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 19.2 + 'px';
}

refreshRem();
window.addEventListener('resize', refreshRem);









export const setOptionSize = (val) => {
    let baseSize = document.documentElement.clientWidth / 19.2;
    return val * baseSize / 100;
}