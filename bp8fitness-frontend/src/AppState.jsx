import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil';
import { recoilPersist } from 'recoil-persist'
import {loadStripe} from '@stripe/stripe-js';

////
//// NON-PERSISTENT STATE BELOW
////

// Control whether the hamburer menu icon was clicked or not. This state is
// needed by 'TopNavigation' an 'SideNavigation' components.
export const onHamburgerClickedState = atom({
  key: 'onHamburgerClicked', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Control what message to display at the top as a banner in the app.
export const topAlertMessageState = atom({
  key: 'topBannerAlertMessage',
  default: "",
});

// Control what type of message to display at the top as a banner in the app.
export const topAlertStatusState = atom({
  key: 'topBannerAlertStatus',
  default: "success",
});

////
//// READ-ONLY STATE BELOW
////

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromiseState = atom({
  key: 'stripePromise',
  default: loadStripe('pk_test_51NCBLJC1dNpgYbqFogttFImuV3omYlQ0YW1kCACNOI28xMjvQwyt6eJy52EMNBfROZtEk4Be7yjdZMGNsISTmaCV00xMMhZgKO'),
});

////
//// PERSISTENT STATE BELOW
////
//
// https://github.com/polemius/recoil-persist
//

const { persistAtom } = recoilPersist()
export const currentUserState = atom({
  key: 'currentUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const workoutProgramDetailState = atom({
  key: 'workoutProgramDetail',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const currentWorkoutSessionState = atom({
  key: 'currentWorkoutSession',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
