import { MutationTree } from 'vuex';
import { LocationState } from '~/store';

export const state = (): LocationState => ({
    latitude: null,
    longitude: null,
});

export const mutations: MutationTree<LocationState> = {
    SET_LOCATION(state, { latitude, longitude }: { latitude: number; longitude: number }) {
        state.latitude = latitude;
        state.longitude = longitude;
    },
};
