import { Plugin } from '@nuxt/types';

const locationPlugin: Plugin = async ({ store }) => {
    const fetchLocation = async () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.error('Error fetching geolocation:', error.message);
                    reject(error);
                }
            );
        });
    };

    try {
        const location = await fetchLocation(); // Obtém localização do cliente
        store.commit('location/SET_LOCATION', location); // Salva no Vuex Store
    } catch (error) {
        if (error instanceof Error) {
            console.warn('Could not fetch location:', error.message);
        } else {
            console.warn('Could not fetch location:', error);
        }
    }
};

export default locationPlugin;
