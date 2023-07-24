import { React } from "react";
import "bulma/css/bulma.min.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import AdminWorkoutProgramSessionWaitlisterDetail from "./Components/Admin/Program/Session/Waitlister/Detail";
import AdminWorkoutProgramSessionWaitlisterAdd from "./Components/Admin/Program/Session/Waitlister/Add";
import AdminWorkoutProgramSessionWaitlisterList from "./Components/Admin/Program/Session/Waitlister/List";
import AdminWorkoutProgramSessionBookingUpdate from "./Components/Admin/Program/Session/Booking/Update";
import AdminWorkoutProgramSessionBookingDetail from "./Components/Admin/Program/Session/Booking/Detail";
import AdminWorkoutProgramSessionBookingAdd from "./Components/Admin/Program/Session/Booking/Add";
import AdminWorkoutProgramSessionBookingList from "./Components/Admin/Program/Session/Booking/List";
// import AdminWorkoutSessionUpdate from "./Components/Admin/Workout/Session/Update";
// import AdminWorkoutSessionDetail from "./Components/Admin/Workout/Session/Detail";
import AdminWorkoutSessionList from "./Components/Admin/Session/List";
// import AdminWorkoutSessionAdd from "./Components/Admin/Workout/Session/Add";
import AdminWorkoutProgramSessionUpdate from "./Components/Admin/Program/Session/Update";
import AdminWorkoutProgramSessionDetail from "./Components/Admin/Program/Session/Detail";
import AdminWorkoutProgramSessionAdd from "./Components/Admin/Program/Session/Add";
import AdminWorkoutProgramUpdate from "./Components/Admin/Program/Update";
import AdminWorkoutProgramDetailForSessionList from "./Components/Admin/Program/DetailForSessionList";
import AdminWorkoutProgramDetail from "./Components/Admin/Program/Detail";
import AdminWorkoutProgramList from "./Components/Admin/Program/List";
import AdminWorkoutProgramAdd from "./Components/Admin/Program/Add";
import AdminTrainerUpdate from "./Components/Admin/Trainer/Update";
import AdminTrainerDetail from "./Components/Admin/Trainer/Detail";
import AdminTrainerDetailForProgramList from "./Components/Admin/Trainer/DetailForProgramList";
import AdminTrainerList from "./Components/Admin/Trainer/List";
import AdminTrainerAdd from "./Components/Admin/Trainer/Add";
import AdminMemberDetailForWaitlisterList from "./Components/Admin/Member/DetailForWaitlisterList";
import AdminMemberDetailForBookingList from "./Components/Admin/Member/DetailForBookingList";
import AdminMemberUpdate from "./Components/Admin/Member/Update";
import AdminMemberDetail from "./Components/Admin/Member/Detail";
import AdminMemberList from "./Components/Admin/Member/List";
import AdminMemberAdd from "./Components/Admin/Member/Add";
import AdminBranchUpdate from "./Components/Admin/Branch/Update";
import AdminBranchDetail from "./Components/Admin/Branch/Detail";
import AdminBranchList from "./Components/Admin/Branch/List";
import AdminBranchAdd from "./Components/Admin/Branch/Add";
import AdminWorkoutProgramTypeUpdate from "./Components/Admin/WorkoutProgramType/Update";
import AdminWorkoutProgramTypeDetail from "./Components/Admin/WorkoutProgramType/Detail";
import AdminWorkoutProgramTypeList from "./Components/Admin/WorkoutProgramType/List";
import AdminWorkoutProgramTypeAdd from "./Components/Admin/WorkoutProgramType/Add";
import AdminOrganizationDetail from "./Components/Admin/Organization/Detail";
import AdminOrganizationUpdate from "./Components/Admin/Organization/Update";
import AdminDashboard from "./Components/Admin/Dashboard";
import TrainerDashboard from "./Components/Trainer/Dashboard";
import MemberDashboard from "./Components/Member/Dashboard";
import PurchaseHistory from "./Components/Member/PurchaseHistory/List";
import PurchaseHistoryDetail from "./Components/Member/PurchaseHistory/Detail";
import VisitHistory from "./Components/Member/VisitHistory/List";
import VisitHistoryDetail from "./Components/Member/VisitHistory/Detail";
import MemberClassesAndEvents from "./Components/Member/ClassesAndEvents";
import PaymentProcessorBeginSubscription from "./Components/Member/PaymentProcessor/SubscriptionBegin";
import PaymentProcessorSubscriptionSuccessRedirector from "./Components/Member/PaymentProcessor/SubscriptionSuccessRedirector";
import PaymentProcessorSubscriptionSuccess from "./Components/Member/PaymentProcessor/SubscriptionSuccess";
import PaymentProcessorSubscriptionCanceled from "./Components/Member/PaymentProcessor/SubscriptionCanceled";
import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Login from "./Components/Gateway/Login";
import Register from "./Components/Gateway/Register";
import RegisterStep2 from "./Components/Gateway/RegisterStep2";
import RegisterStep1 from "./Components/Gateway/RegisterStep1";
import RegisterSuccessful from "./Components/Gateway/RegisterSuccessful";
import Index from "./Components/Gateway/Index";
import AnonymousCurrentUserRedirector from "./Components/Misc/AnonymousCurrentUserRedirector";
import TopAlertBanner from "./Components/Misc/TopAlertBanner";
import Sidebar from "./Components/Menu/Sidebar";
import Topbar from "./Components/Menu/Top";
import NotFoundError from "./Components/Misc/NotFoundError";
import NotImplementedError from "./Components/Misc/NotImplementedError";
import EmailVerification from "./Components/Gateway/EmailVerification";
import AccountDetail from "./Components/Account/Detail";
import AccountUpdate from "./Components/Account/Update";
import AccountChangePassword from "./Components/Account/ChangePassword";
import ForgotPassword from "./Components/Gateway/ForgotPassword";
import PasswordReset from "./Components/Gateway/PasswordReset";

