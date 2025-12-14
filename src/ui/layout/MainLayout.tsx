import { IonPage, IonRouterLink, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, useIonRouter } from "@ionic/react";
import React, { lazy, useEffect } from "react"
import { Route } from "react-router";

// Config
import { routeConfig } from "../../config/routeConfig";

// Page
import Map from "../page/Map";
import Discover from "../page/Discover";
import Camera from "../page/Camera";
import Quest from "../page/Quest";
import MoreInfo from "../page/MoreInfo";

// Toast
import { Bounce, toast, ToastContainer } from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import { setSpecies } from "../../redux/state/speciesReducer";

// Service
import { SpeciesService } from "../../services/speciesService";
import { toastConfig } from "../../config/toastConfig";
const speciesService = new SpeciesService()

export type ToastType = {
    toastMessage: string,
    toastType?: "info" | "success" | "warn" | "error",
    pending?: boolean,
    autoclose?: number
}

const MainLayout: React.FC = () => {
    // Map root
    const router = useIonRouter();
    const pathname = router.routeInfo.pathname
    const showTabs = pathname.startsWith('/main');
    const dispatch = useDispatch()

    // Get species data 
    useEffect(() => {
        if (showTabs) {
            (async () => {
                const pending = toastConfig({
                    toastMessage: 'Đang tải dữ liệu',
                    pending: true
                })
                const getSpeciesData = await speciesService.getSpeciesShortDetail()
                toast.dismiss(pending)
                dispatch(setSpecies(getSpeciesData))
            })()
        }
    }, [showTabs])

    return (
        <>
            {showTabs && (
                <>
                    <IonTabs>
                        <IonRouterOutlet className="z-0">
                            {/* Map */}
                            <Route path={routeConfig.main.map} children={<Map />} exact />
                            <Route path={routeConfig.mainSlug.map.speciesLocation} children={<Map />} exact />

                            {/* Discover */}
                            <Route path={routeConfig.main.discover} children={<Discover />} exact />

                            {/* Camera */}
                            <Route path={routeConfig.main.camera} children={<Camera />} exact />

                            {/* Quest */}
                            <Route path={routeConfig.main.quest} children={<Quest />} exact />

                            {/* More Info */}
                            <Route path={routeConfig.main.moreInfo} children={<MoreInfo />} exact />
                        </IonRouterOutlet>

                        <IonTabBar className="mainShadow z-50 bg-white flex py-1" slot="bottom">
                            <IonTabButton
                                tab="map"
                                className="bg-white flex h-full flex-1 flex-col items-center justify-center rounded-main py-2 hover:bg-[rgba(128,128,128,0.2)]"
                                href={routeConfig.main.map}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/main/map", "root");
                                }}
                            >
                                <span className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                                    </svg>
                                </span>
                                <p className="!w-fit text-csNormal">Bản đồ</p>
                            </IonTabButton>

                            <IonTabButton tab="discover" href={routeConfig.main.discover} className="bg-white flex h-full flex-1 flex-col items-center justify-center rounded-main py-2 hover:bg-[rgba(128,128,128,0.2)]">
                                <span className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                    </svg>
                                </span>
                                <p className="!w-fit text-csNormal">K.phá</p>
                            </IonTabButton>

                            <IonTabButton tab="camera" href={routeConfig.main.camera} className="mainShadow flex h-full aspect-square bg-mainLightBlue flex-col items-center justify-center rounded-full py-2 mx-1.5">
                                <span className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                </span>
                            </IonTabButton>

                            <IonTabButton tab="quest" href={routeConfig.main.quest} className="bg-white flex h-full flex-1 flex-col items-center justify-center rounded-main py-2 hover:bg-[rgba(128,128,128,0.2)]">
                                <span className="flex justify-center">
                                    <span className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </span>
                                </span>
                                <p className="!w-fit text-csNormal">C.hỏi</p>
                            </IonTabButton>

                            <IonTabButton tab="more-info" href={routeConfig.main.moreInfo} className="bg-white flex h-full flex-1 flex-col items-center justify-center rounded-main py-2 hover:bg-[rgba(128,128,128,0.2)]">
                                <span className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                                <p className="!w-fit text-csNormal">Chi tiết</p>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>

                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        limit={4}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Bounce}
                    />
                </>
            )}
        </>
    )
}

export default MainLayout
