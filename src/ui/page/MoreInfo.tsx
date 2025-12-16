// Import libraries
import React from "react"

// Images
import Logo from "../../assets/SinhVatBienVN.png"
import { IonPage, useIonRouter } from "@ionic/react"
import defaultAvatar from "../../assets/userDefault.avif"
import { routeConfig } from "../../config/routeConfig"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { userData } from "../../redux/state/authReducer"
import { AuthService } from "../../services/authService"
import { useConfirm } from "../../hooks/ConfirmForm"

// Authorise
interface Authorise {
    userData: userData['user']
}
const Authorise: React.FC<Authorise> = ({ userData }) => {
    const confirm = useConfirm()
    const handleSignout = async () => {
        const confirmSignout = await confirm({ title: "Đăng xuất", message: "Bạn muốn tiếp tục thoát tài khoản?" })
        if (confirmSignout) {
            await AuthService.signout()
        }
    }

    return (
        <div className="h-fit w-full flex items-center-safe gap-3.5">
            <span className="h-[80px] aspect-square overflow-hidden rounded-full border-2 border-mainRed">
                <img src={defaultAvatar} alt="defaultAvartar" />
            </span>

            <span className="flex-1 h-full flex flex-col">
                <h3 className="leading-none!">{userData.name}</h3>
                <p className="flex gap-1.5 text-csNormal text-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>

                    {userData.email}
                </p>
                <button className="w-full bg-mainRedRGB text-csMedium font-medium text-mainRed py-2.5! rounded-main! transition-all mt-3.5" onClick={handleSignout}>
                    Đăng xuất
                </button>
            </span>
        </div>
    )
}

// Unauthorise
const Unauthorise: React.FC = () => {
    const router = useIonRouter()

    return (
        <div className="h-fit w-full flex items-center-safe gap-3.5">
            <span className="h-[80px] aspect-square overflow-hidden rounded-full border-2 border-mainLightBlue">
                <img src={defaultAvatar} alt="defaultAvartar" />
            </span>

            <span className="flex-1 h-full flex items-center-safe">
                <button
                    className="w-full bg-mainLightBlue text-csMedium font-medium text-white py-5! rounded-main! transition-all hover:bg-mainDarkBlue"
                    onClick={() => { router.push(routeConfig.login.root, "root") }}
                >
                    Tham gia cộng đồng
                </button>
            </span>
        </div>
    )
}

const MoreInfo: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth.isAuth)
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <IonPage>
            <div className="relative h-full w-full flex bg-white flex-col gap-2.5 px-mainTwoSidePadding overflow-auto pt-2.5">
                <div className="h-fit w-full flex items-center-safe gap-3.5 border-b border-lightGray py-2.5">
                    <span className="h-[60px] aspect-square overflow-hidden rounded-full">
                        <img src={Logo} className="h-full w-full object-cover object-center" alt="OCEAN.VN" />
                    </span>

                    <span className="flex flex-col">
                        <p className="text-csLarge uppercase font-medium text-mainLightBlue">Sinh vật biển việt nam</p>
                        <p className="text-csNormal font-medium text-gray">Nơi chia sẻ kiến thức về các sinh vật biển ở Việt Nam</p>
                    </span>
                </div>

                {auth && user ? (
                    <Authorise userData={user} />
                ) : (
                    <Unauthorise />
                )}

                <div className="flex-1 w-full flex flex-col gap-3.5 mt-5">
                    <div className="">
                        <p className="text-csLarge font-medium">Về chúng tôi</p>
                    </div>

                    <div className="h-fit w-full flex flex-col gap-3.5">
                        <a href="http://www.icoe.org.vn" className="flex items-end-safe gap-3.5 border border-lighterGray mainShadow py-5 px-3.5 rounded-small hover:bg-lighterGray! transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                            </svg>

                            <p className="text-csMedium font-medium">Viện kỹ thuật biển</p>
                        </a>

                        <a href="https://sinhvatbienvietnam.zoo.id.vn/trang-ch%E1%BB%A7" className="flex items-end-safe gap-3.5 border border-lighterGray mainShadow py-5 px-3.5 rounded-small hover:bg-lighterGray! transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                                <path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
                            </svg>


                            <p className="text-csMedium font-medium">Nhóm sinh vật biển Việt Nam</p>
                        </a>

                        <a href="" className="flex items-end-safe gap-3.5 border border-lighterGray mainShadow py-5 px-3.5 rounded-small hover:bg-lighterGray! transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                                <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
                            </svg>


                            <p className="text-csMedium font-medium">Ứng dụng</p>
                        </a>
                    </div>
                </div>

                <div className="h-fit w-full flex flex-col items-center-safe border-t border-lightGray py-3.5 mt-3.5">
                    <p className="text-csNormal">Copyright © 2025</p>
                    <p className="text-csNormal">Bản quyền thuộc về Sinh vật biển Việt Nam</p>
                </div>
            </div>
        </IonPage>
    )
}

export default MoreInfo