function AppRoute() {
  return (
    <div class="is-widescreen">
      <RecoilRoot>
        <Router>
          <AnonymousCurrentUserRedirector />
          <TopAlertBanner />
          <Topbar />
          <div class="columns">
            <Sidebar />
            <div class="column">
              <section class="main-content columns is-fullheight">
                <Routes>
                  {/*


                                    <Route exact path="/admin/branch/:bid/workouts/program/:pid/session/:sid/update" element={<AdminWorkoutSessionUpdate/>}/>
                                    <Route exact path="/admin/branch/:bid/workouts/program/:pid/session/:sid" element={<AdminWorkoutSessionDetail/>}/>
                                    <Route exact path="/admin/workouts/sessions/add" element={<AdminWorkoutSessionAdd/>}/>
                                */}
                  <Route
                    exact
                    path="/admin/all/calendar"
                    element={<AdminWorkoutSessionList />}
                  />

                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/waitlister/:wid"
                    element={<AdminWorkoutProgramSessionWaitlisterDetail />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/waitlisters/add"
                    element={<AdminWorkoutProgramSessionWaitlisterAdd />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/waitlisters"
                    element={<AdminWorkoutProgramSessionWaitlisterList />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/booking/:psbid/update"
                    element={<AdminWorkoutProgramSessionBookingUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/booking/:psbid"
                    element={<AdminWorkoutProgramSessionBookingDetail />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/bookings/add"
                    element={<AdminWorkoutProgramSessionBookingAdd />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/bookings"
                    element={<AdminWorkoutProgramSessionBookingList />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid/update"
                    element={<AdminWorkoutProgramSessionUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/session/:sid"
                    element={<AdminWorkoutProgramSessionDetail />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/sessions/add"
                    element={<AdminWorkoutProgramSessionAdd />}
                  />

                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/update"
                    element={<AdminWorkoutProgramUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid/sessions"
                    element={<AdminWorkoutProgramDetailForSessionList />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/class/:pid"
                    element={<AdminWorkoutProgramDetail />}
                  />
                  <Route
                    exact
                    path="/admin/classes"
                    element={<AdminWorkoutProgramList />}
                  />
                  <Route
                    exact
                    path="/admin/classes/add"
                    element={<AdminWorkoutProgramAdd />}
                  />

                  <Route
                    exact
                    path="/admin/branch/:bid/trainer/:tid/update"
                    element={<AdminTrainerUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/trainer/:tid/classes"
                    element={<AdminTrainerDetailForProgramList />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/trainer/:tid"
                    element={<AdminTrainerDetail />}
                  />
                  <Route
                    exact
                    path="/admin/trainers"
                    element={<AdminTrainerList />}
                  />
                  <Route
                    exact
                    path="/admin/trainers/add"
                    element={<AdminTrainerAdd />}
                  />

                  <Route
                    exact
                    path="/admin/branch/:bid/member/:id/waitlist"
                    element={<AdminMemberDetailForWaitlisterList />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/member/:id/bookings"
                    element={<AdminMemberDetailForBookingList />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/member/:id/update"
                    element={<AdminMemberUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:bid/member/:id"
                    element={<AdminMemberDetail />}
                  />
                  <Route
                    exact
                    path="/admin/members"
                    element={<AdminMemberList />}
                  />
                  <Route
                    exact
                    path="/admin/members/add"
                    element={<AdminMemberAdd />}
                  />

                  <Route
                    exact
                    path="/admin/organization"
                    element={<AdminOrganizationDetail />}
                  />
                  <Route
                    exact
                    path="/admin/organization/update"
                    element={<AdminOrganizationUpdate />}
                  />

                  <Route
                    exact
                    path="/admin/branch/:id/update"
                    element={<AdminBranchUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/branch/:id"
                    element={<AdminBranchDetail />}
                  />
                  <Route
                    exact
                    path="/admin/branches"
                    element={<AdminBranchList />}
                  />
                  <Route
                    exact
                    path="/admin/branches/add"
                    element={<AdminBranchAdd />}
                  />

                  <Route
                    exact
                    path="/admin/wp-type/:id/update"
                    element={<AdminWorkoutProgramTypeUpdate />}
                  />
                  <Route
                    exact
                    path="/admin/wp-type/:id"
                    element={<AdminWorkoutProgramTypeDetail />}
                  />
                  <Route
                    exact
                    path="/admin/wp-types"
                    element={<AdminWorkoutProgramTypeList />}
                  />
                  <Route
                    exact
                    path="/admin/wp-types/add"
                    element={<AdminWorkoutProgramTypeAdd />}
                  />

                  <Route
                    exact
                    path="/booking/:id"
                    element={<NotImplementedError />}
                  />

                  <Route
                    exact
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                  />
                  <Route
                    exact
                    path="/trainer/dashboard"
                    element={<TrainerDashboard />}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={<MemberDashboard />}
                  />
                  <Route
                    exact
                    path="/classes-and-events"
                    element={<MemberClassesAndEvents />}
                  />
                  <Route
                    exact
                    path="/subscriptions"
                    element={<PaymentProcessorBeginSubscription />}
                  />
                  <Route
                    exact
                    path="/subscription/success"
                    element={<PaymentProcessorSubscriptionSuccessRedirector />}
                  />
                  <Route
                    exact
                    path="/subscription/completed"
                    element={<PaymentProcessorSubscriptionSuccess />}
                  />
                  <Route
                    exact
                    path="/subscription/canceled"
                    element={<PaymentProcessorSubscriptionCanceled />}
                  />
                  <Route
                    exact
                    path="/purchase-history"
                    element={<PurchaseHistory />}
                  />
                  <Route
                    exact
                    path="/purchase-history/:id"
                    element={<PurchaseHistoryDetail />}
                  />
                  <Route
                    exact
                    path="/visit-history"
                    element={<VisitHistory />}
                  />
                  <Route
                    exact
                    path="/visit-history/:id"
                    element={<VisitHistoryDetail />}
                  />
                  <Route exact path="/account" element={<AccountDetail />} />
                  <Route
                    exact
                    path="/account/update"
                    element={<AccountUpdate />}
                  />
                  <Route
                    exact
                    path="/account/change-password"
                    element={<AccountChangePassword />}
                  />
                  <Route exact path="/register" element={<Register />} />
                  <Route
                    exact
                    path="/register-step-1"
                    element={<RegisterStep1 />}
                  />
                  <Route
                    exact
                    path="/register-step-2"
                    element={<RegisterStep2 />}
                  />
                  <Route
                    exact
                    path="/register-successful"
                    element={<RegisterSuccessful />}
                  />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/logout" element={<LogoutRedirector />} />
                  <Route exact path="/verify" element={<EmailVerification />} />
                  <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  />
                  <Route
                    exact
                    path="/password-reset"
                    element={<PasswordReset />}
                  />
                  <Route exact path="/" element={<MemberDashboard />} />
                  <Route path="*" element={<NotFoundError />} />
                </Routes>
              </section>
              <div>
                {/* DEVELOPERS NOTE: Mobile tab-bar menu can go here */}
              </div>
              <footer class="footer is-hidden">
                <div class="container">
                  <div class="content has-text-centered">
                    <p>Hello</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default AppRoute;
