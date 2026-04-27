class CustomLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    min-height: 100vh;
                    width: 100%;
                }

                @media (max-width: 768px) {
                    :host {
                        flex-direction: column;
                    }
                }

                .content-area {
                    flex-grow: 1;
                    height: 100vh;
                    overflow-y: auto;
                }
            </style>
            
            <slot name="nav"></slot>
            
            <main class="content-area">
                <slot></slot> 
            </main>
            `;
    }

}

if (!customElements.get('custom-layout')) {
    customElements.define('custom-layout', CustomLayout);
}