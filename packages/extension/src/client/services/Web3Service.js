import Web3Service from '~/utils/Web3Service';
import EventListeners from '~/utils/EventListeners';

class ClientWeb3Service extends Web3Service {
    constructor() {
        super();

        this.eventListeners = new EventListeners(['profile']);
        this.subscribeProfileListeners();
    }

    subscribeProfileListeners() {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', () => {
                this.eventListeners.notify('profile');
            });

            window.ethereum.on('networkChanged', () => {
                this.eventListeners.notify('profile');
            });
        }
        // TODO - other providers
    }

    bindProfileChange(cb, allowMultiple = false) {
        if (!allowMultiple) {
            this.eventListeners.removeAll('profile');
        }
        if (!this.eventListeners.isListening('profile', cb)) {
            this.eventListeners.add('profile', cb);
        }
    }

    unbindProfileChange(cb) {
        this.eventListeners.remove('profile', cb);
    }
}

export default new ClientWeb3Service();