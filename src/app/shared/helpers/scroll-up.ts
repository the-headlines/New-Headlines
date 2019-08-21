export default class ScrollUp {
    static do() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            const container = document.querySelector('#home_carousel');
            setTimeout(() => {
                container.scrollIntoView({block: 'start', behavior: 'smooth'});
            });
        } else {
            window.scrollTo({top: 550, behavior: 'smooth'});
        }
    }
}
