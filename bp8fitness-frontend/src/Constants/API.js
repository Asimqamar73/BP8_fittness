
const HTTP_API_SERVER = "https://bp8fitness.net"
// const HTTP_API_SERVER =
//   process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN;
export const BP8_FITNESS_API_BASE_PATH = "/api/v1";
export const BP8_FITNESS_VERSION_ENDPOINT = "version";
export const BP8_FITNESS_LOGIN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/login";
export const BP8_FITNESS_REGISTER_MEMBER_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/register-member";
export const BP8_FITNESS_REFRESH_TOKEN_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/refresh-token";
export const BP8_FITNESS_EMAIL_VERIFICATION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/verify";
export const BP8_FITNESS_LOGOUT_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/logout";
export const BP8_FITNESS_SUBMISSIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/submissions";
export const BP8_FITNESS_SUBMISSION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/submission/{id}";
export const BP8_FITNESS_SUBMISSION_MEMBER_SWAP_OPERATION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/submissions/operation/set-user";
export const BP8_FITNESS_SUBMISSION_CREATE_COMMENT_OPERATION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/submissions/operation/create-comment";
export const BP8_FITNESS_ACCOUNT_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/account";
export const BP8_FITNESS_ACCOUNT_CHANGE_PASSWORD_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/account/change-password";
export const BP8_FITNESS_MEMBERS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/members";
export const BP8_FITNESS_MEMBER_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/member/{id}";
export const BP8_FITNESS_MEMBER_CREATE_COMMENT_OPERATION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/members/operation/create-comment";
export const BP8_FITNESS_BRANCH_MEMBER_SELECT_OPTIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/select-options/{id}/members";
export const BP8_FITNESS_ORGANIZATIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/organizations";
export const BP8_FITNESS_ORGANIZATION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/organization/{id}";
export const BP8_FITNESS_FORGOT_PASSWORD_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/forgot-password";
export const BP8_FITNESS_PASSWORD_RESET_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/password-reset";
export const BP8_FITNESS_REGISTRY_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/cpsrn/{id}";
export const BP8_FITNESS_WORKOUT_CLASS_TYPES_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-program-types";
export const BP8_FITNESS_WORKOUT_CLASS_TYPE_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-program-type/{id}";
export const BP8_FITNESS_BRANCHES_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/branches";
export const BP8_FITNESS_BRANCH_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/branch/{id}";
export const BP8_FITNESS_PUBLIC_BRANCHES_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/public/branches";
export const BP8_FITNESS_ORGANIZATION_BRANCH_SELECT_OPTIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/select-options/{id}/branches";
export const BP8_FITNESS_TRAINERS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/trainers";
export const BP8_FITNESS_TRAINER_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/trainer/{id}";
export const BP8_FITNESS_TRAINER_CREATE_COMMENT_OPERATION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/trainers/operation/create-comment";
export const BP8_FITNESS_WORKOUT_PROGRAMS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-programs";
export const BP8_FITNESS_WORKOUT_PROGRAM_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-program/{id}";
export const BP8_FITNESS_BRANCH_WORKOUT_PROGRAM_SELECT_OPTIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/select-options/{id}/workout-programs";
export const BP8_FITNESS_BRANCH_WORKOUT_PROGRAM_TYPE_SELECT_OPTIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/select-options/{id}/workout-program-types";
export const BP8_FITNESS_BRANCH_TRAINER_SELECT_OPTIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/select-options/{id}/trainers";
export const BP8_FITNESS_WORKOUT_SESSIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-sessions";
export const BP8_FITNESS_WORKOUT_SESSION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-session/{id}";
export const BP8_FITNESS_BRANCH_WORKOUT_SESSION_TYPE_SELECT_OPTIONS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/select-options/{id}/workout-sessions";
export const BP8_FITNESS_WORKOUT_SESSION_BOOKINGS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-session-bookings";
export const BP8_FITNESS_WORKOUT_SESSION_BOOKING_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-session-booking/{id}";
export const BP8_FITNESS_WORKOUT_SESSION_WAITLISTERS_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-session-waitlisters";
export const BP8_FITNESS_WORKOUT_SESSION_WAITLISTER_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/workout-session-waitlister/{id}";
export const BP8_FITNESS_COMPLETE_STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_API_ENDPOINT =
  HTTP_API_SERVER +
  "/api/v1/stripe/complete-subscription-checkout-session?session_id={sessionID}";
export const BP8_FITNESS_CREATE_STRIPE_SUBSCRIPTION_CHECKOUT_SESSION_API_ENDPOINT =
  HTTP_API_SERVER + "/api/v1/stripe/create-subscription-checkout-session";
export const BP8_FITNESS_SCHEDULE_PUBLIC =
  "/api/v1/public/workout-sessions";
