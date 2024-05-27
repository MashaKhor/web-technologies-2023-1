if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const data = null;
    const items = new ListItems(document.getElementById('list-items'), data);

    items.init()

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            const parents = this.el.querySelectorAll('[data-parent]')

            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]')

                open.addEventListener('click', () => this.toggleItems(parent) )
            })
        }

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }
    }
}