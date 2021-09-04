
const stateDefault = {
    isLoading: false,
    isLoadingCheckout:false,
}
export const LoadingReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case 'DISPLAY_LOADING': {
            state.isLoading = true;
            return { ...state };
        }
        case 'HIDE_LOADING': {
            state.isLoading = false;
            return { ...state };
        }
        case 'DISPLAY_LOADING_CHECKOUT': {
            state.isLoadingCheckout = true;
            return { ...state };
        }
        case 'HIDE_LOADING_CHECKOUT': {
            state.isLoadingCheckout = false;
            return { ...state };
        }
        default: return { ...state };
    }


}